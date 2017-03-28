var express = require('express'),
    app = express(), 
    server = require('http').createServer(app),
    io = require("/home/jhon/pweb/serverjs/node_modules/socket.io").listen(server),
    listaDeNicknames = {};

app.use(express.static("public"));
server.listen(8000);
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

//CUANDO CUANDO SE RESIBE UNA CONEXION DE CUALQUIER NAVEGADOR
io.sockets.on('connection', function(esteNavegador) {
	
    //CUANDO esteNavegador ENVIA EL VALOR DEL NICKNAME Y ESPERA UNA CALBACK CON TRUE O FALSE
    esteNavegador.on('new user', function(nicknameVal, callback) {
        //SI EL NICNAME QUE SE RECIBE ESTA DENTRO DE LA LISTA DE LOS listaDeNicknames REGRESAMOS UN TRUE
        if (nicknameVal in listaDeNicknames) {
            callback(true);
        } 
        //SI EL NICKNAME NO ESTA DENTRO DE LA LISTA DE LOS listaDeNicknames MANDAMOS UN CALBACK FALSO Y AGREGAMOS ESE NICKNAME A LA LISTA DE listaDeNicknames
        else {
			 
            callback(false);
            //CREAMOS UNA VARIBLE GLOBAL LLAMADA esteNavegador.nickname A LA QUE LE ASIGNAMOS EL NOMBRE DEL NICKNAME QUE SE ACABA DE REGISTRAR
            esteNavegador.nickname = nicknameVal;
            //AL AL LISTA DE NICKNAMES AGRGAMOS ESTE NICKNAME CON UN VALOR DE 1
            listaDeNicknames[esteNavegador.nickname] = 1;
            //ACTUALIZAMOS LA LISTA DE NICKNAMES Y MANDAMOS AL HTML ESA LISTA
            updateNickNames();
        }
    });
    
    esteNavegador.on('disconnect', function(data) {
        if(!esteNavegador.nickname) return;
        delete listaDeNicknames[esteNavegador.nickname];
        updateNickNames();
    });
    function updateNickNames() {
        io.sockets.emit('usernames', listaDeNicknames);
    }
});
