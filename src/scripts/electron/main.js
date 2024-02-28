const {
  app,
  shell,
  BrowserWindow,
  ipcMain,
  screen,
  Tray,
  globalShortcut,
} = require("electron");
const path = require("path");

let mainWindow;

const iconDir = "../../assets/lupin.png";

function createWindow() {
  const { width: screenWidth } = screen.getPrimaryDisplay().workAreaSize;
  const x = Math.floor((screenWidth - 800) / 2);

  mainWindow = new BrowserWindow({
    y: 200,
    x: x,
    width: 900,
    height: 70,
    show: true,
    transparent: true,
    backgroundColor: "#00FFFFFF",
    frame: false,
    resizable: false,
    icon: path.join(__dirname, iconDir),

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  globalShortcut.register("Alt+Q", () => {
    mainWindow.hide();
  });

  const trayIconPath = path.join(__dirname, iconDir);

  const appTray = new Tray(trayIconPath);

  appTray.on("click", () => {
    mainWindow.show();
  });

  mainWindow.on("blur", () => {
    mainWindow.hide();
  });

  mainWindow.loadFile(path.join(__dirname, "../../index.html"));
}

app.whenReady().then(() => {
  createWindow();

  console.log(path.join(__dirname, iconDir));

  ipcMain.on("search", (_, search) => {
    const searchValue = search[0].replace(" ", "+");
    const option = search[1];

    switch (option) {
      case "Youtube":
        shell.openExternal(
          `https://www.youtube.com/results?search_query=${searchValue}`
        );

        mainWindow.hide();
        break;
      case "Google":
        shell.openExternal(`https://www.google.com/search?q=${searchValue}`);

        mainWindow.hide();

        break;
      case "Yandex":
        shell.openExternal(`https://yandex.com/search/?text=${searchValue}`);

        mainWindow.hide();

        break;
      case "Twitter":
        shell.openExternal(`https://twitter.com/search?q=${searchValue}`);

        mainWindow.hide();

        break;

      default:
        console.log("nop");
        break;
    }
  });

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
