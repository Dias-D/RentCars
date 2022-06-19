import { Router } from "express";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateAvatarController } from "@modules/accounts/useCases/updateAvatar/UpdateAvatarController";
import uploadConfig from "@config/upload";
import multer from "multer";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUsersController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();

usersRoutes.post("/", createUsersController.handle);
usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateAvatarController.handle);

export { usersRoutes };
