/// <reference path="definitions/ace.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/socket.io/socket.io.d.ts"/>

import events = require("events");
//import internal = require("./internal");

class Controller extends events.EventEmitter {
	
	private paused: boolean = false;
	
	constructor(private socket: SocketIO.Socket) {
		super();
		var that = this;
		
		socket.on('pause', function() {
			that.paused = true;
		});
		
		socket.on('resume', function() {
			that.paused = false;
		});
		
		socket.on('event', function(data: any) {
			var component: string = data.component || "unknown";
			var evt: string = data.event || "unknown";
			that.emit(component + "_" + evt, data.data || {});
		});
	}
	
	vibrate(duration: number = 500): void {
		this.socket.emit('vibrate', { tempo: duration });
	}

	beep(times: number = 1): void {
		this.socket.emit('beep', { vezes: times });
	}
    
    isPaused(): boolean {
        return this.paused;
    }
	
	/*alternate(controller: string): void {
		internal.changeController(controller);
	}*/
	
}

export = Controller;