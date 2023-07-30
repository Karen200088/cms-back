import {ProjectModel} from "../models/ProjectModel.js";
import ApiDataHandler from "../helpers/ApiDataHandler.js";
import ApiErrorHandler from "../helpers/ApiErrorHandler.js";
import {WorkerModel} from "../models/WorkerModel.js";

class ProjectController {

  async getProjects(req, res, next) {
    try {
      let {page, limit} = req.query;
      page = page || 1
      limit = limit || 10
      let offset = page * limit - limit

      const projects = await ProjectModel.findAndCountAll({limit, offset});

      if (projects) {
        return res.status(200).json(ApiDataHandler.successRequest(200, "Success get Projects", projects));
      }
      return res.status(200).json(ApiDataHandler.emptyData('No Projects'));
    } catch (error) {
      console.log(error);
      next();
    }
  }

  async getOneProject(req, res, next) {
    try {
      const projectId = req.params.id;
      const project = await ProjectModel.findOne({
        where: {id: projectId},
        include: WorkerModel
      });

      if (project) {
        return res.status(200).json(ApiDataHandler.successRequest(200, "Success get Project", Project));
      }
      return res.status(200).json(ApiDataHandler.emptyData('No Project'));
    } catch (error) {
      console.log(error);
      next();
    }
  }

  async createProject(req, res, next) {
    try {
      const {email, name} = req.body;
      const projectCandidate = await ProjectModel.findOne({where: {email: email}});

      if (projectCandidate !== null) {
        return res.status(409).json(ApiErrorHandler.badRequest(409, "An Project is already registered with this email"))
      }
      const project = await ProjectModel.create({email, name});


      if (project && name) {
        return res.status(201).json(ApiDataHandler.successRequest(201, "Success create Project", Project))
      } else {
        return ApiErrorHandler.badRequest(404, "Something went wrong");
      }

    } catch (error) {
      console.log(error);
      next();
    }
  }

  async updateProject(req, res, next) {
    try {

    } catch (error) {
      console.log(error);
      next();
    }
  }

  async deleteProject(req, res, next) {
    try {
      const projectId = req.params.id;
      const deleteProject = await ProjectModel.destroy({where: {id: projectId}});

      if (deleteProject) {
        return res.status(202).json(
          ApiDataHandler.successRequest(200, "Success delete Projects", {projectId})
        )
      }

      return res.status(400).json(ApiErrorHandler.badRequest(400, "No Project with this id"))
    } catch (error) {
      console.log(error);
      next();
    }
  }
}

export default new ProjectController();