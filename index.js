const express = require("express");
const app = express();
const cors = require("cors");
const indexRoutes = require("./src//routes/index");
const { localPort } = require("./bin/config");
const dbConfiguration = require("./bin/db");

const server = require("http").createServer(app);

//initiate DB connection
dbConfiguration();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//intialize all routes
indexRoutes(app);

const port = process.env.PORT || localPort;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
