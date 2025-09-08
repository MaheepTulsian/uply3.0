import User from "../models/User.js"
import Project from "../models/Project.js"

export const addProject = async (req,res) => {
    try {
        const user = req.user;
        const project = await Project.create(req.body);

        if (!project) {
            return res.status(400).json({ message: "Project creation failed" });
        }

        user.projects.push(project._id);
        await user.save();

        return res.status(200).json({
            message: "project Added successfully",
            project: project,
        })

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const getAllProject = async (req,res) => {
    try {
        const user = req.user;
    
        await user.populate("projects");
    
        return res.status(200).json({
            message: "success",
            projects : user.projects,
        })
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const getProject = async (req,res) => {
    try {
        const user = req.user;
        const projectId = req.params.projectId;
        const hasProject = user.projects.some(id => id.toString() === projectId);

        if(!hasProject){
            return res.status(400).json({message: "project doesn't belong to this user"});
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Experience not found" });
        }

        return res.status(200).json({
            message: "success",
            project: project,
        })

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const updateProject = async (req,res) => {
    try {
        const user = req.user;
        const projectId = req.params.projectId;

        const hasProject = user.projects.some(id => id.toString() === projectId);

        if(!hasProject){
            return res.status(400).json({message: "project doesn't belong to this user"});
        }

        const project = await Project.findByIdAndUpdate(projectId, req.body, {new: true});

        if(!project){
            return res.status(400).json({message: "Project not found"});
        }

        return res.status(200).json({
            message: "Success",
            project: project,
        })
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const deleteProject = async (req,res) => {
    try {
        const user = req.user;
        const projectId = req.params.projectId;

        const hasProject = user.projects.some(id => id.toString() === projectId);

        if(!hasProject){
            return res.status(400).json({message: "project doesn't belong to this user"});
        }

        const project = await Project.findByIdAndDelete(projectId);

        user.projects = user.projects.filter(id => id.toString() !== projectId);

        return res.status(200).json({
            message: "Success",
            project: project,
        })

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};
