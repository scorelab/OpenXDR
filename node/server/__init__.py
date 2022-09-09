import asyncio
import json
import os

import websockets
import time


async def view_log(websocket):
    filename =  json.load('log.json').get('sys')
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
            await websocket.send(line)


async def serve(host: str, port: int):
    async with websockets.serve(view_log, host, port):
        await asyncio.Future()
