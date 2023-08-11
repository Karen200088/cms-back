import Router from "express";
import authMiddleware from "../middleware/AuthMiddleware.js";
import workerController from "../controllers/WorkerController.js";

const workerRouter = new Router();

workerRouter.get("/worker", authMiddleware, workerController.getWorkers);
workerRouter.get("/worker/:id", authMiddleware, workerController.getOneWorker);
workerRouter.get("/worker/search", authMiddleware, workerController.searchWorkers);
workerRouter.post("/worker", authMiddleware, workerController.createWorker);
workerRouter.put("/worker", authMiddleware, workerController.updateWorker);
workerRouter.delete("/worker/:id", authMiddleware, workerController.deleteWorker);

export default workerRouter;