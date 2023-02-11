const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const { initWasm } = require("@trustwallet/wallet-core");

var twc = null;

async function handleGenerateAddress(event, coinType) {
  const wallet = twc.HDWallet.create(256, "password");
  const mnemonic = wallet.mnemonic();

  let address;
  switch(coinType) {
    case "btc":
      address = wallet.getAddressForCoin(twc.CoinType.bitcoin);
      break;
    case "eth":
      address = wallet.getAddressForCoin(twc.CoinType.ethereum);
      break;
    case "xrp":
      address = wallet.getAddressForCoin(twc.CoinType.xrp);
      break;
    default:
      wallet.delete();
      throw new Error("Invalid Coin Type!");
  } 

  wallet.delete();

  return [ mnemonic, address ];
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  mainWindow.webContents.closeDevTools();
  mainWindow.webContents.openDevTools();
};

const load_twc = async () => {
  // Load the Trust Wallet Core
  twc = await initWasm();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  load_twc().then(() => {
    ipcMain.handle("twc:generateAddress", handleGenerateAddress);

    createWindow();

    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) 
        createWindow();
    });
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") 
    app.quit();
});
