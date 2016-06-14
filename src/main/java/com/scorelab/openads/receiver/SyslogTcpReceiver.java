package com.scorelab.openads.receiver;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Properties;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.spark.SparkConf;
import org.apache.spark.storage.StorageLevel;
import org.apache.spark.streaming.Durations;
import org.apache.spark.streaming.api.java.JavaReceiverInputDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.apache.spark.streaming.api.java.JavaStreamingContextFactory;
import org.apache.spark.streaming.receiver.Receiver;
/**
 *
 * @author xiaolei
 */
public class SyslogTcpReceiver extends Receiver<String> {
	private static final long serialVersionUID = -6451103013302237592L;
	
	int port = -1;
    
    /**
     * Define the IP and port of data source.
     * @param host_ IP
     * @param port_ port
     */
    public SyslogTcpReceiver(int port_) {
        super(StorageLevel.MEMORY_AND_DISK_2());
        this.port = port_;
    }
    
    @Override
    public void onStart() {
        new Thread() {
            @Override
            public void run(){
                receive();
            }            
        }.start();
    }

    @Override
    public void onStop() {
        // There is nothing much to do as the thread calling receive()
        // is designed to stop by itself isStopped() returns false
    }
    
    @SuppressWarnings("resource")
	private void receive() {
        try {
            ServerSocket serverSocket;
            serverSocket = new ServerSocket(port);
            byte[] receiveData = new byte[1024];

            System.out.printf("Listening on tcp:%s:%d%n",
                    InetAddress.getLocalHost().getHostAddress(), port);
            
            /**
            * Start to retrieve data packet
            */
            while(!isStopped()){
                  Socket connectionSocket = serverSocket.accept();
                  OutputStream outstream = connectionSocket.getOutputStream();
                  StringBuilder builder = new StringBuilder();
                  outstream.write(receiveData);
                  builder.append(receiveData);
                  System.out.println("RECEIVED: " + builder.toString());
                  store(builder.toString());
            }
        } catch (Throwable t) {
            // restart if there is any other error
            restart("Error receiving data", t);
        }
    }
    
    public static void main(String[] args) throws IOException {
        //Set Logger level
        Logger.getRootLogger().setLevel(Level.WARN);

        /**
         * Check user input their own preference for Syslog,
         * if not null, it will parse the input property file;
         * otherwise, it will use default.
         */
        final Properties config = new Properties();
        if(args.length > 0){
                Path path = new Path(args[0]);
                FileSystem fs = FileSystem.get(path.toUri(), new Configuration());
                config.load(fs.open(path));
        }

        /**
         * Setting the checkpoint directory.
         */
        final String checkpointDir = config.getProperty("checkpoint");

        /**
         * Set the path to store data;
         * if the path is null or "", it will skip this step;
         * and will not save the data to the user-defined path
         */
        final String path2savedata = config.getProperty("path2savedata");

        /**
         * Configure checkpoint directory for Receiver
         */
        final JavaStreamingContextFactory contextFactory = new JavaStreamingContextFactory(){
            @Override
            public JavaStreamingContext create() {
                //Setup configuration, with 0.1 second batch size
                SparkConf sparkConf = new SparkConf().setAppName("SyslogTcpReceiver");

                JavaStreamingContext jsc = new JavaStreamingContext(sparkConf, Durations.seconds(3));
                JavaReceiverInputDStream<String> lines;
                
                /**
                 * Basic configuration
                 */
                String port_temp = null;
                int default_port = 514;
                if(!config.isEmpty()){
                    port_temp = config.getProperty("port");
                }
                if(port_temp != null){
                    default_port = Integer.parseInt(port_temp);
                    lines = jsc.receiverStream(new SyslogTcpReceiver(default_port));
                }
                else{
                    lines = jsc.receiverStream(new SyslogTcpReceiver(default_port));
                }
                
                /**
                 * Set the checkpoint
                 */
                if(checkpointDir != null && checkpointDir.trim().length() > 0)
                    jsc.checkpoint(checkpointDir);
                else
                    jsc.checkpoint("checkpoint/");

                if(path2savedata != null && path2savedata.trim().length() > 0){
                        lines.dstream().saveAsTextFiles(path2savedata, "");
                        //TODO to add function: use Hadoop_FileUtils to merge the data into single file
                }

                //print those lines below
                lines.print();

                //TODO add functions to take further process
                return jsc;
            }
        };

        // Get JavaStreamingContext from checkpoint data or create a new one
        final JavaStreamingContext jsccontext = JavaStreamingContext.getOrCreate(checkpointDir, contextFactory);

        jsccontext.start();
        jsccontext.awaitTermination();
    }
}