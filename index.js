const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const dotenv = require("dotenv").config();
const mongoClient = mongodb.MongoClient;
const URL = process.env.DB;
const app = express();

app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(express.json());

app.post("/createroom", async (req,res)=>{

    try {
        const connection = await mongoClient.connect(URL)

        const db = connection.db("booking_app");

        await db.collection("rooms").insertOne(req.body)

        await connection.close();

        res.json({message:"Room Created"})

    } catch (error) {
        console.log(error);
        res.json({message:"Something Went Wrong"})
    }

})

app.get("/roomdetail",async(req,res)=>{

    try {
        const connection = await mongoClient.connect(URL)

        const db = connection.db("booking_app");

        const rooms = await db.collection("rooms").find({}).toArray();

        await connection.close();

        res.json(rooms)

    } catch (error) {
        console.log(error);
        res.json({message:"Something Went Wrong"})
    }
})

app.put("/bookingroom/:roomId", async (req,res)=>{

    try {
        const connection = await mongoClient.connect(URL)

        const db = connection.db("booking_app");

        delete req.body._id;

        await db.collection("rooms").updateOne({_id:mongodb.ObjectId(req.params.roomId)},{$set : req.body})
        
        await connection.close();

        res.json({message:"Room Booked"})

    } catch (error) {
        console.log(error);
        res.json({message:"Something Went Wrong"})
    }

})

app.get("/bookedrooms", async (req,res)=>{

    try {
        const connection = await mongoClient.connect(URL)

        const db = connection.db("booking_app");

        const bookedRoom = await db.collection("rooms").find({status:"Booked"}).toArray();

        await connection.close();

        res.json(bookedRoom)

    } catch (error) {
        console.log(error);
        res.json({message:"Something Went Wrong"})
    }    
})

app.get("/bookedcustomers", async (req,res)=>{

    try {
        const connection = await mongoClient.connect(URL)

        const db = connection.db("booking_app");

        const bookedRoom = await db.collection("rooms").find({status:"Booked"}).toArray();

        await connection.close();

        res.json(bookedRoom)

    } catch (error) {
        console.log(error);
        res.json({message:"Something Went Wrong"})
    }    
})


app.listen(process.env.PORT || 3001)