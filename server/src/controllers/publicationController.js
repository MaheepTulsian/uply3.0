import User from "../models/User.js"
import Publication from "../models/Publication.js"

export const addPublication = async (req,res) => {
    try {
        const user = req.user;

        const publication = await Publication.create(req.body);
        if(!publication){
            return res.status(400).json({message: "Publication creation failed" });
        }

        user.publications.push(publication._id);
        await user.save();
        return res.status(201).json({
            message: "Publication added successfully",
            publication: publication,
        });
    } catch (error) {
        return res.status(409).json({message: error.message})
    }
};

export const getAllPublication = async (req, res) => {
    try {
        const user = req.user;
        await user.populate("publications");
        return res.status(200).json({
            message: "Success",
            publications: user.publications,
        })
    } catch (error) {
        return res.status(409).json({message: error.message});
    }
};

export const updatePublication = async (req,res) => {
    try {
        const user = req.user;
        const pubId = req.params.pubId;
        const hasPublication = user.publications.some(id => id.toString() === pubId);

        if(!hasPublication){
            return res.status(400).json({message: "Publication doesn't belong to this user" });
        }

        const publication = await Publication.findByIdAndUpdate(pubId, req.body, {new: true });
        if(!publication){
            return res.status(404).json({ message: "Publication not found" });
        }

        return res.status(200).json({
            message: "Success",
            publication: publication,
        })
    } catch (error) {
        return res.status(409).json({message: error.message});
    }
};

export const deletePublication = async (req, res) => {
    try {
        const user = req.user;
        const pubId = req.params.pubId;
        
        const hasPublication = user.publications.some(id => id.toString() === pubId);

        if (!hasPublication) {
            return res.status(400).json({ message: "Publication doesn't belong to this user"});
        }

        const publication = await Publication.findByIdAndDelete(pubId);

        user.publications = user.publications.filter(id => id.toString() !== pubId);
        await user.save();

        return res.status(200).json({
            message: "Success",
            publication: publication,
        })
    } catch (error) {
        return res.status(409).json({message: error.message});
    }
}

