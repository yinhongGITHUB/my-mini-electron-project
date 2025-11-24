const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  // BrowserWindow 是 Electron 提供的一个类，用于创建和控制应用中的原生浏览器窗口。
  // 它的作用类似于在桌面应用中打开一个网页窗口。
  // 你可以通过 BrowserWindow 设置窗口的大小、标题、是否可调整、是否有边框等属性，并加载本地的 HTML 文件或远程网页。
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // 指定预加载脚本的路径
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // win是一个浏览器窗口的实例化对象，表示此时会显示一个窗口，内容是index.html文件的内容
  win.loadFile("index.html");
};

// whenReady函数：当 Electron 完成初始化，可以创建窗口时。
app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      // 兼容苹果，在没有窗口打开时点击 Dock 图标会重新创建一个窗口
      createWindow();
    }
  });
});

// 此时：运行 npm run start 来启动应用程序。会打开一个800*600的浏览器，内容就是index.html的内容。

// 当所有窗口都被关闭时，退出应用（除非是在 macOS 系统）上。
// 为什么要这么写?
// 在 Windows 和 Linux 上，关闭所有窗口通常意味着退出应用。
// 但在 macOS 上，应用关闭所有窗口后通常会继续在 Dock 栏驻留，只有用户主动退出才会真正关闭应用。

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
  // 执行 app.quit() 终端的会关闭刚刚npm run start启动的应用程序
});
