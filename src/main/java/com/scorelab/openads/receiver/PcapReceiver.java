package com.scorelab.openads.receiver;

import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.storage.StorageLevel;
import org.apache.spark.streaming.Duration;
import org.apache.spark.streaming.api.java.JavaReceiverInputDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.apache.spark.streaming.receiver.Receiver;
import org.pcap4j.core.NotOpenException;
import org.pcap4j.core.PcapHandle;
import org.pcap4j.core.PcapNativeException;
import org.pcap4j.core.PcapNetworkInterface.PromiscuousMode;
import org.pcap4j.core.Pcaps;
import org.pcap4j.packet.Packet;

import com.google.gson.Gson;

/**
 * A demo code of PCAP receiver
 * @author xiaolei huang
 *
 */
public class PcapReceiver extends Receiver<String>{
	private static final long serialVersionUID = 1L;
	
	int device = 0;
	boolean promiscuousMode = true;
	int timeoutMillis = 100;
	int snaplength = 65536;
	long maxpackets = Long.MAX_VALUE - 1;
	
	public PcapReceiver(int device, boolean promiscuousMode, int timeoutMillis, int snaplength, long maxpackets) {
		// TODO Auto-generated constructor stub
		super(StorageLevel.MEMORY_AND_DISK_2());
	    this.device = device;
	    this.promiscuousMode = promiscuousMode;
	    this.timeoutMillis = timeoutMillis;
	    this.snaplength = snaplength;
	}

	@Override
	public void onStart() {
		// TODO Auto-generated method stub
		new Thread(){
			public void run(){
				receive();
			}
		}.start();
	}

	private void receive() {
		// TODO Auto-generated method stub
		Gson gson = new Gson();
		PcapHandle handle = null;
		try {
			handle = Pcaps.findAllDevs().get(this.device)
			           .openLive(this.snaplength, 
			        		this.promiscuousMode?PromiscuousMode.PROMISCUOUS:PromiscuousMode.NONPROMISCUOUS, 
			        		this.timeoutMillis);
		}catch (PcapNativeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.exit(0);
		}
		
		int num = 0;
		while (!isStopped()) {
			Packet packet = null;
			try {
				packet = handle.getNextPacket();
				if (packet == null) {
					continue;
				}else {
					System.out.println(handle.getTimestamp());
					System.out.println(packet);
					num++;
			        if ( maxpackets!= -1 && num >= maxpackets) {
			          break;
			        }
			        store(gson.toJson(packet));
				}
			}catch(NotOpenException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}finally{
				handle.close();
			}
	    }
		
	}

	@Override
	public void onStop() {
		// TODO Auto-generated method stub
		
	}
	
	public static void main(String[] args){
		if(args.length < 2){
			System.err.println("Usage: JavaCustomReceiver <hostname> <port>");
			System.exit(1);
		}
		
		//Set Logger level
		Logger.getRootLogger().setLevel(Level.WARN);
		
		//Setup configuration, with 1 second batch size
		SparkConf sparkConf = new SparkConf().setAppName("PcapReceiver");
		JavaStreamingContext jsc = new JavaStreamingContext(sparkConf, new Duration(1000));
		
		//Create Argument Parser
		Options options = new Options();
		options.addOption("PromiscuousMode", "Promiscuous Mode, True of Flase");
		options.addOption("timeoutMillis", "TimeoutMillis, eg. 100 ms");
		options.addOption("snaplength", "snap length, eg. 65536 bytes");
		options.addOption("maxpackets", "Receiving maximum packets number");
		options.addOption("device", "PCAP monitoring device number, [0-9]");
		CommandLineParser parser = new DefaultParser();
		CommandLine cmd = null;
		try {
			cmd = parser.parse( options, args);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.exit(0);
		}
		
		//check whether the argument provides whole information
		if(!cmd.hasOption("device")||!cmd.hasOption("PromiscuousMode")||!cmd.hasOption("timeoutMillis")||!cmd.hasOption("snaplength")){
			System.err.println("You must input whole information we need");
		}
		
		int device = 0;
		boolean promiscuousMode = true;
		int timeoutMillis = 100;
		int snaplength = 65536;
		long maxpackets = Long.MAX_VALUE - 1;
		// interpret options
		try{
			device = Integer.parseInt(cmd.getOptionValue("device"));
			promiscuousMode = Boolean.parseBoolean(cmd.getOptionValue("PromiscuousMode"));
			timeoutMillis = Integer.parseInt(cmd.getOptionValue("timeoutMillis"));
			snaplength = Integer.parseInt(cmd.getOptionValue("snaplength"));
			maxpackets = Long.parseLong("maxpackets");
		}catch(Exception e){
			System.err.println("You must input right format argument");
			System.exit(0);
		}
		
		// Create a input stream with the custom receiver on target ip:port and count the
	    // words in input stream of \n delimited text (eg. generated by 'nc')
		JavaReceiverInputDStream<String> lines = jsc.receiverStream(new PcapReceiver(device, promiscuousMode, timeoutMillis, snaplength, maxpackets));
		
		//print those lines below
		lines.flatMap(new FlatMapFunction<String, String>() {
			private static final long serialVersionUID = 1L;

			@Override
			public Iterable<String> call(String arg0) throws Exception {
				// TODO Auto-generated method stub
				System.out.println(arg0);
				return null;
			}});
		
		jsc.start();
	    jsc.awaitTermination();
	    jsc.close();
	}
}