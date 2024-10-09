// we need to install express, cors, dotenv, pg
// we import our dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

// need to configure our .env file
dotenv.config();

// we create a new express app
const app = express();

// tell express to use json
app.use(express.json());
// tell express to use cors
app.use(cors());

// creating a new pool for my database connection
const dbConnectionString = process.env.DB_URL;
if (!dbConnectionString) {
  throw new Error("DB_URL is not defined in the environment variables");
}

// creating a new pool for my database connection
export const db = new pg.Pool({ connectionString: dbConnectionString });

// we define our port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} and built on Rock and Roll`);
});
// now write an end point for our root route to test our server
app.get("/", (req, res) => {
  res.json({ message: "HAIL to the Queen baby" });
});
// we can use thunder client to ensure our server is working
// we can now run our server using node server.js
// now we create the functions to get all the data from the database so our client can use it.
