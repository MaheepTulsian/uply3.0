import mongoose from 'mongoose'
import User from "../models/User.js"
import WorkExperience from '../models/WorkExperience.js';

export const addExperience = async (req, res) => {
    try {
        const user = req.user;

        const experience = await WorkExperience.create(req.body);

        if (!experience) {
            return res.status(400).json({ message: "Project creation failed" });
        }

        user.workExperiences.push(experience._id);
        await user.save();
        return res.status(201).json({
            message: "Work experience added successfully",
            experience: experience,
        });

    } catch (error) {
        return res.status(409).json({message: error.message})
    }
};


export const getAllWorkExperience = async (req,res) => {
    try {
        const user = req.user;

        await user.populate('workExperiences')
        return res.status(200).json({
            message: "Success", 
            experiences: user.workExperiences
        });
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const getWorkExperience = async (req, res) => {
    try {
        const expId = req.params.expId;

        const user = req.user;

        const hasExperience = user.workExperiences.some(exp => exp.toString() === expId);

        if (!hasExperience) {
            return res.status(404).json({ message: "Experience does not exist for this user" });
        }

        const workExperience = await WorkExperience.findById(expId);

        if (!workExperience) {
            return res.status(404).json({ message: "Experience not found" });
        }

        return res.status(200).json({
            message: "Success",
            experience: workExperience,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateWorkExperience = async (req, res) => {
    try {
        const expId = req.params.expId;
        
        const user = req.user;

        const hasExperience = user.workExperiences.some(exp => exp.toString() === expId);

        if (!hasExperience) {
            return res.status(404).json({ message: "Experience does not exist for this user" });
        }

        const workExperience = await WorkExperience.findByIdAndUpdate(expId, req.body, {new: true,});

        if (!workExperience) {
            return res.status(404).json({ message: "Experience not found" });
        }

        return res.status(200).json({
            message: "Success",
            experience: workExperience,
        });


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteWorkExperience = async (req, res) => {
    try {
        const expId = req.params.expId;
        
        const user = req.user;

        const hasExperience = user.workExperiences.some(exp => exp.toString() === expId);
        if (!hasExperience) {
            return res.status(404).json({ message: "Experience does not exist for this user" });
        }

        const workExperience = await WorkExperience.findByIdAndDelete(expId);
        
        user.workExperiences = user.workExperiences.filter(exp => exp.toString() !== expId);
        await user.save();
        return res.status(200).json({
            message: "Work experience deleted successfully",
            experience: workExperience,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

