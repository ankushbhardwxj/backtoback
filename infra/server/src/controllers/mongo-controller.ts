import mongoose from "mongoose";

const mongoController = async () => {
  const mongoUrl = "mongodb://admin:admin@mongo-svc:27017/";
  const connect = await mongoose.connect(mongoUrl);
  console.log("Connected successfully");
  const authSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
  });
  const auth = mongoose.model("Auth", authSchema);
  // const doc = new auth();
  // doc.email = "ankush@custiv.com";
  // doc.fullName = "Ankush B";
  // doc.password = "123456";
  // await doc.save();

  console.log("Fetching data");
  let res = await auth.findOne({ fullName: "Ankush Bhardwaj" });
  console.log(res);
  res = await auth.findOne({ email: "ankush@custiv.com" });
  console.log(res);
};

export default mongoController;
