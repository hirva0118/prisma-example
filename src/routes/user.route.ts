import express from 'express'
import { aggregateExample, createUser, deleteUser, filterExample, getUser, getUserById, sortingExample, updateUser } from '../controller/user.controller';

const router = express.Router();
router.post("/create-user",createUser);
router.get("/get-user",getUser);
router.get("/get-user/:id",getUserById);
router.patch("/update-user/:id",updateUser);
router.delete("/delete-user/:id",deleteUser);
router.get("/filter",filterExample);
router.get("/sorting",sortingExample);
router.get("/aggregation",aggregateExample)

export default router;