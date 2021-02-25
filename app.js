var express = require("express");
var app = express();
var port = 4000;
var bodyParser = require('body-parser');
var io       = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://username:admin123@express.hrqjh.mongodb.net/post?retryWrites=true&w=majority", 
{useNewUrlParser: true, useUnifiedTopology: true});

var nameSchema = new mongoose.Schema({
    posting: String
});
var Data = mongoose.model("Data", nameSchema);

Data.find().exec(function (err, results) {
    var count_index = results.length;
    console.log(count_index);
});   

var emotion_labels = ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"];
for(i=0;i<emotion_labels.length;i++){
    //console.log(emotion_labels[i]);
    Data.find({"posting" : emotion_labels[i]}).exec(function (err, results) {
    count_sad = results.length;
    //globalCountSad = count_sad;
    });
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    // res.jsonp();
});

app.post("/adddata", (req, res) => {
    var myData = new Data(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
            console.log(res);
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});


app.get('/adddata/chart', function(req, res) {
	Data.find().exec(function(err, msgs) {
		res.json(msgs);
	});
});

io.on('connection', function (socket) {

	Data.aggregate(

		[{ "$group": {
			"_id": "$posting",
			"total_posting": { "$sum": 1 }
		}}],

		function(err, results) {
			if (err) throw err;

			socket.emit('Data', results);
		}
		);

});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

//   app.get('/chart', function(req, res) {
//     res.sendFile(__dirname + "/layout.html");
//   });

//   app.post("/chartdata", (req, res) => {
//     var myData = new Data(req.body);
//     myData.save()
//         .then(item => {
//             res.send("Name saved to database");
//             console.log(res);
//         })
//         .catch(err => {
//             res.status(400).send("Unable to save to database");
//         });
// });

// Data.find({"posting":"angry"},function (err, results){
//     if (err) res.send(err)
  
//     res.send(JSON.parse(JSON.stringify(results)))
//   });

// Data.find().lean().exec(function (err, doc) {
//     res.json(doc);
// })
  //var $_GET = {};
// var globalCountSad;
// function countSAD(){

//   //alert(" : " + globalCountSad);
//}

//console.log(globalCountSad)
//countSAD();
// console.log(countSAD());

// console.log(countSAD().globalCountSad);
// countSAD(globalCountSad){
//     const countsads = globalCountSad;
//     console.log(countsads);
// }



// Data.find({"posting" : 'sad'}).exec(function (err, results) {
//     var count_sad = results.length
//     console.log("Sad : " + count_sad);
//   });
//   Data.find({"posting" : 'neutral'}).exec(function (err, results) {
//     var count_neutral = results.length
//     console.log("Neutral : " + count_neutral);
//   });
//   Data.find({"posting" : 'happy'}).exec(function (err, results) {
//     var count_happy = results.length
//     console.log("happy : " + count_happy);
//   });
//   Data.find({"posting" : 'disgust'}).exec(function (err, results) {
//     var count_disgust = results.length
//     console.log("disgust : " + count_disgust);
//   });
//   Data.find({"posting" : 'fear'}).exec(function (err, results) {
//     var count_fear = results.length
//     console.log("fear : " + count_fear);
//   });
//   Data.find({"posting" : 'angry'}).exec(function (err, results) {
//     var count_angry = results.length
//     console.log("angry : " + count_angry);
//   });
//   Data.find({"posting" : 'surprise'}).exec(function (err, results) {
//     var count_surprise = results.length
//     console.log("surprise : " + count_surprise);
//   });