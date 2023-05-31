let io: any;

const socketIo = {
	init: (httpServer: any) => {
		io = require('socket.io')(httpServer, {
			cors: {
				origin: "*",
			}
		})

		return io;
	},
	getIO: () => {
		if(!io) {
			throw new Error('Socket.io not initialized!');
		}
		return io;
	}
}

export default socketIo