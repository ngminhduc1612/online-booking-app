import express from "express"

const router = express.Router();

router.get("/register", (req,res) => {
    res.send("This is auth register point!")
})

export default router