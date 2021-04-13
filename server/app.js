const express = require("express");
const app = express();

const apiRoutes = require("./routes");
PORT = 8000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, userid");

  next();
});


app.get("/", (req, res) => {
  res.json("This is the server");
});
app.use(express.json())
app.use("/api", apiRoutes);
app.listen(8000, () => console.log(`Server is listening at port ${PORT}`));