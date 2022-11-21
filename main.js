/* eslint-env es6 */
const {app, BrowserWindow} = require('electron');

let win;

function createWindow(){

  win = new BrowserWindow({
    width: 1200,
    height: 1200,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/www/assets/icon/favicon.png`,


  })
  win.loadURL(`file://${__dirname}/www/index.html`)

  //uncomment below to open the DevTools
  // win.webContents.openDevTools()


  win.on('closed', function(){
    win = null
  })
}

  app.on('ready',createWindow)

  app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){
      app.quit()
    }
  })

  app.on('activate', function(){

    if(win === null){
      createWindow()
    }
  })
