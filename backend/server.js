import e from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';

import frontRoute from './routes/frontRoute.js';
import userRoute from './routes/routeR.js';
import messageRoute from './routes/messageRoute.js';

dotenv.config()

const app = e()
const Port = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(e.json())
app.use(cookieParser());

app.use('/api/auth',userRoute);
app.use('/api/message',messageRoute);
app.use('/api/userfront',frontRoute);

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Database connected Successfully')
}).catch((err)=>{console.log(err)});

app.listen(Port,()=>{
    console.log(`Server running at Port ${Port}`)
})