import User from "../models/User.js"
import Social from "../models/Socials.js"

export const addSocial = async (req,res) => {
    try {
        const user = req.user;

        const social = await Social.create(req.body);

        if (!social) {
            return res.status(400).json({ message: "Social creation failed" });
        }

        user.socials.push(social._id);
        await user.save()
        return res.status(200).json({
            message: "social added successfully",
            social: social,
        })
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const getAllSocial = async(req,res) => {
    try {
        const user = req.user;
        await user.populate("socials");
        return res.status(200).json({
            message: "Success",
            socials : user.socials
        })
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const updateSocial = async (req,res) => {
    try {
        const user = req.user;
        const socialId = req.params.socialId;

        const hasSocial = user.socials.some(id => id.toString() === socialId);

        if(!hasSocial){
            return res.status(400).json({message: "This Social does not exist for this user"})
        }

        const social = await Social.findByIdAndUpdate(socialId, req.body, {new: true})

        if(!social){
            return res.status(400).json({message: "Social not found"});
        }

        return res.status(200).json({
            message: "Success",
            social: social,
        })
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const deleteSocial = async (req,res) => {
    try {
        const user = req.user;
        const socialId = req.params.socialId;

        const hasSocial = user.socials.some(id => id.toString() === socialId);

        if(!hasSocial){
            return res.status(400).json({message: "This Social does not exist for this user"})
        }

        const social = await Social.findByIdAndDelete(socialId);

        user.socials = user.socials.filter(id => id.toString() !== socialId);
        await user.save();
        return res.status(200).json({
            message : "Social deleted successfully",
            social: social,
        })
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};