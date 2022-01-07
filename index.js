const express = require('express')
const cors=require('cors')
const { MongoClient } = require("mongodb");
const ObjectId=require("mongodb").ObjectId;
const app = express()
app.use(cors())
app.use(express.json())
const port = 4000
const uri =
"mongodb+srv://Toriqul:zds1G6OWw2IHkOLY@cluster0.uaiap.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
    try {
      await client.connect();
      const database = client.db('coloJai');
      const packages = database.collection('packages');
      const confirming=database.collection('confirming')
      // Query for a movie that has the title 'Back to the Future'
    app.post('/packages',async(req,res)=>{
      const package=req.body
      const result= await packages.insertOne(package)
      console.log('hit the post',req.body)
      res.send(result)
    })
    app.post('/confirming',async(req,res)=>{
      const confirm=req.body
      const result= await confirming.insertOne(confirm)
      console.log('hit the post',req.body)
      res.send(result)
    })
    app.get('/packages',async(req,res)=>{
      const cursor=packages.find({})
      const result=await cursor.toArray()
      res.send(result)
    })
    app.get('/confirming',async(req,res)=>{
      const cursor=confirming.find({})
      const result=await cursor.toArray()
      res.send(result)

    })
    app.delete('/confirming/:id',async(req,res)=>{
      const id=req.params.id
      const  query={_id: ObjectId(id)}
      const result=await confirming.deleteOne(query)
      res.send(result)
    })
    app.get('/packages/:id',async(req,res)=>{
      const id=req.params.id
      const  query={_id: ObjectId(id)}
      const result=await packages.findOne(query)
      res.send(result)
    })
      
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello Worldccccccccccccc!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})