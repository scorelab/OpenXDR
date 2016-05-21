OpenADS
======
OpenADS is a Big Data analytics framework designed to consume and monitor network traffic and mine hidden anomalies using advanced machine learning techniques. In current date, OpenADS is still at it's conceptual stage where it is designed to work at a massive scale. The system believes to act as an extensible and reliable platform to enrich traditional Intrusion Detection System (IDS). OpenADS is unique at it's nature with the architecture supported by Berkeley Data Stack (BDS).

Contents
--------
* [Features](#features)
* [How to use](#how-to-use)
	* [System requirements](#system-requirements)
		* [Dependencies](#dependencies)
		* [Platforms](#platforms)
	* [Important prerequisites](#prerequisites)
	* [How to build](#how-to-build)
	* [How to run](#how-to-run)
* [Contacts](#contacts)

Features
--------
* Streaming computation runs on Spark platform.
* Capture various network data.
* Support real-time analysis via Machine Learning techniques.

How to use
----------

#### System requirements ####

##### Dependencies #####
* Java 1.8
* libpcap 1.1.1
* WinPcap 4.1.2
* jna 4.1.0
* slf4j-api 1.7.12
* logback-core 1.0.0
* logback-classic 1.0.0

##### Platforms #####
The software is tested on Ubuntu 16.04 LTS

##### Important prerequisites #####

* PCAP receiver
Pcap4j needs root's right to access network and device. So, before deploying, please ensure to run the following line:
	`setcap cap_net_raw,cap_net_admin=eip /path/to/java`
for example, mine is `setcap cap_net_raw,cap_net_admin=eip /usr/local/java`
If you run java command now, you might receive the following error:
	java: error while loading shared libraries: libjli.so: cannot open shared object file: No such file or directory

To ensure the java can run properly, you could run the following:
	Try `ln -s /usr/local/java/jre/lib/amd64/jli/libjli.so /usr/lib/` Or `echo /usr/local/java/jre/lib/amd64/jli/ > /etc/ld.so.conf`
Refer to the issue link: https://github.com/kaitoy/pcap4j/issues/63

##### How to build #####
To build the project, you just need to run the `maven_package.sh` to package the project.

##### How to run #####
To run the project, you should submit the task to Spark. Below is a demo code:

* To run it locally
~/spark/bin/spark-submit --class "com.scorelab.openads.receiver.PcapReceiver" --master local[*] ./target/OpenADS-0.1-SNAPSHOT-jar-with-dependencies.jar ./configuration/config.properties
* To run it on servers
~/spark/bin/spark-submit --class "com.scorelab.openads.receiver.PcapReceiver" --master `Spark Master Address` ./target/OpenADS-0.1-SNAPSHOT-jar-with-dependencies.jar ./configuration/config.properties

* Without user-defined configuration
The properties is optional, you could leave it alone and you could use the defaul settings, below is the example:

~/spark/bin/spark-submit --class "com.scorelab.openads.receiver.PcapReceiver" --master local[*] ./target/OpenADS-0.1-SNAPSHOT-jar-with-dependencies.jar

Contacts
--------
SCoRe Lab: info@scorelab.org
Website: [http://www.scorelab.org](http://www.scorelab.org)
