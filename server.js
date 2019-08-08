"use strict"

const http = require('http');
const {route} = require('./router');

function start(handle) {
	function onResponse(request, response) {
		route(handle, request, response);
	}

	http.createServer(onResponse).listen(8000, error => {
		if(error)
			console.log('something went wrong', error);
		else
			console.log('server is listening (port 8000)')
	});
}

exports.start = start;