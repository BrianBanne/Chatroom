const express = require("express");
const app = express();

const apiRoutes = require("./routes");
const PORT = 8000;
const HOST = "0.0.0.0";


//CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, userid"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

app.get("/", (req, res) => {
  res.send("This is the server");
});

app.use(express.json());
app.use("/api", apiRoutes);
app.listen(PORT, HOST, () =>
  console.log(`Server is listening at port ${PORT}`)
);
