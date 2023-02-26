const express = require("express");
const path    = require("path")
const cors    = require('cors');
const app     = express();
const dotenv  = require('dotenv');

const { experimentRouter } = require("./routers/experimentRouter");
const { IAMRouter } = require("./routers/IAMRouter");
const { BIDataRouter } = require("./routers/BIDataRouter");
const { loggerRouter } = require("./routers/loggerRouter");


dotenv.config({ path: path.join(__dirname, './.env') });
const port = process.env.PORT || 3030;
require('./dbConnection');
const {listenToQ} = require("./reciver");
//static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/includes", express.static(__dirname + "public/includes"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));  // handel post reqs with body

//
app.use('/growth', experimentRouter);
app.use('/IAM', IAMRouter);
app.use('/BI', BIDataRouter);
app.use('/logger', loggerRouter);

listenToQ();
app.use((req, res) => {
    res.status(400).send('Something is broken!');
});
app.listen(port, () => console.log(`Express server is running on port ${port}`));

