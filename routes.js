import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()

router.post("/login",async (req,res)=>{
    try {
        prisma.user.findUnique(
            {
                where: {
                    email: req.body.email,
                    password: req.body.password
                }
            }
        );
        res.json({message: "User logged in successfully"});
    } catch (error) {
        res.json(error)
    }
});
router.post("/register"),async (req,res)=>{
    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                password: req.body.password,
                user_name:req.body.username,
                surename: req.body.surename,
    }
    
    })
    res.json("User created")
}catch(error){
        res.json(error)
    }}



export default router;