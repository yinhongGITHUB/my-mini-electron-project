### Electron

Electron 是一个使用 JavaScript、HTML 和 CSS 构建*桌面应用程序*的框架。

##### 文档：https://www.electronjs.org/zh/docs/latest/

#### 什么是桌面应用程序？

- 定义：桌面应用程序（Desktop Application）是指直接运行在个人电脑操作系统（如 Windows、macOS、Linux）上的软件。用户可以通过桌面图标、开始菜单、Dock 等方式启动，拥有独立的窗口界面。

- 特点：

1.  直接安装在本地电脑上（如 .exe、.dmg、.app 文件）
2.  独立于浏览器运行
3.  可以访问本地文件、硬件、系统资源
4.  典型例子：微信、QQ、Word、Excel、Photoshop、VS Code、记事本等

- 与网页应用的区别：

1. 桌面应用：本地运行，性能高、权限大、可离线使用
2. 网页应用：浏览器中运行，跨平台但权限受限

- 现代桌面应用开发

1. 传统：C++、C#、Java、Delphi 等
2. 现代：Electron、Tauri、Flutter、.NET MAUI 等（可用 Web 技术开发跨平台桌面应用）

#### 这里扩展一个更大的核心概念----什么是 Web 技术构建应用程序？

定义：Web 技术构建应用程序，指的是用 HTML、CSS、JavaScript（以及各种前端框架如 Vue、React、Angular）来开发应用，不仅能运行在浏览器，还能通过 Electron、Tauri、Cordova 等框架打包为桌面应用或移动应用。

主要的三大应用场景：

1. Web 应用程序（Web App）
   直接运行在浏览器，如淘宝、知乎网页版。
2. 桌面应用程序
   用 Electron、Tauri 等框架，把 Web 前端代码打包成 Windows、macOS、Linux 的本地应用。
   例子：VS Code、微信开发者工具。
3. 移动应用程序
   用 Cordova、Capacitor、React Native、UniApp 等，把 Web 技术打包成 iOS/Android 应用。
   例子：钉钉、支付宝小程序。

#### 什么是 WebAssembly?

定义：WebAssembly（简称 Wasm）是一种新型的二进制代码格式和虚拟机技术，旨在让代码可以在网页浏览器等环境中高效、安全地运行。它不是一种编程语言，而是一种可以被多种语言（如 C、C++、Rust 等）编译生成的低级字节码格式。

特点：

- 高性能：接近原生速度，适合需要大量计算的应用（如游戏、视频处理、图形渲染等）。
- 跨平台：可以在各种操作系统和硬件上运行，只要有支持 Wasm 的环境（如现代浏览器）。
- 安全性：在沙箱环境中运行，限制对系统资源的访问，防止恶意代码危害主机。
- 与 JavaScript 互操作：可以与 JavaScript 代码互相调用，扩展 Web 应用的能力。

#### 异步加载 js 文件

async：下载完立即执行，可能阻塞解析，适合独立脚本。
defer：下载完等 DOM 解析完再执行，不阻塞页面，**推荐**。

#### 浏览器的字节码缓存

定义：浏览器的字节码缓存（Bytecode Cache）是指浏览器在加载和执行 JavaScript 时，将解析和编译后的“字节码”结果缓存起来，下次访问同一脚本时可以直接复用，提升页面加载和执行速度。

注意：JavaScript 编译生成的抽象语法树（AST）可以被转化为其他语言的代码

##### 具体执行过程

1. 下载 JS 源代码
2. 解析（Parse）：将 JS 源码解析为抽象语法树（AST）
3. 编译（Compile）：将 AST 编译为字节码（Bytecode）
4. 执行（Execute）：由 JS 引擎（如 V8）解释执行字节码，热点代码再 JIT 编译为机器码

##### 会被缓存的文件

1. 外部 JS 文件（.js、.mjs 等），通过 `<script src="...">` 加载
2. 文件内容未变（URL、内容、响应头都没变
3. 响应头允许缓存（如 Cache-Control、ETag 合理设置）

##### 和浏览器缓存机制（强缓存、协商缓存）的关系

首先，文件内容未变，就会被缓存，那么**是怎么检测文件内容未变的？**

1. 只要 JS 文件的 URL 没变（包括路径、查询参数等），浏览器才会考虑复用缓存。
2. 强缓存（如 Cache-Control: max-age=31536000）、协商缓存（If-None-Match 和 ETag、Last-Modified 和 If-Modified-Since）
3. 文件名的 hash（如 main.123abc.js），只要 hash 不变，内容就没变。

其次，字节码和浏览器缓存机制的关系？

字节码缓存是基于浏览器的缓存机制 强缓存协商缓存的基础上 的具体缓存实现，换句话说 协商缓存、强缓存只是判断要不要缓存，字节码换成是真的指的缓存这个动作

最后，哪些文件会被协商缓存 哪些文件会被强缓存？

- 强缓存：JS、CSS、图片、字体、音视频等
- 协商缓存：index.html、API 返回的 JSON、HTML、接口数据、动态生成的图片等

#### 什么是 Chromium？

Chromium 是一个完整开源浏览器项目，包括浏览器界面、功能、渲染引擎、JS 引擎、网络栈等，是 Chrome、Edge、Electron 等项目的基础。

- 主要组成部分

1. Blink 渲染引擎：负责网页的解析与渲染，最初基于 WebKit，后由 Google 分支为 Blink。
2. V8 JavaScript 引擎：高性能的 JS 引擎，广泛应用于 Node.js、Chrome、Electron 等项目。
3. 网络栈：负责 HTTP/HTTPS、WebSocket 等协议的实现。
4. 多进程架构：每个标签页、插件等运行在独立进程，提高了稳定性和安全性。
5. 安全机制：包括沙箱（sandbox）、自动更新（Chrome 专有）、安全浏览等。

Chromium 是一个开源浏览器项目，是 Google Chrome 浏览器的“内核”和基础代码库。Chrome 浏览器就是在 Chromium 的基础上开发的。

Electron 的 web 渲染内核也是 Chromium？

#### 关于 Electron 的进程

- 主进程（Main Process）
  负责应用的生命周期管理、窗口创建与管理、与操作系统的交互等。
  只有一个，运行在 Node.js 环境下。
  你写的 main.js 就是主进程脚本。
  可以访问 Node.js 的全部 API 和 Electron 的主进程 API。

- 渲染进程（Renderer Process）
  每个窗口（BrowserWindow 是一个构造函数，可以实例化出多个实例对象）对应一个渲染进程。
  负责显示网页内容，类似于浏览器中的每个标签页。
  运行在浏览器环境下，可以使用 DOM、JS、CSS，但默认不能直接访问 Node.js API（除非开启 nodeIntegration 或通过 preload 脚本暴露接口）。

- GPU 进程（GPU Process）
  专门负责硬件加速相关的任务，如页面渲染、视频解码等。它由 Chromium 自动管理，提升图形性能。

- Utility 进程（实用进程）
  用于处理特定的后台任务，比如网络服务、音频服务等。它们是 Chromium 的一部分，帮助分担主进程压力。

- Crash Reporter 进程
  用于收集和上报应用崩溃信息，便于开发者排查问题。

- Node.js Worker 线程/进程
  如果你在主进程或渲染进程中使用了 Node.js 的 worker_threads 或 child_process，也会额外产生子线程或子进程，用于执行耗时任务。

#### 关于预加载环境

##### 预加载环境是什么？

1. 预加载环境（preload environment）是 Electron 独有的一种运行环境，介于主进程和渲染进程之间。

2. 预加载脚本（preload.js）在渲染进程的页面加载前，由主进程通过 webPreferences.preload 指定并自动执行。

3. 预加载脚本运行在渲染进程的上下文中，但拥有部分 Node.js 能力（如 require、process 等），同时可以访问 4. Electron 的 contextBridge 和 ipcRenderer。

4. 预加载环境是“隔离的”，即它和页面脚本（renderer.js）之间有安全边界，页面脚本默认无法直接访问 Node.js API。

##### 为什么需要预加载环境？

1. 安全性：直接在渲染进程中开放 Node.js API，网页就能随意操作本地文件、系统资源，极易被恶意代码利用。预加载环境可以只暴露有限、受控的 API 给页面，极大提升安全性。

2. 桥接作用：预加载脚本可以用 contextBridge.exposeInMainWorld 把主进程或 Node.js 的部分功能安全地暴露到 window 对象上，供前端页面调用。

3. 灵活性：你可以自定义暴露哪些方法、数据，既能满足业务需求，又能防止页面脚本越权访问敏感资源。

##### 有一点非常值得注意：contextBridge.exposeInMainWorld("versions", ...) 会在页面的 window 上挂载一个只读的 versions 属性，页面脚本（renderer.js）可以读取和调用，但不能直接修改或覆盖它。

#### 关于进程间的通信 (IPC)

1. **主进程**向**渲染进程**通信

流程简介：主进程 ipcMain.handle 注册 → 预渲染 ipcRenderer.invoke 拿并再次注册 → 渲染进程再次拿预渲染注册的

主进程环境（main.js）

```js
// main.js
app.whenReady().then(() => {
  // 主进程利用**ipcMain.handle**注册一个名为ping的处理器
  ipcMain.handle("ping", () => "pong");
  createWindow();
});
```

预加载环境 的 预加载脚本（preload.js）

```js
// preload.js
contextBridge.exposeInMainWorld("versions", {
  // 预加载环境利用**ipcRenderer.invoke**把名为ping的处理器注册到window的全局对象上面
  ping: () => ipcRenderer.invoke("ping"),
});
```

渲染进程环境 的 页面脚本（renderer.js）

```js
// renderer.js
// 注意：返回的是一个promise
window.versions.ping().then((result) => {
  console.log(result); // "pong"
});
```

2. **渲染进程**向**主进程**通信

流程简介：渲染进程触发一个预加载注册的处理器函数 → 预加载 ipcRenderer.send 注册一个处理器函数 → 主进程 ipcMain.on 监听预加载注册的处理器函数

主进程环境（main.js）

```js
// main.js
app.whenReady().then(() => {
  // 主进程利用**ipcMain.on**注册一个名为ping的处理器函数
  ipcMain.on("ping", (event, arg) => {
    console.log(arg); // arg就是渲染进程传来的数据
  });
  createWindow();
});
```

预加载环境 的 预加载脚本（preload.js）

```js
// preload.js
contextBridge.exposeInMainWorld("versions", {
  // 预加载环境利用**ipcRenderer.send**把名为ping的处理器注册到window的全局对象上面
  sendEvent: (arg) => ipcRenderer.send("ping", arg), // arg就是渲染进程传来的数据
});
```

渲染进程环境 的 页面脚本（renderer.js）

```js
// renderer.js
window.versions.sendEvent("我是渲染进程传进来的数据");
```

注意：我们使用了一个辅助函数（sendEvent、ping）来包裹 ipcRenderer.invoke('ping') 调用，而并非直接通过 contextBridge 暴露 ipcRenderer 模块。 你永远都不会想要通过预加载直接暴露整个 ipcRenderer 模块。 这将使得你的渲染器能够直接向主进程发送任意的 IPC 信息，会使得其成为恶意代码最强有力的攻击媒介。

#### 关于打包----Electron Forge

##### 打包命令

```js

// 1. 安装 forge 工具
// 安装 Electron Forge 的命令行工具到开发依赖。这样你可以在本地项目中直接使用 forge 相关命令，保证团队和 CI 环境一致。
npm install --save-dev @electron-forge/cli

// 2. 配置 forge 环境
// 把你的现有 Electron 项目升级/转换为 Electron Forge 管理的项目。它会自动添加 forge 配置文件、安装打包和发布所需依赖，让项目支持一键打包、发布等功能。
npx electron-forge import

// 3. 打包生成安装包
// 用 Electron Forge 打包你的应用，生成可分发的安装包（如 .exe、.dmg 等），让用户可以直接安装和运行你的桌面应用。
npm run make

```

##### 打包需要注意的点

1. 默认行为：Electron Forge 在 Windows 系统下默认只为当前平台和当前架构（如 win32-x64）打包。不会自动为其它平台（如 macOS、Linux）或其它架构（如 x86）生成包。

2. 跨平台打包限制：打包 macOS 应用，必须在 macOS 系统上操作；打包 Linux 应用，推荐在 Linux 上操作。Electron 官方不支持在 Windows 上直接打包 mac 或 linux 的安装包。

3. 在windows打x86（32位）包：如果你想打 32 位包，需要在 forge.config.js 里配置 arch，或在命令行加参数，electron-forge make --arch=ia32 想打64位的就用electron-forge make --arch=x64

##### 那么如何才能跨平台打包呢

原因：目前没有任何官方或第三方工具可以让你在 Windows 电脑上直接打包出 macOS 的 .dmg 或 .app 安装包。
原因是 macOS 的打包和签名依赖于 macOS 系统的底层工具（如 Xcode、codesign），这些只能在 Mac 上运行。

解决办法：云构建服务（如 GitHub Actions、Travis CI）在 macOS runner 上打包。
