const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');

// * CREATING AN EXPRESS INSTANCE
const app = express();

// * CONFIGURING ENVIRONMENT VARIABLES
dotenv.config();

// * CONNECTING TO A DATABASE
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('================={      CONNECTED TO MONGODB     }=================');
  });

// * USING THIRD PARTY MIDDLEWARE
// app.use(morgan('tiny'));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// * DEPLOYMENT SETUP - HEROKU
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

// * RETRIEVING ROUTES
const authRoute = require('./routes/auth_route');
const userRoute = require('./routes/user_route');
const categoryRoute = require('./routes/category_route');
const productRoute = require('./routes/product_route');
const orderRoute = require('./routes/order_route');

// * USING ROUTES
app.use('/api', authRoute);
app.use('/api/user', userRoute);
app.use('/api/category', categoryRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);

// * CREATING A SERVER
app.listen(process.env.PORT, () => {
  console.log(`================={ SERVER CREATED AT PORT : ${process.env.PORT} }=================`);
});
