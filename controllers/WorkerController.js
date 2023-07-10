import {WorkerModel} from "../models/WorkerModel.js";
import ApiDataHandler from "../helpers/ApiDataHandler.js";
import ApiErrorHandler from "../helpers/ApiErrorHandler.js";

class WorkerController {

  async getWorkers(req, res, next) {
    try {
      let {page, limit} = req.query;
      page = page || 1
      limit = limit || 10
      let offset = page * limit - limit

      const workers = await WorkerModel.findAndCountAll({limit, offset});

      if (workers) {
        return res.status(200).json(ApiDataHandler.successRequest(200, "Success get workers", workers));
      }
      return res.status(200).json(ApiDataHandler.emptyData('No workers'));
    } catch (error) {
      console.log(error);
      next();
    }
  }

  async getOneWorker(req, res, next) {
    try {
      const workerId = req.params.id;
      const worker = await WorkerModel.findOne({where: {id: workerId}});

      if (worker) {
        return res.status(200).json(ApiDataHandler.successRequest(200, "Success get worker", worker));
      }
      return res.status(200).json(ApiDataHandler.emptyData('No worker'));
    } catch (error) {
      console.log(error);
      next();
    }
  }

  async createWorker(req, res, next) {
    try {
      const {email, name} = req.body;
      const workerCandidate = await WorkerModel.findOne({where: {email: email}});

      if (workerCandidate !== null) {
        return res.status(409).json(ApiErrorHandler.badRequest(409, "An worker is already registered with this email"))
      }

      const worker = await WorkerModel.create({email, name});

      if (worker && name) {
        return res.status(201).json(ApiDataHandler.successRequest(201, "Success create worker", worker))
      } else {
        return ApiErrorHandler.badRequest(404, "Something went wrong");
      }

    } catch (error) {
      console.log(error);
      next();
    }
  }

  async updateWorker(req, res, next) {
    try {

    } catch (error) {
      console.log(error);
      next();
    }
  }

  async deleteWorker(req, res, next) {
    try {
      const workerId = req.params.id;
      const deleteWorker = await WorkerModel.destroy({where: {id: workerId}});

      if (deleteWorker) {
        return res.status(202).json(ApiDataHandler.successRequest(200, "Success delete workers", {workerId}))
      }

      return res.status(400).json(ApiErrorHandler.badRequest(400, "No worker with this id"))
    } catch (error) {
      console.log(error);
      next();
    }
  }
}

export default new WorkerController();