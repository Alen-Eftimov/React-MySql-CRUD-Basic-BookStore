const express = require("express");

const app = express();

const mysql = require("mysql")

const cors = require('cors')

app.use(express.json());

// const bodyparser = require("body-parser")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bookstore_test",
    port: "3307",
})

// const corsOptions ={
//     origin: '*',
//     credentials: true,          //access-control-allow-credentials:true
//     optionSuccessStatus: 200,
// }

// app.use(cors(corsOptions))  // Use this after the variable declaration 
app.use(cors())

app.get("/", (req, res) => {
    res.json("Hello, this is backend-server")
});

app.get("/books", (req, res) => {
    const sql = "SELECT * FROM books"
    db.query(sql, (error, data) => {
        if (error) {
            console.log(error);
            res.json(error)
        } else {
            console.log(data);
            res.json(data)
        }
    })
})

// Route operatins in another folder
// DB operations in another folder
app.post("/books", (req, res) => {
    const sql = "INSERT INTO books (`title`, `description`, `price`, `image_cover`) VALUES (?)"
    // const values = ["title from backend", "description from backend", "image_cover picture from backend"]
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.image_cover
    ]
    db.query(sql, [values], (error, data) => {
        if (error) {
            console.log(error);
            res.send(error)
        } else {
            console.log(data);
            res.json("Books has been created successfuly.")
        }
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id
    const sql = "DELETE FROM books WHERE id = ?";

    db.query(sql, [bookId], (error, data) => {
        if(error) {
            console.log(error);
            res.send(error)
        } else {
            console.log(data);
            res.json("Books has been deleted successfuly.")
        }
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id
    const sql = "UPDATE books SET `title` = ?, `description` =? , `price` = ?, `image_cover` = ? WHERE id = ? ";

    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.image_cover,
    ]

    db.query(sql, [...values, bookId], (error, data) => {
        if (error) {
            console.log(error);
            res.send(error)
        } else {
            console.log(data);
            res.json('Books has been updated successfuly.')
        }
    })
})


app.listen(8800, () => {
    console.log("Connected to backend-server! ");
})