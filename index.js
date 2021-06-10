
const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017/tweets?replicaSet=rs";
const client = new MongoClient(uri);
let changeStream;

async function run() {
  try{

      await client.connect();
      const database = client.db("tweets");
      const tweets = database.collection("tweets_nlp_ed");
      changeStream = tweets.watch();
      changeStream.on("change", (changeEvent) => { console.log(changeEvent)});
      changeSteam.close()

  } finally{
      await client.close();
  }
}

run().catch(console.dir);


// conn = new Mongo("mongodb://localhost:27017/tweets?replicaSet=rs");
// db = conn.getDB("tweets");
// collection = db.tweets_nlp_ed;

// const changeStreamCursor = collection.watch();

// pollStream(changeStreamCursor);

// //this function polls a change stream and prints out each change as it comes in
// function pollStream(cursor) {
//   while (!cursor.isExhausted()) {
//     if (cursor.hasNext()) {
//       change = cursor.next();
//       print(JSON.stringify(change));
//     }
//   }
//   pollStream(cursor);
// }