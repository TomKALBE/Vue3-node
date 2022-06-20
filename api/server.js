const express = require("express");
const mongoose = require("./config/database");
const tasks = require("./routes/tasks");
const users = require("./routes/users");
var cors = require("cors");

var jwt = require("jsonwebtoken");

const app = express();
app.set("secretKey", "nodeRestApi"); // jwt secret token

mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
);
app.use(express.json());
app.use(
    cors({
        exposedHeaders: "x-access-token",
    })
);
app.get("/", function (req, res) {
    res.json("Evaluation nodejs");
});
function validateUser(req, res, next) {
    jwt.verify(
        req.headers["x-access-token"],
        req.app.get("secretKey"),
        function (err, decoded) {
            if (err) {
                res.status(401);
                res.json({
                    status: "error pas les droits",
                    message: err.message,
                    data: null,
                });
            } else {
                // add user id to request
                req.body.userId = decoded.id;
                next();
            }
        }
    );
}
app.use("/tasks", tasks);
app.use("/users", users);


app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// handle errors
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404) res.status(404).json({ message: "Not found" });
    else res.status(500).json({ message: "Something looks wrong :( !!!" });
});

app.listen(3001, function () {
    console.log("Node server listening on port 3001");
});
