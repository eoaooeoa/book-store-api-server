import { userModel } from "../db";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async addUser(userInfo) {
    const { email, fullName, password } = userInfo;

    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        "This email is currently in use. Please enter another email."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = { fullName, email, password: hashedPassword };

    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

  async getUserToken(loginInfo) {
    const { email, password } = loginInfo;

    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error(
        "This email has no subscription history. Please check again."
      );
    }

    const correctPasswordHash = user.password;

    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        "Password does not match. Please check again."
      );
    }

    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);

    return { token };
  }

  async getUsers() {
    const users = await this.userModel.findAll();
    return users;
  }

  async setUser(userInfoRequired, toUpdate) {
    const { userId, currentPassword } = userInfoRequired;

    let user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error("No subscription history. Please check again.");
    }

    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        "Password does not match. Please check again."
      );
    }

    const { password } = toUpdate;

    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }

    user = await this.userModel.update({
      userId,
      update: toUpdate,
    });

    return user;
  }
}

const userService = new UserService(userModel);

export { userService };
