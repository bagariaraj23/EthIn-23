import Therapist from "../models/therapistSchema.js";

export const signUp = async (req, res) => {
    try{

        const user = await Therapist.findOne({
            walletAddress: req.body.walletAddress,
        });
        
        if (user) return res.status(400).send("User already registered");

        const newUser = new Therapist({
            walletAddress: req.body.walletAddress,
            name: req.body.name,
            age: req.body.age,
            about: req.body.about,
            expertise: req.body.expertise,
            experience: req.body.experience,
            patientsConsulted: req.body.patientsConsulted,
            consultationFee: req.body.consultationFee,
            image: req.body.image,
            clinicAddress: req.body.clinicAddress,
        });
        
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}