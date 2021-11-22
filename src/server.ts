import  express from "express";
import http from "http";
import socketio from "socket.io";
import path from "path";

const app = express();
const server = http.createServer(app); 
const io = new socketio.Server(server); 

app.use(express.static(path.join(__dirname, "..", "public"))); 

const users = []; 

io.on('connection', socket => {
    console.log(` User Connected: ${socket.id} `)

    

    socket.on('register', username =>{

        const userExist = users.find( user => user.username === username );

        if(userExist){
            userExist.socket_id = socket.id;
        }else{
            users.push({
                'username': username,
                'socket_id': socket.id
            });    
        }
    })

    socket.on('message', message => {

        const username = users.find(user => user.socket_id === socket.id)

       console.log(`Menssagem Enviada: ${message} Por: ${username.username}`)    
    })
})

server.listen(3000, ()=>{
    console.log("Hello Server")
})