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

持续学习中......
