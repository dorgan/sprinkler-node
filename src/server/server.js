#!/usr/bin/env node
const fallback = require('express-history-api-fallback');
const express = require('express');
const serve   = require('express-static');
const bodyParser = require('body-parser')
const app = express();
const port = 80;
const path = require('path');
const auth = require(path.resolve(__dirname, 'config/auth.json'));
const md5 = require('md5');
const root = path.resolve(__dirname, '../client');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/auth/', (req, res) => {
    if (req.body.user && req.body.pass) {
        if (req.body.user === auth.user && md5(req.body.pass) === auth.password) {
            res.json({
                valid: true
            });
        } else {
            res.status('401').json({
                valid: false,
                error: 'Invalid username and/or password'
            });
        }
    } else {
        res.status('500').json({
            valid: false,
            error: 'Missing required parameters'
        });
    }
});
app.use(express.static(root, {fallthrough: true}));

app.use(fallback('index.html', {root: root}));

const server = app.listen(port, function(){
    console.log('server is running at %s', server.address().port);
  });
