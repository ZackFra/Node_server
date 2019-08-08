"use strict"

const fs = require('fs');
const nodemailer = require('nodemailer');

function loadJS(request, response) {
	let url = request.url.slice(1);
	fs.readFile(url, (error, data) => {
		if(error) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(`Failed to load ${url}`);
		}
		else {
			response.writeHead(200, {'Content-Type': 'text/javascript'});
			response.write(data);
		}
		response.end();
	});
}

function loadCSS(request, response) {
	let url = request.url.slice(1);
	fs.readFile(url, (error, data) => {
		if(error) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(`Failed to load ${url}`);
		}
		else {
			response.writeHead(200, {'Content-Type': 'text/css'});
			response.write(data);
		}
		response.end();
	});
}

function loadPage(request, response) {
	if(request.url === '/')
		request.url = '/index.html';

	let url = request.url.slice(1);

	fs.readFile(url, 'utf8', (error, data) => {
		if(error) {
			response.writeHead(404, {'Content-Type': 'text/html'});
			response.write('404 File Not Found');
		}
		else {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(data)
		}
		response.end();
	});
}

function email(request, response) {
	console.log('Got here');
	let transporter = nodemailer.createTransport({
		service: 'hotmail',
		auth: {
			user: 'myself@hotmail.com',
			pass: 'Dont Worry About It'
		}
	});

	let mailOptions = {
		from: 'myself@hotmail.com',
		to: 'someoneElse@gmail.com',
		subject: 'sent from node',
		text: 'Lets see if this works'
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if(error) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(`Email not sent`);
			response.end();
		}
		else {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(`Email sent: ${info.response}`);
			response.end();
		}
	});
}

exports.loadPage = loadPage;
exports.email = email;
exports.loadCSS = loadCSS;
exports.loadJS = loadJS;