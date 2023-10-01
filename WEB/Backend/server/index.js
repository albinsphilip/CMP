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
                res.json({ token1,pos,user});
                student=user;
                if(pos==='teacher'){
                sub=user.subject;
                cls=user.class;
            }
            const cursor1 = collection.find({ pos: { $in: ['teacher', 'student'] } });
            tusers=[];
            await cursor1.forEach(user => {
              tusers.push(user);
            });
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

app.get("/api/student", async(req, res) => {

    res.json(student);
});
var users = [];
var tusers = [];
app.get("/api/total", (req, res) => {

    res.json(users);
});
app.get("/api/alltotal", (req, res) => {

  res.json(tusers);
});

app.post("/sprof",async(req,res)=>{
   
  const { roll,fname,mname,phone } = req.body;
  try{

    const db = client.db('data');
    const collection = db.collection('user');
    var myquery = {username:student.username,password:student.password}; 
    var newvalues = { $set: {rollno:roll,fathersname:fname,mothersname:mname,phone:phone} };
    await collection.updateOne(myquery, newvalues).then(res =>{
      console.log("profile updated");
     
      

  
  }).catch(err =>{
      console.log(err);
  });
  const user = await collection.findOne(myquery);
  student=user;
  
}finally{

}
  res.json('updated');




});
app.post("/tprof",async(req,res)=>{
   
  const { subject,fname,mname,phone } = req.body;
  try{

    const db = client.db('data');
    const collection = db.collection('user');
    var myquery = {username:student.username,password:student.password}; 
    var newvalues = { $set: {subject:subject,fathersname:fname,mothersname:mname,phone:phone} };
    await collection.updateOne(myquery, newvalues).then(res =>{
      console.log("profile updated");
     
      

  
  }).catch(err =>{
      console.log(err);
  });
  const user = await collection.findOne(myquery);
  student=user;
  
}finally{

}
  res.json('updated');




});

app.post("/removeDept",async(req,res)=>{
  const arr = req.body;
  const val = arr.arr;
  console.log(val);
  console.log(arr);
  try{

    const db = client.db('data');
    const collection = db.collection('user');
    if(val){
    var myquery = {pos:'admin'}; 
    var newvalues = { $pull: { ['depts.'+'dept']: val } }

    await collection.updateOne(myquery, newvalues).then(res =>{
      console.log("dept removed");
      

  
  }).catch(err =>{
      console.log(err);
  });
  }}
  finally{

  }
  res.json('updated');
});

var dept='';
app.post("/adddept",async(req,res) =>{
  
  const dept1  = req.body;
  dept=dept1;
  console.log(dept);
  try{
    const db = client.db('data');
    const collection = db.collection('user');
    var myquery = {pos:'admin',depts: { $exists: true, $type: 'array'}}; 
    var newvalues = { $push: { ['depts'] :{$type:'array'}} };
    await collection.updateOne(myquery, newvalues).then(res =>{
      console.log("depts added");
      

  
  }).catch(err =>{
      console.log(err);
  });

  var myquery1 = {pos:'admin',['depts'+'.dept']: 'dept[0]' };
  var newvalues1 = { $set: { ['depts'+ '.dept.$']: dept['d'] } };
  
  let result = await collection.updateOne(myquery1, newvalues1);
             if (result.matchedCount === 0) {
                myquery1 = {pos:'admin' };
                newvalues1 = { $push: {  ['depts.'+'dept']: dept['d']} };
              }
               await   collection.updateOne(myquery1, newvalues1).then(res =>{
                      console.log("dept updated");
                      
          
                  }).catch(err =>{
                      console.log(err);
                  });
                
}finally{

}
  res.json('updated');
});

app.post("/adduser", async(req,res)=>{
  const {username,pass,pos,name,item} = req.body;
  
  try{
   

    const db = client.db('data');
    const collection = db.collection('user');
    const user = await collection.findOne({ username, pass});
    if(user){
      res.status(401).json({ message: 'User already exists!' });
    }
    else{
      try{
        const us=[
          {
              "username": username,
              "password": pass,
              "name":name,
              "pos":pos,
              "dep":item
                
          }
      ]
      try {
        const insertManyResult = await collection.insertMany(us);
        const cursor1 = collection.find({ pos: { $in: ['teacher', 'student'] } });
        tusers=[];
        await cursor1.forEach(user => {
          tusers.push(user);
        });        
        console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
       
      } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
      }

      }
      finally{
        
      }

    }

  }
  finally{
    console.log("user created");
  }
 res.json({message:'success'});
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
