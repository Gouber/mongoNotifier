const mongoose = require('mongoose');
const uri = "mongodb://127.0.0.1:27017/tweets?replicaSet=rs";

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket){
    console.log('a user connected')
    let changeStream;

    mongoose.connect(uri, 
    	{
    		useNewUrlParser: true, 
    		useUnifiedTopology: true,
    		socketTimeoutMS: 0,       
      		connectTimeoutMS: 0
		});
	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
	  console.log("db opened")
	  // we're connected!
	  const collection = db.collection("tweets_nlp_ed")
	  changeStream = collection.watch();
	  changeStream.on('change', next => {
	  	console.log("Change emitted")
	  	socket.emit("change",next)  
	  });
	});

    socket.on("disconnect", () => {
    	console.log("A client disconnected")
    	mongoose.disconnect()
    	console.log("Mongoose disconnected")
    	if(changeStream){
    		changeStream.close()
    		console.log("Change stream closed")
    	}

    })
})

http.listen(3001, () => {
  console.log('listening on *:3001');
});

