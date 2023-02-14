import { MongoClient } from "mongodb"

export default async function connect(){
    return await MongoClient.connect(
        String(process.env.MONGODB_URL?.replace('<password>', String(process.env.MONGODB_PASSWORD))))
}