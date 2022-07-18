import asyncio
from server import serve


def main():
    asyncio.run(serve('127.0.0.1', 8765))


if __name__ == '__main__':
    main()
