package com.scorelab.openads.receiver;

import java.io.IOException;
import java.util.List;
import java.util.Properties;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.storage.StorageLevel;
import org.apache.spark.streaming.Duration;
import org.apache.spark.streaming.api.java.JavaDStream;
import org.apache.spark.streaming.api.java.JavaReceiverInputDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.apache.spark.streaming.receiver.Receiver;
import org.pcap4j.core.PcapHandle;
import org.pcap4j.core.PcapNetworkInterface;
import org.pcap4j.core.PcapNetworkInterface.PromiscuousMode;
import org.pcap4j.core.Pcaps;
import org.pcap4j.core.BpfProgram.BpfCompileMode;
import org.pcap4j.packet.Packet;

import com.google.gson.Gson;


/**
 * A demo code of PCAP receiver
 * @author xiaolei huang
 * @version 0.1
 *
 */
public class PcapReceiver extends Receiver<String>{
	private static final long serialVersionUID = 1L;
	
	/**
	 * Predefined Variables
	 */
	int device = 0;
	boolean promiscuousMode = true;
	int timeoutMillis = 5000;
	int snaplength = 65536;
	String filter = null;
	
	public PcapReceiver(Properties config) {
		super(StorageLevel.MEMORY_AND_DISK_2());
		if(config!=null){
			if(config.containsKey("device")){
				this.device = Integer.parseInt(config.getProperty("device"));
			}
			if(config.containsKey("promiscuousMode")){
				this.promiscuousMode = Boolean.parseBoolean((config.getProperty("promiscuousMode")));
			}
			if(config.containsKey("timeoutMillis")){
				this.timeoutMillis = Integer.parseInt((config.getProperty("timeoutMillis")));
			}
			if(config.containsKey("snaplength")){
				this.snaplength = Integer.parseInt((config.getProperty("snaplength")));
			}
			if(config.containsKey("filter")){
				this.filter = config.getProperty("filter");
			}
		}
	}

	@Override
	public void onStart(){
		new Thread(){
			public void run(){
				receive();
			}
		}.start();
	}

	private void receive() {
		try{
			List<PcapNetworkInterface> nifs = Pcaps.findAllDevs();
			/**
			 * Pre-check
			 */
			if (nifs == null || nifs.size() == 0)
			{
				String error = (nifs == null) ? "Not found any NIFs..."
						: "Found " + nifs.size() + " of NIFs";
				store(error);

				return;
			}
			
			/**
			 * Open Listening
			 */
			PcapHandle handle = nifs.get(this.device)
					.openLive(
							this.snaplength, 
							this.promiscuousMode?PromiscuousMode.PROMISCUOUS:PromiscuousMode.NONPROMISCUOUS, 
							this.timeoutMillis);
			
			/**
			 * Set filter
			 */
			try{if(filter != null)
				handle.setFilter(filter, BpfCompileMode.OPTIMIZE);
			}catch(Exception e){
				e.printStackTrace();
				System.err.println("Filter syntax is wrong!");
			}
			
			//Using Gson to store the detail of data information
			Gson gson = new Gson();
			
			/**
			 * Start to retrieve
			 */
			while(!isStopped()){
				Packet packet = handle.getNextPacket();
				
				if(packet == null){
					continue;
				}else{
					System.out.println(packet.getHeader().toString());
					store(gson.toJson(new PacketEntity(handle.getTimestamp(), packet)));
					Thread.sleep(1000);
				}
			}
			
			/**
			 * Restart in an attempt to run it again
			 */
			restart("Trying to run it again");
		} catch(Throwable t){
			// restart if there is any other error
			restart("Error receiving data", t);
		}
	}

	@Override
	public void onStop() {
		/**
		 * I've not figured out what it should do here, 
		 * so DO NOTHING NOW.
		 */
	}
	
	public static void main(String[] args) throws IOException{
		
		//Set Logger level
		Logger.getRootLogger().setLevel(Level.WARN);
		
		//Setup configuration, with 0.1 second batch size
		SparkConf sparkConf = new SparkConf().setAppName("PcapReceiver");
		
		final JavaStreamingContext jsc = new JavaStreamingContext(sparkConf, new Duration(30000));
		JavaReceiverInputDStream<String> lines = jsc.receiverStream(new PcapReceiver(null));;
		System.out.println("code runs here");
		
		/**
		 * Check user input their own preference for Pcap4j,
		 * if not null, it will parse the input property file;
		 * otherwise, it will use default.
		 */
		final Properties config = new Properties();
		if(args.length > 0){
			Path path = new Path(args[0]);
			FileSystem fs =FileSystem.get(path.toUri(), new Configuration());
			config.load(fs.open(path));
			lines = jsc.receiverStream(new PcapReceiver(config));
			
			/**
			 * Set the path to store data;
			 * if the path is null or "", it will skip this step;
			 * and will not save the data to the user-defined path
			 */
			String path2savedata = config.getProperty("path2savedata");
			if(path2savedata != null && path2savedata.trim().length() > 0){
				lines.dstream().saveAsTextFiles(path2savedata, "");
				//TODO to add function: use Hadoop_FileUtils to merge the data into single file
			}
		}else{
			lines = jsc.receiverStream(new PcapReceiver(null));
		}
		
		//print those lines below
		JavaDStream<String> flows = lines.flatMap(new FlatMapFunction<String, String>() {
			private static final long serialVersionUID = 1L;

			@Override
			public Iterable<String> call(String line) throws Exception {
				System.out.println("--------------------------------");
				/**
				 * Could add any further line process functions here
				 */
				System.out.println(line);
				System.out.println("--------------------------------");
				return null;
			}});
		flows.print();
		
		// Stop streaming service when ctrl+c
		Runtime.getRuntime().addShutdownHook(new Thread(){
			public void run()
			{
				jsc.stop();
				jsc.close();
				System.out.println("---Close PcapReceiver service---");
			}
		});
				
		jsc.start();
	    jsc.awaitTermination();
	}
}
