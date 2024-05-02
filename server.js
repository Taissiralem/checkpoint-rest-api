import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { name, email, password });
    if (!user) {
      return res.status(404).send("Utilisateur introuvable");
    }
    res.json({ message: "Utilisateur mis à jour avec succès" });
  } catch (error) {
    res
      .status(500)
      .send(
        error.message(
          "Une erreur est survenue "
        )
      );
  }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
app.use(express.json());
