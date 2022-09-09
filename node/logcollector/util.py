import os
import time


def logtreem(filename):
    file = open(filename, 'r')
    st_results = os.stat(filename)
    st_size = st_results[6]
    file.seek(st_size)

    while 1:
        where = file.tell()
        line = file.readline()
        if not line:
            time.sleep(1)
            file.seek(where)
        else:
            yield line,  # already has newline
