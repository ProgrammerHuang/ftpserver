# xFTP [![NPM version][npm-image]][npm-url]
> Simple and extensible promise-based FTP server.

- [Installation](#installation)
- [Usage](#usage)
  - [Options](#options)
- [Features](#features)
  - [Override](#override)

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

`listen()` to start the server.  
`close()` to stop.

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
  greeting = null,
  override: {
    fs: null,
    authentication: null
  }
});
```

---
### Options

#### `host` | **String**
IP address clients use to connect to the server.  
This IP will be used for passive connections, so ensure it is your remote IP.

#### `port` | **Integer**
Port clients use to connec tto eh server.

#### `pasvStart` / `pasvEnd` | **Integer**
Sets the range for ports to use with a passive connection.  
The server will have the client connect to the first available port within the range.

#### `timeout` | **Integer**
How long (*in milliseconds*) before a connection is closed if no commands are received.

#### `disabledCommands` | **Array [String]**
String array of client commands that are forbidden.  
**Example**: `disabledCommands: ['RMD', 'RNFR', 'RNTO']`

#### `anonymous` | **Boolean**
If true, will not authenticate connections and will act as if all connections are authenticated.

#### `logLevel` | **Integer**
See [Bunyan Levels](https://github.com/trentm/node-bunyan#levels).

#### `greeting` | **String**
If set, a greeting is sent to the connection when it first connects.  
This can be a string or path to a file.

#### `override` | **Object**
Used to override various functions or classes.  
See [Override Section](#override).

---
## Features

### Override

#### `authentication`
You can override the default authentication function used by connections.

```js
function myAuthFunction(username, password) {
  ...
}

new FTPServer({
  ...
  override: {
    authentication: myAuthFunction
  }
})
```

Your function must return a promise that resolves if sucessful, and rejects otherwise.

> **ACCT:**  
> If your connections require an account (ACCT), resolve your function with `332`.  
(This is not implemented yet)

#### `fs`
You can override the default filesystem the server uses by creating a
new filesystem class.  
Doing so can allow you to interact directly with the data without any
real file access.
```js
class MyFileSystem {
  ...
}

...

new FTPServer({
  ...
  override: {
    fs: MyFileSystem
  }
});
```

When a connection is recieved it will call `new` on the overridden class.

##### Functions
The following functions are to be implemented in your class and must
return promises (check `lib/ftp/file-system.js` for examples):

```js
list(dir) {}
```
> Receives a path to a directory relative to the current directory.  
If no argument, than the current directory is used.  
Returns an array of `File` classes (see [File Section](#file))

```js
write(filePath, append) {}
```
> Receives the relative path to write a new file.  
Returns the stream to write data to.

```js
read(filePath) {}
```
> Receives the relative path to a file to read it's contents.  
Returns the stream to read data from.

```js
get(path)  {}
```
> Returns a `File` class to the path (either a file or directory).

```js
chdir(dir) {}
```
> Change the current directory (dir is relative).

```js
mkdir(dir) {}
```
> Create a directory relative to the current directory.

```js
delete(filePath) {}
```
> Delete a file or directory relative to the current directory.

```js
rename(oldName, newName) {}
```
> Rename a file or directory relative to the current directory.

[npm-image]: https://badge.fury.io/js/ftpserver.svg
[npm-url]: https://npmjs.org/package/xftp
