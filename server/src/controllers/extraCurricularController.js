import User from "../models/User.js"
import ExtraCurricular from "../models/ExtraCurricular.js"

export const addExtraCurricular = async (req,res) => {
    try {
        const user = req.user;

        const extraCurricular = await ExtraCurricular.create(req.body);

        if (!extraCurricular) {
            return res.status(400).json({ message: "Extra Curricular creation failed" });
        }

        user.extraCurriculars.push(extraCurricular._id);
        await user.save()
        return res.status(200).json({
            message: "extraCurricular added successfully",
            extraCurricular: extraCurricular,
        })
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const getAllExtraCurricular = async(req,res) => {
    try {
        const user = req.user;
        await user.populate("extraCurriculars");
        return res.status(200).json({
            message: "Success",
            extraCurriculars : user.extraCurriculars
        })
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const updateExtraCurricular = async (req,res) => {
    try {
        const user = req.user;
        const extraId = req.params.extraId;

        const hasExtraCurricular = user.extraCurriculars.some(id => id.toString() === extraId);

        if(!hasExtraCurricular){
            return res.status(400).json({message: "This Extra Curricular does not exist for this user"})
        }

        const extraCurricular = await ExtraCurricular.findByIdAndUpdate(extraId, req.body, {new: true})

        if(!extraCurricular){
            return res.status(400).json({message: "Extra Curricular not found"});
        }

        return res.status(200).json({
            message: "Success",
            extraCurricular: extraCurricular,
        })
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const deleteExtraCurricular = async (req,res) => {
    try {
        const user = req.user;
        const extraId = req.params.extraId;

        const hasExtraCurricular = user.extraCurriculars.some(id => id.toString() === extraId);

        if(!hasExtraCurricular){
            return res.status(400).json({message: "This Extra Curricular does not exist for this user"})
        }

        const extraCurricular = await ExtraCurricular.findByIdAndDelete(extraId);

        user.extraCurriculars = user.extraCurriculars.filter(id => id.toString() !== extraId);
        await user.save();
        return res.status(200).json({
            message : "Extra Curricular deleted successfully",
            extraCurricular: extraCurricular,
        })
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};