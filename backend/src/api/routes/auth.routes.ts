import express, { NextFunction } from "express";
import { UserController } from "../controllers/user.controller";
import { Response } from "express";
import { checkJwt } from "../../middleware/checkJwt";
import { UserRequestInfo } from "../../types/userRequest";

const authRouter = express.Router();

authRouter.post("/register", UserController.register);
authRouter.post("/login", UserController.login);
authRouter.get(
  "/myPage",
  checkJwt,
  (req: UserRequestInfo, res: Response, next: NextFunction) => {
    res.send("This is a protected route");
  }
);

export default authRouter;