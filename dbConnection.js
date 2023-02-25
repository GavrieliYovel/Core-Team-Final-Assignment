const mongoose = require('mongoose');
const dotenv =require('dotenv');
dotenv.config({path:'.env'});
const options = {
    useNewUrlParser: true,    // For deprecation warnings
    useUnifiedTopology: true // For deprecation warnings
};

mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.DB_HOST, options)
    .then(() => console.log('successfully connected to mongoDB'))
    .catch(err => console.log(`connection error: ${err}`));
