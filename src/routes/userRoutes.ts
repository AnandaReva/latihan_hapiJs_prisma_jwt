// src/routes/userRoutes.ts

import { ServerRoute } from "@hapi/hapi";
import * as userController from "../controllers/userController";

const userRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/users",
    handler: userController.getAllUsers,
    options: { auth: false },
  },
  {
    method: "POST",
    path: "/user",
    handler: userController.fetchUserById,
    options: { auth: false },
  },

  {
    method: "PATCH",
    path: "/user",
    handler: userController.EditUserById,
    options: { auth: false },
  },
  {
    method: "DELETE",
    path: "/user",
    handler: userController.DeleteUserById,
    options: { auth: false },
  },
];

export default userRoutes;
