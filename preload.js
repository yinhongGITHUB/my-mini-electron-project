// 预加载脚本
const { contextBridge, ipcRenderer } = require("electron");

// contextBridge 是 Electron 提供的一个安全桥接模块，用于在预加载脚本中把主进程的数据或功能安全地暴露给渲染进程（网页）。
// 它可以防止渲染进程直接访问 Node.js API，提高安全性。

// 常用方法是 contextBridge.exposeInMainWorld，可以把指定的对象或方法挂载到 window 上，
// 供前端页面安全调用 window.versions.node() 之类的。

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  // 除函数之外，我们也可以暴露变量
});

// 有一点非常值得注意：contextBridge.exposeInMainWorld("versions", ...) 会在页面的 window 上挂载一个只读的 versions 属性，页面脚本（renderer.js）可以读取和调用，但不能直接修改或覆盖它。
