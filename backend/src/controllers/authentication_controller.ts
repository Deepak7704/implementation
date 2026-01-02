import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {PrismaClient } from "@prisma/client";
import type{ Request,Response } from "express";
import type { AuthInput, AuthRequest, AuthResponse } from "../types/AuthRequest";


const prisma = new PrismaClient();
export const registerUser = async(req:AuthRequest,res:Response):Promise<void>=>{
    try{
        const{email,name,password} = req.body;
        if(!email || !password || !name){
            res.status(400).json({
                error:'Email, Name and password are required'
            });
            return;
        }
        const existingUser = await prisma.user.findUnique({
            where:{email}
        });
        if(existingUser){
            res.status(409).json({
                error:'Email already exists'
            });
            return;
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await prisma.user.create({
            data:{
                email,
                name,
                password:hashedPassword
            }
        });
        const token = jwt.sign(
            {userId:user.id,email:user.email},
            process.env.JWT_SECRET!,
            {expiresIn:'24h'}
        );
        res.status(201).json({
            token,
            user:{
                id:user.id,
                email:user.email,
                name:user.name
            }
        });
    }catch(error){
        console.error('Error while user registration',error);
        res.status(500).json({error:'Registration Failed'});
    }
}
export const loginUser = async(req:Request,res:Response):Promise<void>=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            res.status(400).json({
                error:'Error: Both email and password are required'
            });
            return;
        }
        const user = await prisma.user.findUnique({
            where:{email}
        });
        if(!user){
            res.status(401).json({
                error:'Invalid email or password'
            });
            return
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            res.status(401).json({
                error:'Invalid email or password'
            });
            return;
        }
        const token = jwt.sign(
            {userId:user.id,email:user.email},
            process.env.JWT_SECRET!,
            {expiresIn:'24h'}
        );
        res.status(200).json({
            token,
            user:{
                id:user.id,
                email:user.email,
                name:user.name
            }
        });
    }catch(error){
        console.error('Login error',error);
        res.status(500).json({
            error:'Login Error Occured'
        })
    }
};