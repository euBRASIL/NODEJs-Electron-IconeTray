/* imports das Bibliotecas do Framework Electron NODEJs */
const { BrowserWindow } = require('electron')
const { Tray } = require('electron')
const { app } = require('electron')
const IconPath = 'light16x16.png'


app.whenReady().then(App)

app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit() }})
/* Testa se o Sistema Operacional é um MACking Tosh */


function App() {
	const janela = CreateWindow()
	const iconetray = CreateTray()
	const { toggle } = ControlWindow( janela, iconetray )

	iconetray.on('click', toggle)
}


function CreateWindow() {
	const HTML = new BrowserWindow({
		width: 1200,
		height: 800,
        show: false,
		frame: false,
        alwaysOnTop: true, /* esta janela deve ficar sempre acima das outras janelas */
		skipTaskbar: true, /* esconder a icone do Electron na bandeja do Windows */
        transparent: true, /* torna a janela transparente */
		resizable: false,
        thickFrame: false,
		fullscreenable: false,
	})

	HTML.loadFile('index.html')
	return HTML

}


function ControlWindow( janela, iconetray ) {

	function toggle() {
		if(janela.isVisible()) { janela.hide() } 
		else { janela.show() }
	}

	function show() {
		const Position = getPosition()
		win.setPosition( 100, 100, false)
		janela.show()
		janela.focus()
	}

	function getPosition() {
		const janelaBounds = janela.getBounds()
		const iconeBounds  = iconetray.getBounds()
		const x = Math.round(iconeBounds.x + (iconeBounds.width / 2) - (janelaBounds / 2))
		const y = Math.round(iconeBounds.y + iconeBounds.height + 3)

		return { x, y }
	}

	return { toggle }
}


function CreateTray() {
	const icone = new Tray(IconPath)
	icone.setToolTip('euBRASIL')
	return icone
}

