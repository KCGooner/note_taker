var express = require("express");
var path = require("path");
var fs = require("fs");

//sets up express app
var app = express();

app.use(express.static('assets'));
var PORT = process.env.PORT || 3000;

//sets up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db.json"));
});

app.post("/api/notes", (req, res) => {

    const dataObj = req.body;
    const id = Date.now();
    const db = fs.readFileSync(path.join(__dirname, "/db.json"));

    const note = {
        id: id,
        title: dataObj.title,
        text: dataObj.text,
    };
    const dbfile = JSON.parse(db)
    dbfile.push(note);
    fs.writeFileSync(path.join(__dirname, "/db.json"), JSON.stringify(dbfile));
    res.sendFile(path.join(__dirname, "/db.json"));
});

app.delete("/api/notes/:id", (req, res) => {

    const id = req.params.id;
    const db = fs.readFileSync(path.join(__dirname, "/db.json"));
    const dbFile = JSON.parse(db);
    for (let x = 0; x < dbFile.length; x++) {
        if (dbFile[x].id.toString() === id) {
            dbFile.splice(x, 1);
            break;
        }
    }


});

//start server to listen
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});