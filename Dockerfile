FROM sequenceiq/spark:1.6.0
MAINTAINER Xiaolei Huang <xiaoleihuangccnu@gmail.com>

# Install the basic packages
ADD https://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo /etc/yum.repos.d/epel-apache-maven.repo
RUN yum install -y libpcap \
    git \
    apache-maven \
    python-pip \
	python-wheel \
	python-devel \
	npm \
	yum clean all

# Install Java-8
RUN cd /usr/local && curl -LO 'http://download.oracle.com/otn-pub/java/jdk/8u91-b14/jdk-8u91-linux-x64.tar.gz' -H 'Cookie: oraclelicense=accept-securebackup-cookie'
RUN cd /usr/local && tar -zxf jdk-8u91-linux-x64.tar.gz

# Setting Java Environment
ENV JAVA_HOME /usr/local/jdk1.8.0_91
ENV PATH $JAVA_HOME/bin:$PATH

# Encoding setting
RUN localedef -c -f UTF-8 -i en_US en_US.UTF-8
RUN export LC_ALL=en_US.UTF-8

#　Setting working directory inside of container
WORKDIR /OpenADS

# Adding some other configruation file
ADD pom.xml /OpenADS/pom.xml
ADD configuration /OpenADS/configuration

# Adding source, compile and package it into single jar
ADD src /OpenADS/src
RUN ["mvn", "clean”, “compile”, “assembly:single"]

# Configure Apache Zeppelin
ENV ZEPPELIN_HOME /zeppelin
ENV PATH $ZEPPELIN_HOME/zeppelin-web/node:$PATH
ENV PATH $ZEPPELIN_HOME/zeppelin-web/node_modules/grunt-cli/bin:$PATH
WORKDIR $ZEPPELIN_HOME

RUN git config --global url."https://".insteadOf git:// \
	&& git clone https://github.com/apache/zeppelin.git $ZEPPELIN_HOME \
	&& cd zeppelin \
	&& mvn clean package -Pspark-2.0 -Phadoop-2.6 -Pyarn -Ppyspark -Pscala-2.11 -DskipTests \
	&& cp /OpenADS/configuration/zeppelin-site.xml ./conf/
	&& bin/zeppelin-daemon.sh start
