const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

module.exports = async function (callback) {
  try {
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(mongoURI, connectionOptions);

    console.log("Connected to MongoDB");

    const foodCollection = mongoose.connection
      .useDb("gofoodmern")
      .collection("food_items");
    const categoryCollection = mongoose.connection
      .useDb("gofoodmern")
      .collection("foodCategory");

    const [foodData, categoryData] = await Promise.all([
      foodCollection.find({}).toArray(),
      categoryCollection.find({}).toArray(),
    ]);

    console.log(foodData);
    console.log(foodCollection);

    callback(null, foodData, categoryData);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    callback(error, null, null);
  }
};
