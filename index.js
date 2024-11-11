const express = require('express');
const path = require('path');
const connectDB = require('./connect');
const URL = require('./models/url');
const app = express();
const PORT = 3000;
const UrlRouter = require('./routes/url');
const staticRoute = require('./routes/staticRoute');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');
const { restrictToLoggedInUsers , checkAuth } = require('./middleware/auth');

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

connectDB(connectDB('mongodb+srv://shashanktulsikar979:Iwu0gLHJQmF4fM5n@cluster0.oqsi0.mongodb.net/authapp')
);

app.set('view engine', 'ejs');
app.set('views' , path.resolve('./views'));

app.use('/user',  userRouter);
app.use('/url', restrictToLoggedInUsers ,  UrlRouter);
app.use ( '/' , checkAuth,  staticRoute)


app.use('/url/:shortId' , async (req , res) => {
  const shortId = req.params.shortId;
 const entry =  await URL.findOneAndUpdate(
{
    shortId
  } , {
    $push : {
    visitHistory : {
        timestamp :  Date.now(),
    }
    }
  }
)
res.redirect(entry.redirectUrl);
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));