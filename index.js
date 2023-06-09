import express from "express";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;

dotenv.config({ path: "./.env" });
let error;

import { bodegonesRouter } from "./bodegones/router.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/bodegones", bodegonesRouter);
app.get("/", async (req, res) => {
  console.log(mongoose.connection.readyState);
  if (error) {
    res.send(`Hola mundo ${error}`);
  } else {
    res.send(`Hola mundo ${mongoose.connection.readyState}`);
  }
});
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en el puerto ${PORT}`)
    )
  )
  .catch((e) => {
    error = e;
  });
