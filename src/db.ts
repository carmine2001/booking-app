import { MongoClient } from "mongodb";

const stringConnection = process.env.MONGODB_STRING_CONNECTION;

if (!stringConnection) {
    throw new Error("la stringa di connessione non è definita");
}

export const countListings = async (params: any) => {
    const client = new MongoClient(stringConnection);
    try {
        const db = client.db("booking");
        const collection = db.collection("listings");

        const filter: object = {
            "address.country": new RegExp(`.*${params.country}*.`, 'i')
        };

        const count = await collection.countDocuments(filter);

        return count;
    } catch (error) {
        console.error(error);
    } finally{
        await client.close();
    }
}



export const getListings = async (params: any) => {
    const client = new MongoClient(stringConnection);
    try {
        const db = client.db("booking");
        const collection = db.collection("listings");

        const filter: object = {
            "address.country": new RegExp(`.*${params.country}*.`, 'i')
        };

        const filter_limit_skip: object = {
            limit: +params.limit,
            skip: +params.skip
        }

        return await collection.find(filter, filter_limit_skip).toArray();
    }
    catch (error) {
        console.error(error)
    }
    finally {
        await client.close();
    }
}