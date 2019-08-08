"use strict"

function route(handle, request, response) {
	console.log(`About to route request for ${request.url}`);
	let css = /.+(\.css)$/;
	let js = /.+(\.js)$/;
	let html = /.+(\.html)$/

	if(typeof handle[request.url] === 'function')
		handle[request.url](request, response);
	else if(request.url.match(html))
		handle['loadPage'](request, response);
	else if(request.url.match(css))
		handle['loadCSS'](request, response);
	else if(request.url.match(js))
		handle['loadJS'](request, response);
	else {
		response.writeHead(404, {'Content-Type': 'text/html'});
		response.write(`File Not Found: ${request.url}`);
		response.end();
	}
}

exports.route = route;