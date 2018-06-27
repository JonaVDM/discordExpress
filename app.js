//Require
const express = require("express");
const mainRoutes = require("./routes/router");

//require api
const apiEx = require("./api/ex");

//set up the port
const port = 3210;

//Creation of app
const app = express();

//set up routes
app.use(mainRoutes);

//set up the public folder
app.use(express.static("./public"));

//api calls
app.use("/api/discord", apiEx);

//set the port
app.listen(port, () => {
    console.info(`[Express] running at port ${port}`);
});
