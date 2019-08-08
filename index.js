"use strict"

const server = require('./server');
const handler = require('./requestHandler');

let handle = {};
handle['/'] = handler.loadPage;
handle['loadPage'] = handler.loadPage;
handle['loadCSS'] = handler.loadCSS;
handle['loadJS'] = handler.loadJS;
handle['/email'] = handler.email;

server.start(handle);