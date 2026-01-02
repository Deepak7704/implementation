import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthenticationRouter from './routes/authentication_routes';

dotenv.config();
const app = express();
const PORT =  process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth",AuthenticationRouter);
// app.use("/api/users",userRoutes);
// app.use("/api/users",postRoutes);


app.listen(PORT,()=>{
    console.log(`Backend is running on ${PORT}`);
})