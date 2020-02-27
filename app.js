var express = require("express")
var path = require("path")

//sets up express app
var app = express();

app.use(express.static('assets'));
var PORT = process.env.PORT || 3000;

//sets up express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
});
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./notes.html"));
});


//start server to listen
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});