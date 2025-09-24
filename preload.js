const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onBluetoothPairingRequest: (callback) => ipcRenderer.on('bluetooth-pairing-request', callback),
  sendBluetoothPairingResponse: (response) => ipcRenderer.send('bluetooth-pairing-response', response),
  cancelBluetoothRequest: () => ipcRenderer.send('cancel-bluetooth-request'),
  showBluetoothDevices: (callback) => ipcRenderer.on('show-bluetooth-devices', callback),
  selectBluetoothDevice: (deviceId) => ipcRenderer.send('bluetooth-device-selected', deviceId),
  showSerialDevices: (callback) => ipcRenderer.on('show-serial-devices', callback),
  selectSerialDevice: (portId) => ipcRenderer.send('serial-device-selected', portId),
  cancelSerialRequest: () => ipcRenderer.send('cancel-serial-request')
});