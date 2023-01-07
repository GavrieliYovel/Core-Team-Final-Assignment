const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

const { experimentRouter } = require("./routers/experimentRouter");
const { IAMRouter } = require("./routers/IAMRouter");
const { BIDataRouter } = require("./routers/BIDataRouter");


dotenv.config({ path: path.join(__dirname, './.env') });
const port = process.env.PORT || 3030;


// static files
// app.use(express.static("public"));
// app.use("/css", express.static(__dirname + "public/css"));
// app.use("/js", express.static(__dirname + "public/js"));
// app.use("/includes", express.static(__dirname + "public/includes"));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: process.env.SESSION_KEY,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
// cookie parser middleware
app.use(cookieParser());

// set views
// app.set("views", "./views");
// app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());


app.use(express.urlencoded({extended: true}));  // handel post reqs with body


// app.use('/', htmlRouter);
app.use('/growth', experimentRouter);
app.use('/IAM', IAMRouter);
app.use('/bi', BIDataRouter);

// app.use('/api/boards', boardsRouter);

app.use((req, res) => {
  res.status(400).send("Something is broken!");
});
app.listen(port, () =>
  console.log(`Express server is running on port ${port}`)
);
