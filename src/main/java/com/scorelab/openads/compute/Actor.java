package com.scorelab.openads.compute;

import com.scorelab.openads.utility.Constants;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.api.java.function.Function2;
import org.apache.spark.api.java.function.PairFunction;
import org.apache.spark.streaming.Durations;
import org.apache.spark.streaming.api.java.JavaDStream;
import org.apache.spark.streaming.api.java.JavaPairDStream;
import org.apache.spark.streaming.api.java.JavaReceiverInputDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import scala.Tuple2;

import java.io.Serializable;
import java.util.Arrays;

/**
 * Created by sameera on 2/4/16.
 */
public class Actor implements Serializable {

    private final JavaStreamingContext jssc;

    public Actor(String header,String sparkMaster,int window){
        SparkConf conf = new SparkConf().setAppName(header).setMaster(sparkMaster);
        jssc = new JavaStreamingContext(conf, Durations.seconds(window));
    }

    // Split each line into words and Count each word in each batch
    public void act(){

        JavaReceiverInputDStream<String> stream=jssc.socketTextStream("localhost", 9999);

        JavaDStream<String> words = stream.flatMap(
                new FlatMapFunction<String, String>() {
                    @Override
                    public Iterable<String> call(String x) {
                        return Arrays.asList(x.split(Constants.SPACE_FIELD_SEPARATOR));
                    }
                });


        JavaPairDStream<String, Integer> pairs = words.mapToPair(
                new PairFunction<String, String, Integer>() {
                    @Override public Tuple2<String, Integer> call(String s) {
                        return new Tuple2<String, Integer>(s, 1);
                    }
                });
        JavaPairDStream<String, Integer> wordCounts = pairs.reduceByKey(
                new Function2<Integer, Integer, Integer>() {
                    @Override public Integer call(Integer i1, Integer i2) {
                        return i1 + i2;
                    }
                });
        // Print the first ten elements of each RDD generated in this DStream to the console
        wordCounts.print();
        jssc.start();              // Start the computation
        jssc.awaitTermination();
    }



    public static void main(String[] args){

        Actor actor=new Actor("Text Socket Stream Application","local[4]",60);
        actor.act();

    }
}
