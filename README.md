# MicroBlocksCN-Electron
[中文版README](./README_CN.md)

This is an Electron-based desktop application for MicroBlocks. It wraps the web version of the MicroBlocks IDE (mb-webapp/index.html)(https://github.com/MicroBlocksCN/smallvm) in Electron to provide capabilities for interacting with local hardware, such as Bluetooth and serial port devices.

## Acknowledgements

This project is a continuation of the following open-source projects under the MPL 2.0 license. Thanks to:
*   https://bitbucket.org/john_maloney/smallvm
*   https://github.com/MicroBlocksCN/smallvm

## Prerequisites

Please ensure that you have [Node.js](https://nodejs.org/) and npm installed on your system.

## Installation

After cloning the repository, run the following command in the project's root directory to install all dependencies:

```bash
npm install
```

## Development Mode

To run the application in development mode, execute:

```bash
npm start
```
This command will launch the Electron application.

## Usage Notes

### USB Connection
When using a USB connection, please make sure to plug in your device **before** clicking the 'Connect' button in the application. Otherwise, the device may not be detected.

### Platform-Specific Notes

#### Linux
*   When running the AppImage, you may need to add the `--no-sandbox` flag:
    ```bash
    ./MicroBlocks-xxx.AppImage --no-sandbox
    ```
*   To allow the application to access USB devices (e.g., `/dev/ttyUSBx` or `/dev/ttyACMx`), you need to add your user to the `dialout` group. After running the command, you must **log out and log back in** for the changes to take effect:
    ```bash
    sudo usermod -a -G dialout $USER
    ```

#### macOS
*   If you cannot find Bluetooth devices, you may need to grant the MicroBlocks application Bluetooth permissions in 'System Settings' > 'Privacy & Security' > 'Bluetooth'.

## Building the Application

This project uses `electron-builder` for packaging. You can view and modify the build configuration in the 

package.json

 file.

### General Build

To build a version for the current operating system with the default architecture, run:

```bash
npm run build
```

### Building for Specific Platforms and Architectures

You can use command-line flags to cross-compile for specific platforms (Windows, macOS, Linux) and architectures (x64, arm64).

**Windows**

```bash
# Build for Windows x64 (64-bit)
npm run build -- --win --x64

# Build for Windows ARM64
npm run build -- --win --arm64
```

**macOS**

```bash
# Build for macOS Intel (x64)
npm run build -- --mac --x64

# Build for macOS Apple Silicon (arm64)
npm run build -- --mac --arm64
```

**Linux**

```bash
# Build for Linux x64
npm run build -- --linux --x64

# Build for Linux ARM64
npm run build -- --linux --arm64
```

Once the build is complete, the packaged application will be located in the dist folder in the project's root directory.


---

## Check Out Our Product: CoCube Desktop AI Educational Robot

If you find this project helpful, you might love our main product, **CoCube**!

**CoCube** is a desktop-level AI educational robot, jointly developed by Master's and PhD teams from Shanghai Jiao Tong University and Fudan University. It aims to open the door to artificial intelligence for teenagers by creating an interactive, fulfilling, and fun creative platform. CoCube stimulates students' curiosity and creativity by enabling them to design AI robots, from simple programming to building complex interactive systems, helping them turn their ideas and inspiration into reality.

👉 **Visit our [Official Website](https://wiki.cocube.fun/) to learn more!**