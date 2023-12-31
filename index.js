const express = require('express');
const app  = express();
 const cors = require('cors');
 const port = process.env.PORT || 5000;
 require('dotenv').config()

//  Midderware   Midderware  Midderware 
app.use(cors());
app.use(express.json());

// MONGO dB ALATS MONGO dB ALATSMONGO dB ALATS

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mongodbovi.vxsv9t2.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const  classesCollection = client.db("Summer-School").collection("classes");
    const  teacherCollection = client.db("Summer-School").collection("teachers");
    app.get('/classes', async(req,res) =>{
       const result = await  classesCollection.find().toArray();
       res.send(result)
    })
    // teachers
    app.get('/teachers', async(req,res) =>{
        const result = await  teacherCollection.find().toArray();
        res.send(result)
     })
    //  class 
app.post('/class', async (req, res) => {
  const item = req.body;
  console.log(item)
  const result = await cartCollection.insertOne(item);
  console.log(result)
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
    // await .......................
  }
}
run().catch(console.dir);

// mONGO DB
app.get('/', (req,res) =>{
    res.send('Summer school is a comming')
})
app.listen(port, () => {
    console.log(`Summer school is sitting oin port ${port}`);
})