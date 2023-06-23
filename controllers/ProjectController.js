import {ProjectModel} from "../models/ProjectModel.js";
import ApiDataHandler from "../helpers/ApiDataHandler.js";
import ApiErrorHandler from "../helpers/ApiErrorHandler.js";

class ProjectController {

  async getProjects(req, res) {
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
    }
  }

  async getOneProject(req, res) {
    try {
      const projectId = req.params.id;
      const project = await ProjectModel.findOne({where: {id: projectId}});

      if (project) {
        return res.status(200).json(ApiDataHandler.successRequest(200, "Success get Project", Project));
      }
      return res.status(200).json(ApiDataHandler.emptyData('No Project'));
    } catch (error) {
      console.log(error);
    }
  }

  async createProject(req, res) {
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
        res.json({
          message: "problem"
        });
      }

    } catch (error) {
      return res.json({
        message: error
      })
    }
  }

  async updateProject(req, res) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async deleteProject(req, res) {
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
    }
  }
}

export default new ProjectController();