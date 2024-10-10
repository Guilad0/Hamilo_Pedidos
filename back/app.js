var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pedidosRouter = require('./routes/pedidos');
var productosRouter = require('./routes/productos');
var usuariosRouter = require('./routes/usuarios');
var authRouter = require('./routes/auth');
var users = require('./routes/users');

var cors = require('cors');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pedidos', pedidosRouter);
app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/auth', authRouter);
app.use('/users', users);

module.exports = app;
