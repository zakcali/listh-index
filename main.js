//Electron setup
const { app, BrowserWindow ,ipcMain} = require('electron')
const path = require('path')
const electron = require('electron')
const fetch = require('node-fetch-commonjs').default
const fs = require('fs')
const { dialog } = require('electron')

async function createWindow () {
  // Create the browser window.
global.win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
		nodeIntegration: true,
		nativeWindowOpen: true,
		enableRemoteModule: true,
		worldSafeExecuteJavaScript: true,
		preload: path.join(__dirname, 'preload.js'),
    }
  })
// global.win.webContents.on("devtools-opened", () => { win.webContents.closeDevTools(); });
global.win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
// https://stackoverflow.com/questions/61161341/electron-dialog-not-saving-file
ipcMain.handle('save', async (event, saveText) => {
  const { filePath, canceled } = await dialog.showSaveDialog({
    defaultPath: "output.csv"
  });

  if (filePath && !canceled) {
    const data = new Uint8Array(Buffer.from(saveText));
    fs.writeFile(filePath, data, (err) => {
      if (err) throw err;
      return ('The file has been saved!');
    });
  }
})

ipcMain.handle('checkHindex', async (event, rid) => {
let returnText='\"'+'https://www.webofscience.com/wos/author/rid/'+rid+'\"'
const url = 'https://publons.com/wos-op/api/stats/individual/' + rid +'/' 
const today = new Date();
const yyyy = today.getFullYear();
try {
const response = await fetch(url);
const data = await response.json();
// console.log(data);
if (data['detail']=="Not found.")
	return (returnText+'\t'+rid+'\t'+'')
returnText=returnText+'\t'+rid+'\t'+data['hIndex']+'\t'+data['timesCited']+'\t'+data['numPublicationsInWosCc']
for (i=yyyy; i>1960; i--) {
	let cpyear = data['citationsPerYear'][i.toString()]
		if (cpyear)
			returnText=returnText+'\t'+cpyear
	}
return (returnText)
}
catch(err) {
	return (returnText+'\t'+rid+'\terror')
}

})




