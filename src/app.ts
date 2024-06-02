import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import * as db from "./db";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/listings", async (req:Request, res:Response) => {
    const params = req.query

    const data = await db.getListings(params);
    const count = await db.countListings({country: params.country})

    res.json({
        data,
        count
    });
})

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
})

