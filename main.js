//import React, {useState} from 'react';
var React = require('react')
var useState = React.useState

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

let win

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  win.webContents.on('did-finish-load', function() {
    console.log('Reading JSON...')
    var json = require('./counter.json');
    const initialCounter = json.counterStartingPoint;
    win.webContents.send('initial-counter', initialCounter);
  });  

  win.loadFile('index.html');
  win.webContents.openDevTools();

  console.log('Started!');
  ipcMain.on('update-counter', (event, newCounter) => {
    console.log('Got update counter in main, storing to a file...');
    var dict = {"counterStartingPoint" : newCounter};
    var dictstring = JSON.stringify(dict);
    var fs = require('fs');
    fs.writeFile("./counter.json", dictstring, function(err, result) {
      if(err) console.log('error', err);
    });
    console.log('Done!');
  });
}

app.whenReady().then(() => {
  createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
