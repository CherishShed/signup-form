const bodyParser = require("body-parser");
const express = require("express");
const mysql = require("mysql");
const app = express();
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "signup"
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { root: __dirname })
})
app.post("/", (req, res) => {
    function toTitleCase(str) {
        var lcStr = str.toLowerCase();
        return lcStr.replace(/(?:^|\s)\w/g, function (match) {
            return match.toUpperCase();
        });
    }
    let fname = toTitleCase(req.body.fname).trim();
    let lname = toTitleCase(req.body.lname).trim();
    let age = req.body.age;
    let email = req.body.email.trim();
    let state = req.body.state.trim();
    let lga = req.body.lga.trim();
    let phone = req.body.phone.trim();
    con.connect((err) => {
        if (err) throw err;
        console.log("Connected");
        var stmt = `INSERT INTO formData (firstName, lastName, age, stateOfOrigin, lga, phoneNumber, email) VALUES ('${fname}', '${lname}', ${age}, '${state}', '${lga}', '${phone}', '${email}')`;
        con.query(stmt, (err, result) => {
            if (err) throw err;
        })
    })
    res.render("index", { root: __dirname })
})

app.listen(8081, () => {
    console.log("Server has started at port 8081")
})

