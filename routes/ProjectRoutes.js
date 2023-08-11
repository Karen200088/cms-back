import Router from "express";
import authMiddleware from "../middleware/AuthMiddleware.js";
import projectController from "../controllers/ProjectController.js";

const projectRouter = new Router();

projectRouter.get("/project", authMiddleware, projectController.getProjects);
projectRouter.get("/project/:id", authMiddleware, projectController.getOneProject);
projectRouter.get("/project/search", authMiddleware, projectController.searchProject);
projectRouter.post("/project", authMiddleware, projectController.createProject);
projectRouter.put("/project", authMiddleware, projectController.updateProject);
projectRouter.delete("/project/:id", authMiddleware, projectController.deleteProject);

export default projectRouter;