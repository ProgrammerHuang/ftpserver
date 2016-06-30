# xFTP [![NPM version][npm-image]][npm-url]
> Simple and extensible promise-based FTP server.

## Installation

`npm install xftp --save`

## Usage

```js
import {FTPServer} from 'xftp';
const ftpServer = new FTPServer({...});

ftpServer.listen().then(() => {
  // now listening for connections
});
```

You can pass an object to the constructor to set various options.
Below are the options and their defaults.

```js
var ftpServer = new FTPServer({
  host: '127.0.0.1',
  port: 21,
  pasvStart: null,
  pasvEnd: null,
  timeout: 30000,
  disabledCommands: [],
  anonymous: false,
  logLevel: 10,
  override: {
    fs: null,
    authentication: null
  }
});
```

### Options

`pasvStart` / `pasvEnd` | **Integer**
- Sets the range for ports to use with a passive connection.
- The server will have the client connect to the first available port within the range.

`timeout` | **Integer**
* How long (**in milliseconds**) before a connection is closed if no commands are received.

`disabledCommands` | **Array [String]**
* String array of client commands that are forbidden.
* **Example**: `disabledCommands: ['RMD', 'RNFR', 'RNTO']`

`anonymous` | **Boolean**
* If true, will not authenticate connections and will act as if all connections are authenticated.

`logLevel` | **Integer**
* See [Bunyan Levels](https://github.com/trentm/node-bunyan#levels).

`override` | **Object**
* Used to override various functions or classes.
* See [Override Section](#override).

## Features

### Override



[npm-image]: https://badge.fury.io/js/ftpserver.svg
[npm-url]: https://npmjs.org/package/xftp
