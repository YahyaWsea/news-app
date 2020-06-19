const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const userRouter = require('./routes/user');
const { auth } = require('./middleware/auth');
const authRouter = require('./routes/auth');
const sourceRouter = require('./routes/sources');
const newsRouter = require('./routes/news');


const app = express();
const port = process.env.PORT || 5000;

// db connection
const db = config.get('MONGO_URL');
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) console.log(err);
    else console.log("Connected to MongoDB");
})


app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/user', auth, userRouter);
app.use('/sources', auth, sourceRouter);
app.use('/news', auth, newsRouter);


app.listen(port, () => console.log(`Server is running on port ${port}`));