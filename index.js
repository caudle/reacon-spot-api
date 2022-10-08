// import packages
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from'path';

// import routes
import authRoutes from './routes/auth.js';
import listingRoutes from './routes/listing.js';
import categoryRoutes from './routes/category.js';
import subcategoryRoutes from './routes/subcategory.js';
import userRoutes from './routes/user.js';
import sellerRoutes from './routes/seller.js';
import subscriptionRoutes from './routes/subscription.js';
import venueRoutes from './routes/venue.js';
import landRoutes from './routes/land.js';


// setup server
const app = express();
const server = http.createServer(app);
//config env 
dotenv.config();

// connect to mongodb
// connect to db
mongoose.connect(process.env.DB_URL,  
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //tls: true,
      //tlsCAFile: './ca-certificate.crt',
    },
    (err) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(`database connected at: ${process.env.DB_URL}`);
      }
    }); 

// api middlewares
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(bodyParser.json())
app.use(cors());

// route middleware
app.get('/', (req, res) => {
  res.send('<h1>Welcome to reacon spot api</h1>');
});
app.use('/public',express.static(path.resolve('./public')));
app.use('/auth', authRoutes);
app.use('/listings', listingRoutes);
app.use('/categories', categoryRoutes); // home, land, event
app.use('/subcategories', subcategoryRoutes); // apt, house, commercial land,ceremony
app.use('/user', userRoutes);
app.use('/seller', sellerRoutes);
app.use('/subscription', subscriptionRoutes);
app.use('/plots', landRoutes);
app.use('/venues', venueRoutes);

// start server and listen
server.listen(process.env.PORT, (err) => {
    if (err) throw err;
    else {
      console.log('server started at port ' + process.env.PORT);
    }
  });