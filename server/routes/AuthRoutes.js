const express = require("express");
const router = express.Router();
const User = require("../models/User");
const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post("/send-otp", async (req, res) => {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        let user = await User.findOne({ phone });

        if (!user) {
            // Create a new user and save it
            user = await User.create({ phone, otp });
        } else {
            user.otp = otp;
            await user.save();
        }

        // await client.messages.create({
        //     body: `Your OTP is: ${otp}`,
        //     from: process.env.TWILIO_PHONE_NUMBER,
        //     to: phone,
        // }).then(message => {
        //     console.log("Twilio Message SID:", message.sid);
        // }).catch(err => {
        //     console.error("Twilio Error:", err);
        //     return res.status(500).json({ success: false, message: "Twilio error", error: err.message });
        // });     

        console.log("User Saved:", user);

        res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Error sending OTP", error: error.message });
    }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
    const { phone, otp } = req.body;
    console.log("phone:",phone);
    console.log("otp:",otp);
    try {
        const user = await User.findOne({ phone });
        console.log("user", user);
        if (!user || user.otp !== otp) {
            console.log("!user", !user);
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }
        if(!user.verified){
            user.verified = true;
            await user.save();
        }
        console.log("!user", !user);
        res.json({ success: true, message: "OTP verified successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error verifying OTP" });
    }
});

// Update User Info
router.post("/update-profile", async (req, res) => {
    const { phone, email, address } = req.body;

    try {
        const user = await User.findOneAndUpdate({ phone }, { email, address }, { new: true });
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Profile updated", user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating profile" });
    }
});

router.post('/apartment', async (req, res) => {
    try {

        const { apartment } = req.body;  
        if (!apartment || !apartment.apartment) {
            return res.status(400).json({ success: false, message: "Apartment name is required" });
        }

        const apartmentName = apartment.apartment;

        const existingApartment = await Apartment.findOne({ name: apartmentName.toLowerCase() });
        if (existingApartment) {
            return res.status(400).json({ success: false, message: "Apartment already exists" });
        }

        const newApartment = new Apartment({ name: apartmentName.toLowerCase() });
        await newApartment.save();

        res.json({ success: true, message: "Apartment added successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

module.exports = router;
