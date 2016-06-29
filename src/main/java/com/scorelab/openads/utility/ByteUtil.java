package com.scorelab.openads.utility;

public class ByteUtil
{
  public final static int getUByte(byte[] data, int offset)
  {
    return data[offset] & 0xff;
  }

  public final static int getUShort(byte[] data, int offset)
  {
    int b0 = getUByte(data, offset + 0);
    int b1 = getUByte(data, offset + 1);
    return (b0 << 8) + b1;
  }

  public final static long getULong(byte[] data, int offset)
  {
    long b0 = getUByte(data, offset + 0);
    long b1 = getUByte(data, offset + 1);
    long b2 = getUByte(data, offset + 2);
    long b3 = getUByte(data, offset + 3);
    return (((((b0 << 8) + b1) << 8) + b2) << 8) + b3;
  }

  public final static void setUByte(byte[] data, int offset, int value)
  {
    data[offset] = (byte) (value & 0xff);
  }

  public final static void setUShort(byte[] data, int offset, int value)
  {
    data[offset+1] = (byte) (value & 0xff);
    value >>= 8;
    data[offset] = (byte) (value & 0xff);
  }

  public final static void setULong(byte[] data, int offset, long value)
  {
    data[offset+3] = (byte) (value & 0xff);
    value >>= 8;
    data[offset+2] = (byte) (value & 0xff);
    value >>= 8;
    data[offset+1] = (byte) (value & 0xff);
    value >>= 8;
    data[offset] = (byte) (value & 0xff);
  }
}
