import User from "../models/User.js"
import Award from "../models/Award.js"

export const addAward = async (req,res) => {
    try {
        const user = req.user;

        const award = await Award.create(req.body);
        if(!award){
            return res.status(400).json({message: "Award creation failed" });
        }

        user.awards.push(award._id);
        await user.save();
        return res.status(201).json({
            message: "Award added successfully",
            award: award,
        });
    } catch (error) {
        return res.status(409).json({message: error.message})
    }
};

export const getAllAward = async (req, res) => {
    try {
        const user = req.user;
        await user.populate("awards");
        return res.status(200).json({
            message: "Success",
            awards: user.awards,
        })
    } catch (error) {
        return res.status(409).json({message: error.message});
    }
};

export const updateAward = async (req,res) => {
    try {
        const user = req.user;
        const awardId = req.params.awardId;
        const hasAward = user.awards.some(id => id.toString() === awardId);

        if(!hasAward){
            return res.status(400).json({message: "Award doesn't belong to this user" });
        }

        const award = await Award.findByIdAndUpdate(awardId, req.body, {new: true });
        if(!award){
            return res.status(404).json({ message: "Award not found" });
        }

        return res.status(200).json({
            message: "Success",
            award: award,
        })
    } catch (error) {
        return res.status(409).json({message: error.message});
    }
};

export const deleteAward = async (req, res) => {
    try {
        const user = req.user;
        const awardId = req.params.awardId;
        
        const hasAward = user.awards.some(id => id.toString() === awardId);

        const award = await Award.findByIdAndDelete(awardId);

        user.awards = user.awards.filter(id => id.toString() !== awardId);
        await user.save();

        return res.status(200).json({
            message: "Success",
            award: award,
        })
    } catch (error) {
        return res.status(409).json({message: error.message});
    }
}

