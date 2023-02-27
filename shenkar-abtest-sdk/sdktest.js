const ABTestSDK = require('./shenkar-abtest.js');
const ab = new ABTestSDK();
const cors = require("cors");
const express = require("express");
const app = express();
// const test = new abTestSDK();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:8081",
        credentials: true,
    })
);

//
app.use(async (req,res) => {
    const variant = await ab.getVariant('63fbab0fad6b8b7a5d2bdd74', null, req, res);
    res.status(200).send(variant)

})

app.listen(port = 8081, () => {
    console.log(`Server is listening on port ${port}...`);
});
