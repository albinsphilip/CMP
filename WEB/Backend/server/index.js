const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
//const fs = require('fs');

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
//const mysql = require("mysql");
const uri = "mongodb+srv://aaron:aa@cluster0.cgelvmu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
//const secretkey = "123";


var student = '';

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    async function run() {
        try {
       /*     const us=[
                {
                    "username": "aarone",
                    "password": "aea",
                    "name": "Aaronrm",
                    "rollno": "kte21msqa",
                    "religion": "cgrsja",
                    "phone": "87418029380",
                    "fathersname": "andcsh",
                    "mothersname": "shckadk",
                    "attendance": {
              
                      "Math": [
                        {
                          "date": "01/01/2021",
                          "value": "Present"
                        },
                        {
                          "date": "01/02/2021",
                          "value": "Present"
                        },
                        {
                          "date": "01/03/2021",
                          "value": "Present"
                        },
                        {
                          "date": "01/04/2021",
                          "value": "Present"
                        },
                        {
                          "date": "01/05/2021",
                          "value": "Absent"
                        }
                      ],
                      "English": [
                        {
                          "date": "01/01/2021",
                          "value": "Present"
                        },
                        {
                          "date": "01/02/2021",
                          "value": "Present"
                        },
                        {
                          "date": "01/03/2021",
                          "value": "Present"
                        },
                        {
                          "date": "01/04/2021",
                          "value": "Present"
                        },
                        {
                          "date": "01/05/2021",
                          "value": "Absent"
                        }
                      ]
              
                    }
                }
            ]*/
            await client.connect();
            const db = client.db('data');
            const collection = db.collection('user');
          /* try {
                const insertManyResult = await collection.insertMany(us);
                console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
              } catch (err) {
                console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
              }*/
            await client.db("user").command({ ping: 1 });
           
            const user = await collection.findOne({ username, password });
            if (user) {
                const token = jwt.sign({ username }, '123');
                res.json({ token });
                student=user;
              
            }
            else if (username === "" || password === "") {
                res.status(401).json({ message: 'Enter username or password!' });
            }
            else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});
app.get("/api/student", (req, res) => {

    res.json(student);
});
/*app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    fs.readFile('server/student.json', 'utf8', function (err, data) {
        // Handle the error if any
        if (err) {
            console.error(err);
            return;
        }
        // Parse the data into a JavaScript object
        const parsed = JSON.parse(data);
        const users = parsed.users;
        //  let usera = Object.values(users);
        var b = false;
        // var user = usera.find(user => user.username === username);
        for (const user of users) {
            // Access the username and password properties of each user object
            if (user.username === username && user.password === password) {
                b = true;
                student = user.name;

            }
        }

        // console.log(user);

        if (b) {
            const expiresIn = 60 ;
            const token = jwt.sign({ username,exp: expiresIn  }, '123');
            res.json({ token });
        }
        else if (username === "" || password === "") {
            res.status(401).json({ message: 'Enter username or password!' });
        }
        else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    }); 
 
});
*/
/*app.get("/api/studentnam", (req, res) => {
    fs.readFile('server/student.json', 'utf8', function (err, data) {
        // Handle the error if any
        if (err) {
            console.error(err);
            return;
        }
        // Parse the data into a JavaScript object
        const parsed = JSON.parse(data);
        const users = parsed.users;
        var d = '';
        for (const user of users) {
            if (user.name === student) {
                 d = user;
            }
        }
       // const data = { message: student };
        //res.json(data);
        res.json(d);

    });

});*/



/*
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
});*/
app.get("/api", (req, res) => {
    res.json({ message: "serverconnected" });
});



app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
