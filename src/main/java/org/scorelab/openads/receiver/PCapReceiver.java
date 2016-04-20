package org.scorelab.openads.receiver;

import java.io.IOException;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.spark.storage.StorageLevel;
import org.apache.spark.streaming.receiver.Receiver;
import org.pcap4j.core.NotOpenException;
import org.pcap4j.core.PacketListener;
import org.pcap4j.core.PcapAddress;
import org.pcap4j.core.PcapHandle;
import org.pcap4j.core.PcapNativeException;
import org.pcap4j.core.PcapNetworkInterface;
import org.pcap4j.core.Pcaps;
import org.pcap4j.packet.Packet;
import org.pcap4j.util.NifSelector;

public class PCapReceiver extends Receiver<String> {

    private static final long serialVersionUID = 1735694675364815420L;

    public PCapReceiver() {
        super(StorageLevel.MEMORY_ONLY());
    }

    @Override
    public void onStart() {
        new Thread() {
            public void run() {
                receive();
            }
        }.start();
    }

    @Override
    public void onStop() {
        //TODO
    }

    private void receive() {

        try {
            PcapNetworkInterface nifs = new NifSelector().selectNetworkInterface();

            final PcapHandle handle = nifs.openLive(1024, PcapNetworkInterface.PromiscuousMode.PROMISCUOUS, 0);

            handle.loop(-1, new PacketListener() {
                @Override
                public void gotPacket(Packet packet) {
                    System.out.println(handle.getTimestamp());
                    System.out.println(packet);
                    store(Arrays.toString(packet.getRawData()));
                }
            });

            restart("Trying to connect again");
        } catch (InterruptedException ex) {
            Logger.getLogger(PCapReceiver.class.getName()).log(Level.SEVERE, null, ex);
            restart("Trying to connect again", ex);
        } catch (NotOpenException ex) {
            Logger.getLogger(PCapReceiver.class.getName()).log(Level.SEVERE, null, ex);
            restart("Trying to connect again", ex);
        } catch (PcapNativeException ex) {
            Logger.getLogger(PCapReceiver.class.getName()).log(Level.SEVERE, null, ex);
            restart("Trying to connect again", ex);
        } catch (IOException ex) {
            Logger.getLogger(PCapReceiver.class.getName()).log(Level.SEVERE, null, ex);
            restart("Trying to connect again", ex);
        }

    }

}
