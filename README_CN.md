# MicroBlocksCN-Electron

这是一个基于 Electron 的 MicroBlocks 桌面应用程序。它将 Web 版本的 MicroBlocks IDE (mb-webapp/index.html)(https://github.com/MicroBlocksCN/smallvm) 包装在 Electron 中，以提供与本地硬件（如蓝牙和串口设备）交互的功能。

## 致谢

本项目延续以下开源项目，基于 MPL 2.0 协议。感谢：
*   https://bitbucket.org/john_maloney/smallvm
*   https://github.com/MicroBlocksCN/smallvm

## 先决条件

请确保您的系统已安装 [Node.js](https://nodejs.org/) 和 npm。

## 安装

克隆仓库后，在项目根目录下运行以下命令来安装所有依赖项：

```bash
npm install
```

## 开发模式

要以开发模式运行应用程序，请执行：

```bash
npm start
```
此命令将启动 Electron 应用程序。

## 使用须知

### USB 连接
使用 USB 连接时，请务必在点击应用程序中的“连接”按钮**之前**插入您的设备，否则可能无法搜索到设备。

### 各平台须知

#### Linux
*   运行 AppImage 文件时，需要添加 `--no-sandbox` 标志：
    ```bash
    ./MicroBlocks-xxx.AppImage --no-sandbox
    ```
*   为了使应用程序能够访问 USB 设备（如 `/dev/ttyUSBx` 或 `/dev/ttyACMx`），您需要将当前用户添加到 `dialout` 用户组。执行以下命令后，请**注销并重新登录**以使权限生效：
    ```bash
    sudo usermod -a -G dialout $USER
    ```

#### macOS
*   如果搜索不到蓝牙设备，请前往“系统设置” > “隐私与安全性” > “蓝牙”，确保 MicroBlocks 应用程序已被授予使用蓝牙的权限。

## 构建应用程序

该项目使用 `electron-builder` 进行打包。您可以在 `package.json` 文件中查看和修改构建配置。

### 通用构建

要为当前操作系统构建默认架构的版本，请运行：

```bash
npm run build
```

### 分平台和架构构建

您可以使用命令行标志为特定的平台（Windows, macOS, Linux）和架构（x64, arm64）进行交叉编译。

**Windows**

```bash
# 构建 Windows x64 (64位)
npm run build -- --win --x64

# 构建 Windows ARM64
npm run build -- --win --arm64
```

**macOS**

```bash
# 构建 macOS Intel (x64)
npm run build -- --mac --x64

# 构建 macOS Apple Silicon (arm64)
npm run build -- --mac --arm64
```

**Linux**

```bash
# 构建 Linux x64
npm run build -- --linux --x64

# 构建 Linux ARM64
npm run build -- --linux --arm64
```
构建完成后，打包好的应用程序将位于项目根目录下的 `dist` 文件夹中。


---

## 了解我们的产品：CoCube 桌面级 AI 教育机器人

如果您觉得这个项目对您有帮助，欢迎了解我们的主打产品 **CoCube**！

**CoCube** 是一款桌面级 AI 教育机器人，由上海交通大学与复旦大学的硕博团队联合研发，旨在为青少年开启通向人工智能的大门。我们致力于打造一个充满互动性、成就感与趣味性的创作平台。CoCube 通过让学生参与人工智能机器人的设计，从简单的程序编写到复杂的互动系统构建，帮助他们将创意和灵感转化为现实，从而激发学生的好奇心和创造力。

👉 **访问我们的 [官方网站](https://wiki.cocube.fun/) 了解更多详情！**