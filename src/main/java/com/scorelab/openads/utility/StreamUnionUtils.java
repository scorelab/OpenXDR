package com.scorelab.openads.utility;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.apache.spark.streaming.api.java.JavaPairDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;

/**
 * Utility to union different Streams
 * @author xiaolei
 *
 * @param <T>
 */
public class StreamUnionUtils<T> implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private List<JavaPairDStream<String, T>> streamsList = new ArrayList<JavaPairDStream<String, T>>();
	
	public void addStream(JavaPairDStream<String, T> stream){
		streamsList.add(stream);
	}
	
	public List<JavaPairDStream<String, T>> getStreamList(){
		return this.streamsList;
	}
	
	public void clearStreamList(){
		this.streamsList.clear();
	}
	
	/**
	 * Union all the streams if there is more than 1 stream.
	 * Otherwise, just use the 1 stream.
	 * @param jssc Java Stream Context
	 * @return Union streams
	 */
	public JavaPairDStream<String, T> unionStreams(JavaStreamingContext jssc){
		if(this.streamsList.isEmpty()){
			return null;
		}else{
			JavaPairDStream<String, T> unionStreams;
			if(this.streamsList.size()>1)
				return this.streamsList.get(0);
			
			unionStreams = jssc.union(this.streamsList.get(0), this.streamsList.subList(1, this.streamsList.size()));
			return unionStreams;
		}
	}
}