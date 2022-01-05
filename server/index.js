const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const KeluhanModel = require("./models/Keluhan");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://admin123:admin123@crud.dnfiy.mongodb.net/keluhan?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const keluhanSender = req.body.keluhanSender;
  const keluhanTopic = req.body.keluhanTopic;
  const keluhanIsi = req.body.keluhanIsi;

  const keluhan = new KeluhanModel({
    keluhanSender: keluhanSender,
    keluhanTopic: keluhanTopic,
    keluhanIsi: keluhanIsi,
  });

  try {
    await keluhan.save();
    res.send("data masuk");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  try {
    KeluhanModel.find({}, (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/update/:id", async (req, res) => {
  const newKeluhanSender = req.body.newKeluhanSender;
  const id = req.params.id;

  try {
    await KeluhanModel.findById(id, (err, updatedKeluhan) => {
      updatedKeluhan.keluhanSender = newKeluhanSender;
      updatedKeluhan.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await KeluhanModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001...");
});
