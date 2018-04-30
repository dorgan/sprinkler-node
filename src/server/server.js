#!/usr/bin/env node

const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => res.send('<select><option value="1">1</option><option value="2">2</option><option value="3">3</option></select> <button value="on">On</button> <button value="off">Off</button>'));

app.listen(port, () => console.log('Listening on port: ' + port));
