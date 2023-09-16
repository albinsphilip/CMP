const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const uri = "mongodb+srv://aaron:aa@cluster0.cgelvmu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run(){
    
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
//const secretkey = "123";


var student = '';
await client.connect();

app.post('/login',  async(req, res) => {
    const { username, password } = req.body;
  
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
           
            const user = await collection.findOne({ username, password});
            if (user) {
                const token1 = jwt.sign({ username,exp:600 }, '1234');
                var pos= user.pos
                res.json({ token1,pos});
                student=user;
                if(pos==='teacher'){
                sub=user.subject;
                cls=user.class;
            }
             const cursor = collection.find({pos:'student',class: cls});
              users = [];
              await cursor.forEach(user => {
                users.push(user);
              });
            }
            else if (username === "" || password === "") {
                res.status(401).json({ message: 'Enter username or password!' });
            }
            else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        } finally {
            console.log('done');
        }
  
}); 

app.get("/api/student", (req, res) => {

    res.json(student);
});
var users = [];
app.get("/api/total", (req, res) => {

    res.json(users);
});
app.post("/assig", async(req, res) => {
  const {assig,date} = req.body;
  try{
    const db = client.db('data');
    const collection = db.collection('user');
    for(const user of users){
      var myquery1 = {name:user.name, class:cls,pos:'student',assignment: { $exists: true, $type: 'array'}}; 
      var newvalues1 = { $push: { ['assignment'] :{sub,$type:'array'}} };

      await collection.updateOne(myquery1, newvalues1).then(res =>{
        console.log("assig added");
        

    
    }).catch(err =>{
        console.log(err);
    });
    
    var myquery = {name:user.name, class: cls,pos:'student',['assignment.'+ sub +'.date']: date };
    var newvalues = { $set: { ['assignment.' + sub+'.$']: { date: date, value: assig } } };
    
    let result = await collection.updateOne(myquery, newvalues);
                if (result.matchedCount === 0) {
                  myquery = {name:user.name,class: cls,pos:'student' };
                  newvalues = { $push: {  ['assignment.' + sub]: { date: date, value: assig }} };
                }
                 await   collection.updateOne(myquery, newvalues).then(res =>{
                        console.log("assig updated");
                        
            
                    }).catch(err =>{
                        console.log(err);
                    });
                  }
  }finally{

  }
  res.json({message:'success'});
});
var sub='';
var cls='';
app.post("/updateatt", async(req, res) => {
    const { date, selectedValues,jsonData } = req.body;
    async function run(){
    try{
            console.log('yes');
            const db = client.db('data');
            const collection = db.collection('user');
            if(date && selectedValues){
            for(const Rollno in selectedValues){
                console.log('no');
                var myquery = { classroll: Rollno,['attendance.'+ sub +'.date']: date };
                var newvalues = { $set: { ['attendance.' + sub+'.$']: { date: date, value: selectedValues[Rollno] } } };
                let result = await collection.updateOne(myquery, newvalues);
                if (result.matchedCount === 0) {
                  myquery = {classroll: Rollno };
                  newvalues = { $push: {  ['attendance.' + sub]: { date: date, value: selectedValues[Rollno] }} };
                }
                 await   collection.updateOne(myquery, newvalues).then(res =>{
                        console.log(Rollno);
                        console.log("1 document updated");
                        
            
                    }).catch(err =>{
                        console.log(err);
                    });
              
            }}
            else{
                const obj = JSON.parse(jsonData);
for (const item of obj) {

   
    for (const key in item) {
        if(key !=='Name'){
            var myquery = { name:item['Name'],['attendance.'+ sub +'.date']: key };
            var newvalues = { $set: { ['attendance.' + sub+'.$']: { date: [key], value:item[key] } } };
            let result = await collection.updateOne(myquery, newvalues);
        if (result.matchedCount === 0) {
            myquery = {name:item['Name']};
            if(item[key]==='P'){
            newvalues = { $push: {  ['attendance.' + sub]: { date: key, value:'Present' }} };
        }
            else if (item[key]==='A'){
                newvalues = { $push: {  ['attendance.' + sub]: { date: key, value:'Absent' }} };

            }
    }
         await   collection.updateOne(myquery, newvalues).then(res =>{
                console.log("1 document updated");
                
    
            }).catch(err =>{
                console.log(err);
            });
            
    }
}
   
  
}
            }
        }
        
        finally{

        }
        res.json({message:'success'});

    } 
       run().catch(console.dir);

});
app.post("/updatemark", async(req, res) => {
    const {series, selectedValues,jsonData } = req.body;
    async function run(){
    try{
            console.log('yes');
            const db = client.db('data');
            const collection = db.collection('user');
            if( selectedValues){
            for(const Rollno in selectedValues){
                console.log('no');
                var myquery = { classroll: Rollno,['sessionals.'+ sub+'.series']: series };
                var newvalues = { $set: { ['sessionals.' + sub+'.$']: { series: series, value: selectedValues[Rollno] } } };
                let result = await collection.updateOne(myquery, newvalues);
                if (result.matchedCount === 0) {
                  myquery = {classroll: Rollno };
                  newvalues = { $push: {  ['sessionals.' + sub]: { series: series, value: selectedValues[Rollno] }} };
                }
                 await   collection.updateOne(myquery, newvalues).then(res =>{
                        console.log(Rollno);
                        console.log("1 document updated");
                        
            
                    }).catch(err =>{
                        console.log(err);
                    });
              
            }}
            else{
                const obj = JSON.parse(jsonData);
for (const item of obj) {

   
    for (const key in item) {
        if(key !=='Name'){
            var myquery = { name:item['Name'],['sessionals.'+ sub +'.series']: key };
            var newvalues = { $set: { ['sessionals.' + sub+'.$']: { series: [key], value:item[key] } } };
            let result = await collection.updateOne(myquery, newvalues);
        if (result.matchedCount === 0) {
            myquery = {name:item['Name']};
            newvalues = { $push: {  ['sessionals.' + sub]: { series: key, value:item[key] }} };
        
          
    }
         await   collection.updateOne(myquery, newvalues).then(res =>{
                console.log("1 document updated");
                
    
            }).catch(err =>{
                console.log(err);
            });
            
    }
}
   
  
}
            }
        }
        
        finally{

        }
        res.json({message:'success'});

    } 
       run().catch(console.dir);

});

app.get("/api", (req, res) => {
    res.json({ message: "serverconnected" });
});



app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
}       run().catch(console.dir);
