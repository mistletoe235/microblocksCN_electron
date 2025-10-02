const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const express = require('express');
const https = require('https');
const fs = require('fs');

let server;
let bluetoothPinCallback;
let selectBluetoothCallback;

function createLocalServer() {
  const app = express();
  const port = 60080;

  const options = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
  };

  app.use(express.static(path.join(__dirname, 'mb-webapp')));

  try {
    server = https.createServer(options, app);

    server.listen(port, 'localhost', () => {
      console.log(`HTTPS server running at https://localhost:${port}`);
    });

    // 捕获服务器错误
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use. Returning existing server address.`);
        return `https://localhost:${port}/index.html`;
      } else {
        console.error('Error starting server:', error);
        throw error; // 如果是其他错误，抛出异常
      }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    throw error; // 捕获同步错误
  }

  return `https://localhost:${port}/index.html`;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: path.join(__dirname, 'mb-webapp', 'mb_512.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 使用 preload.js
      nodeIntegration: false,
      contextIsolation: true, // 启用上下文隔离
      enableBlinkFeatures: 'Bluetooth'
    },
    autoHideMenuBar: true
  });

  // win.webContents.openDevTools();

  const localServerUrl = createLocalServer();
  win.loadURL(localServerUrl);

  // 蓝牙设备选择
  win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault();
    selectBluetoothCallback = callback;
  
    // 将设备列表发送到渲染进程
    win.webContents.send('show-bluetooth-devices', deviceList);
  });
  
  ipcMain.on('bluetooth-device-selected', (event, deviceId) => {
    if (selectBluetoothCallback) {
      selectBluetoothCallback(deviceId); // 返回用户选择的设备 ID
    }
  });

  // 取消蓝牙请求
  ipcMain.on('cancel-bluetooth-request', (event) => {
    if (selectBluetoothCallback) {
      selectBluetoothCallback('');
    }
  });

  // 蓝牙配对
  win.webContents.session.setBluetoothPairingHandler((details, callback) => {
    bluetoothPinCallback = callback;
    win.webContents.send('bluetooth-pairing-request', details);
  });

  ipcMain.on('bluetooth-pairing-response', (event, response) => {
    if (bluetoothPinCallback) {
      bluetoothPinCallback(response);
    }
  });

  win.on('close', () => {
    if (server) {
      server.close();
    }
    win.destroy();
  });

  //usb serial
  win.webContents.session.on('select-serial-port', (event, portList, webContents, callback) => {
    event.preventDefault();
    selectSerialCallback = callback;

    // 将设备列表发送到渲染进程
    win.webContents.send('show-serial-devices', portList);
  });

  ipcMain.on('serial-device-selected', (event, portId) => {
    if (selectSerialCallback) {
      selectSerialCallback(portId); // 返回用户选择的设备 ID
    }
  });

  ipcMain.on('cancel-serial-request', () => {
    if (selectSerialCallback) {
      selectSerialCallback(''); // 用户取消选择
    }
  });


}

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
// 如果是linux，需要这行
if (process.platform === 'linux') {
  // app.commandLine.appendSwitch('no-sandbox');
  app.commandLine.appendSwitch("enable-experimental-web-platform-features", true);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});