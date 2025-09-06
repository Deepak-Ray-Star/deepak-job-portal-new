import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from './controllers/webhooks.js'
import bodyParser from "body-parser";
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'

// initialise express
const app = express()

// connect to db
await connectDB()

await connectCloudinary()

// middle wares
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

// Route
app.get('/', (req, res)=> res.send("API IS WORKING"))

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post('/webhooks', clerkWebhooks)
app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

// PORT 
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})


// import './config/instrument.js';
// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/db.js';
// import * as Sentry from "@sentry/node";
// import { clerkWebhooks } from './controllers/webhooks.js';
// import bodyParser from "body-parser";

// // initialise express
// const app = express();

// // connect to db
// await connectDB();

// // ⚡ Clerk webhook route (raw body chahiye verify ke liye)
// // Yeh express.json() se pehle aana chahiye
// app.post(
//   "/webhooks",
//   bodyParser.raw({ type: "application/json" }),
//   clerkWebhooks
// );

// // middlewares (normal JSON parsing ke liye)
// app.use(cors());
// app.use(express.json());

// // Route
// app.get('/', (req, res) => res.send("API IS WORKING"));

// app.get("/debug-sentry", function mainHandler(req, res) {
//   throw new Error("My first Sentry error!");
// });

// // PORT
// const PORT = process.env.PORT || 5000;

// Sentry.setupExpressErrorHandler(app);

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });

