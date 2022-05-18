const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

require('dotenv').config()

const port =process.env.PORT || 5000


//to-do-list
//XJgArykueqb1n8PL



      
const { MongoClient, ServerApiVersion ,ObjectId } = require('mongodb');
const uri = "mongodb+srv://to-do-list:XJgArykueqb1n8PL@cluster0.g6mtd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const todoCollection = client.db("task").collection("to-do-list");
      console.log('hello world');
     
         app.post('/todolist' , async(req,res)=>{
             const user = req.body 
             const result =await todoCollection.insertOne(user)
             res.send(result)
         })

          app.get('/todolist' , async(req,res)=>{
              const query ={}
              const cursor = todoCollection.find(query)
              const result = await cursor.toArray()
              res.send(result)
          })

          app.delete('/todolist/:id',async(req,res)=>{
            const id = req.params.id 
            const query = {_id: ObjectId(id)}
            const result = await todoCollection.deleteOne(query)
            res.send(result)
          })

    } finally {
  
    }
  }
  
  run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('To do is running')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })