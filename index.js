let express = require('express');
let app = express();
app.use('/', express.static('public'));

let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log("Server listening at port " + port);
});


// let io = require('socket.io');
// io = new io.Server(server);

// io.sockets.on('connection', function(socket) {
//     console.log("We have a new client: " + socket.id);

//     // socket.on('newUser', (data) => {
//     //     userProperties = { id: socket.id, name: data.name };
//     //     socketNames.push(userProperties.name); // stores name in the array
//     //     socket.broadcast.emit('newUser', userProperties);
//     // });

//     //Listen for this client to disconnect
//     socket.on('disconnect', function() {
//         console.log("A client has disconnected: " + socket.id);
//     });
// });

const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://toomie:00M1EZ00M1E.@clfinal.of9oacx.mongodb.net/?retryWrites=true&w=majority");

db.on("ready", () => {
    console.log("Connected to the database");
});

db.connect();

app.use(express.json());

let plants = [];

//2. add a route on server, that is listening for a post request

app.post('/plantdata', (req, res) => { //this is posting whenever a new object is made 
    console.log(req.body);
    let currentDate = Date();
    let plant = {
        plant: req.body,
        date: currentDate
    }

    //DB - 2 - add values to the DB
    db.set("plantdata", req.body);
    res.json({ task: "success" });
})

// //add route to get all plant information
app.get('/getplants', (req, res) => {
    //DB - 3 - fetch from the DB
    db.get("plantdata").then(plantdata => {
        let plant = { data: plantdata };
        console.log(plantdata);
        res.json(plant);
    
    })

})



// app.get('/getplants', (req,res)=> {
//     //DB - 3 - fetch from the DB
//     db.get("plants").then(getplantdata => {
//         let plantObj = {data: getplantdata};
//         res.json(plantObj);
//         console.log(plantObj);
//     })
// }) //hi

