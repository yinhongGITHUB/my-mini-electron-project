const information = document.getElementById("info");

// 由于预加载脚本(preload.js)中暴露的 API，然后又在主进程（main.js）中通过 webPreferences 的 preload 选项加载了该脚本，
// 我们可以直接访问 window.versions，也可以直接versions（默认js会去取window.versions），如下所示：
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`;

const func = async () => {
  const response = await window.versions.ping();
  console.log(response); // 打印 'pong'（window环境下，Ctrl+Shift+I（或 F12），打开开发者工具查看）
};

func();
