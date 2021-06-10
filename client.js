const io = require("socket.io-client");
let socket = io('http://localhost:3001/')

socket.on('msg', function(msg){
    console.log("Received" + msg)
})