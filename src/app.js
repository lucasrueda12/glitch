const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const routerViews = require('./routes/views.router.js');

// configurar servidores
const app = express();
const httpServer = app.listen(8080, ()=> console.log('listening'));
const io = new Server(httpServer);

// config engine templates

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', routerViews);


const messages = []

io.on('connection', socket =>{
    console.log('new cliente connected');

    socket.on('message', data =>{
        messages.push(data)
        io.emit('logs', messages)
    })
})