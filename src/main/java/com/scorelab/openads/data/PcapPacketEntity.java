package com.scorelab.openads.data;


import java.io.Serializable;
import java.sql.Timestamp;

import org.pcap4j.packet.Packet;

/**
 * Entity for Pcap4j Packet
 * @author xiaolei
 *
 */
public class PcapPacketEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	final String type = "pcap";
	Timestamp time = null;
	Packet packet = null;
	
	/**
	 * 
	 * @param time
	 * @param packet
	 */
	public PcapPacketEntity(Timestamp time, Packet packet) {
		this.time = time;
		this.packet = packet;
	}

	/**
	 * @return the time
	 */
	public Timestamp getTime() {
		return time;
	}

	/**
	 * @param time the time to set
	 */
	public void setTime(Timestamp time) {
		this.time = time;
	}

	/**
	 * @return the packet
	 */
	public Packet getPacket() {
		return packet;
	}

	/**
	 * @param packet the packet to set
	 */
	public void setPacket(Packet packet) {
		this.packet = packet;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "PcapPacketEntity [type=" + type + ", time=" + time + ", packet=" + packet + "]";
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}
}