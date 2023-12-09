import Therapist from "../models/therapistSchema.js";

export const register = async (req, res) => {
    // res.json(req.body);
    const user = await User.create({ ...req.body });
    res.status(StatusCodes.CREATED).json(req.body);
};