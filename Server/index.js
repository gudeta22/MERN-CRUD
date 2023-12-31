const express = require("express");
const mongoose = require("mongoose");
const FoodModel = require("./models/Food");
const cors = require("cors");
mongoose.set("strictQuery", true);
mongoose.set("strictQuery", false);
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(
  "mongodb+srv://Provider:provider2022@mern2.nyadpdv.mongodb.net/Mern2?retryWrites=true&w=majority",

  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const foodn = req.body.foodn;
  const days = req.body.days;

  const food = new FoodModel({ foodName: foodn, dayssinceIate: days });
  try {
    await food.save();
  } catch (err) {
    console.log(err);
  }
});
app.get("/restore", function (req, res) {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.put("/update", async (req, res) => {
  const newFoodname = req.body.newFoodname;
  const id = req.body.id;

  try {
    await FoodModel.findById(id, function (err, updatedfood) {
      updatedfood.foodName = newFoodname;
      updatedfood.save();
      res.send("updated");
    });
  } catch (err) {
    console.log(err);
  }
});
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FoodModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});
app.listen(8005, () => {
  console.log("Working Properly");
});
