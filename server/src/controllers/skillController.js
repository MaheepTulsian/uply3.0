import mongoose from "mongoose";
import User from "../models/User.js"
import Skill from "../models/Skills.js"

export const addSkill = async (req,res) => {
    try {
        const user = req.user;

        const skill = await Skill.create(req.body);

        if (!skill) {
            return res.status(400).json({ message: "Project creation failed" });
        }

        user.skills.push(skill._id);
        await user.save()
        return res.status(200).json({
            message: "skill added successfully",
            skill: skill,
        })
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const getAllSkill = async(req,res) => {
    try {
        const user = req.user;
        await user.populate("skills");
        return res.status(200).json({
            message: "Success",
            skills : user.skills
        })
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const updateSkill = async (req,res) => {
    try {
        const user = req.user;
        const skillId = req.params.skillId;

        const hasSkill = user.skills.some(id => id.toString() === skillId);
        if(!hasSkill){
            return res.status(400).json({message: "This Skill does not exist for this user"})
        }

        const skill = await Skill.findByIdAndUpdate(skillId, req.body, {new: true})

        if(!skill){
            return res.status(400).json({message: "Skill not found"});
        }

        return res.status(200).json({
            message: "Success",
            skill: skill,
        })
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const deleteSkill = async (req,res) => {
    try {
        const user = req.user;
        const skillId = req.params.skillId;

        const hasSkill = user.skills.some(id => id.toString() === skillId);

        if(!hasSkill){
            return res.status(400).json({message: "This Skill does not exist for this user"})
        }

        const skill = await Skill.findByIdAndDelete(skillId);

        user.skills = user.skills.filter(id => id.toString() !== skillId);
        await user.save();
        return res.status(200).json({
            message : "Skill deleted successfully",
            skill: skill,
        })
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};