import { Prosto_One } from "@next/font/google";
import mongoose from "mongoose";

const connection = {};

export async function connectDb() {
    if(connection.isConnected){
        console.log('Connecected to database');
        return;
    }
    if(mongoose.connection.length > 0){
        connection.isConnected = mongoose.connections[0].readyState;
        if(connection.isConnected === 1 ){
            console.log('previous connection from database');
        }
        await mongoose.disconnect();
    }

    const db=await mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser : true,
        useUnifiedTopology : true,
    });

    console.log("New Connection to the Database");

    connection.isConnected=db.connections[0].readyState;
}

export async function disconnectDb(){
    if(connection.isConnected){
        if(process.env.NODE_ENV === 'production'){
            await mongoose.disconnect();
            connection.isConnected = false;
        }else{
            console.log("cannot disconnected from database, try again");
        }
    }
}