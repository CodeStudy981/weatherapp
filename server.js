import express from "express";
import cors from "cors";
import { config } from "dotenv";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 5004;

//registering middlewares
config({
    path: "./config/config.env",
});
app.use(express.json());
app.use(cors());

//registering routes
app.get("/", (req, res) => {
    res.status(200).send("Weather API is Running!");
});

//fetching weather forecast for a particular city
app.get("/weather", async (req, res) => {
    if (!req.query.city) {
        res.status(404).json("City is missing");
    } else {
        let city = req.query.city;
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5846c4ad3eb00042703bf4096b7f3f18`
        );

        const data = await response.json();
        res.status(200).json(data);
    }
});

//creating server
app.listen(port, () => {
    console.log(`server is up on ${port}`);
});
