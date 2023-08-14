const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
const secretkey = "123";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "users",
});

app.post("/api/login", (req,res) => {

    const {username, password} = req.body;

    connection.query(
        "SELECT * FROM login WHERE username = ? AND password = ?",[username, password],(err, result) => {

            if(err){
                res.status(500).json({message : err.message});
}
            else {
                if(result.length >0){
                    const token = jwt.sign({username},secretkey,{expiresIn : "1h"});

                    res.status(200).json({token});
                }
                else{
                    res.status(401).json({message : "Invalid username or password"});
                }
            }
            }
        );
        });

function verifyToken(req, res,next) {

    const token = req.headers["authorization"];
    if(token){

        jwt.verify(token, secretkey, (err, decoded) => {

            if (err){
                res.status(403).json({message: "Invalid token"});
            }else{

                req.user = decoded;
                next();
            }
        });
    }
}
app.use(verifyToken);
app.get("/app/students", (req,res)=> {
    Student.Find({}, (err,students) =>  {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).json(studemts);

        }
    });
});
app.get("/api", (req, res) => {
    res.json({ message: "sererconnected" });
});
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});