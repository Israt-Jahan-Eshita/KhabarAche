import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import Joi from "joi";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        console.log("Login attempt:", req.body.email);
        const { error } = validate(req.body);
        if (error) {
            console.log("Validation Error:", error.details[0].message);
            return res.status(400).send({ message: error.details[0].message });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log("User not found");
            return res.status(401).send({ message: "Invalid Email or Password" }); 
        }

        console.log("User found:", user.email);

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            console.log("Invalid password");
            return res.status(401).send({ message: "Invalid Email or Password" }); 
        }

        console.log("Password matched, generating token...");
        const token = user.generateAuthToken();

        res.status(200).send({ 
            data: token,
            user: { username: user.username, email: user.email, isHotelLogin: user.isHotelLogin },
            message: "Logged in successfully"
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


const validate = (data) => {
    const schema = Joi.object({
        //username:Joi.string().email().required().label("Username"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

export default router;
