const express = require("express");
const app = express();
PORT = 8000;

const apiRoutes = require("./routes");

app.get("/", (req, res) => {
  res.json("This is the server")
});

app.use("/api", apiRoutes);

app.listen(8000, () => console.log(`Server is listening at port ${PORT}`));
