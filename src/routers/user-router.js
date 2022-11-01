import { Router } from "express";
import is from "@sindresorhus/is";
import { loginRequired } from "../middlewares";
import { userService } from "../services";

const userRouter = Router();

userRouter.post("/login", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "Headers Content-Type require application/json"
      );
    }

    const { email, password } = req.body;
    
    const userToken = await userService.getUserToken({ email, password });

    res.status(200).json(userToken);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "Headers Content-Type require application/json"
      );
    }

    const { fullName, email, password } = req.body;

    const newUser = await userService.addUser({
      fullName,
      email,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", loginRequired, async function (req, res, next) {
  try {
    const users = await userService.getUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.put(
  "/:userId",
  loginRequired,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "Headers Content-Type require application/json"
        );
      }

      const userId = req.params.userId;

      const { fullName, password, address, phoneNumber, role, currentPassword } = req.body;

      if (!currentPassword) {
        throw new Error("Need a current password.");
      }

      const userInfoRequired = { userId, currentPassword };

      const toUpdate = {
        ...(fullName && { fullName }),
        ...(password && { password }),
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
        ...(role && { role }),
      };

      const updatedUserInfo = await userService.setUser(
        userInfoRequired,
        toUpdate
      );

      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };
