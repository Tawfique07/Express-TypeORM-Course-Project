import * as express from "express";
import CourseController from "../controllers/CourseController";

export default class CourseRoutes {
  private router: express.Router;
  private courseController: CourseController;

  constructor() {
    this.router = express.Router();
    this.courseController = new CourseController();
    this.registerRoutes();
  }

  private registerRoutes() {
    this.router.get("/", this.courseController.getAllCourses);
    this.router.post("/add", this.courseController.add);
    this.router.delete("/remove/:courseId", this.courseController.remove);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
