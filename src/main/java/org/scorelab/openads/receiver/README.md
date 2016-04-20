#OpenADS Receivers

##PCap Receiver
Packet capturing for network traffic.

> #### Configuring
PCap Receiver is using PCap4J which is a Java wrapper for pcap. Therefore it depends on implementations of pcap. You have to setup an appropiate pcap implementation before using this receiver. See how to setup these dependencies here https://github.com/kaitoy/pcap4j#how-to-use