import express from "express"

const router = express.Router();

router.post("/", (req,res) => {
    res.send("This is hotel")
})

export default router