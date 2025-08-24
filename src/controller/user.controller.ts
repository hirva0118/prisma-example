import { Request, Response } from "express";
import prisma from "../lib/prisma";

//create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, posts } = req.body;
    const user = await prisma.user.create({
      data: { name, email, posts: posts ? { create: posts } : undefined },
      include:{
        posts:true
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"something went wrong"});
  }
};

//get all users
export const getUser = async(req:Request,res:Response)=>{
  try {
    const users = await prisma.user.findMany({
      include:{
        posts:true
      }
    })
    res.status(200).json(users);
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"Something went wrong"})
  }
}

//get user by id
export const getUserById = async(req:Request,res:Response)=>{
  try {
    const {id} = req.params;
    const user = await prisma.user.findUnique({
      where:{
        id:id
      },
      include:{
        posts:true
      }
    })
    res.status(200).json(user);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Something went wrong"})
    
  }
}

//update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
      },
      include: {
        posts: true,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

//delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await prisma.user.delete({
      where: { id }
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const filterExample = async(req:Request,res:Response)=>{
  try {
    const result = await prisma.user.findMany({
      where:{
        AND:[
          {
              name:{startsWith:'j'}
          },
          {
              email:{endsWith:'example.com'}
          }
        ]
      },
      select:{
        email:true
      }
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"Something went wrong"})
  }
}

export const sortingExample = async(req:Request,res:Response)=>{
  try {
    const result = await prisma.user.findMany({
      orderBy:{
        name:"asc"
      }
    })
    res.status(200).json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"Something went wrong"})
  }
}

export const aggregateExample = async(req:Request,res:Response)=>{
  try {
    const result = await prisma.user.aggregate({
      _count:{
        name:true
      }

    })
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Something went wrong"})
  }

}
