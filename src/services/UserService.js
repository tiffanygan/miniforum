import EasyHTTP from "../lib/EasyHTTP";
import md5 from "md5";

export const PASSWORD_WRONG = 1;
export const NO_ACCOUNT = 2;
export const LOGIN_SUCCESS = 0;

export default class UserService {
  constructor() {
    this.userClient = new EasyHTTP("https://tiffanygan.ml:4000/users");
  }

  async checkEmail(user) {
    const users = await this.userClient.get();
    if (users.map((currUser) => currUser.email).includes(user.email)) {
      return false;
    }
    return true;
  }

  async checkUsername(user) {
    const users = await this.userClient.get();
    if (users.map((currUser) => currUser.username).includes(user.username)) {
      return false;
    }
    return true;
  }

  async addUser(user) {
    user.password = md5(user.password);
    const postedUser = await this.userClient.post(user);
    return postedUser;
  }

  async checkUser(email, password) {
    const users = await this.userClient.get();
    const user = users.find((currUser) => currUser.email === email);

    if (user && user.password === md5(password)) {
      return LOGIN_SUCCESS;
    }

    if (!user) {
      return NO_ACCOUNT;
    }

    return PASSWORD_WRONG;
  }

  async getUserByEmail(email) {
    const users = await this.userClient.get();
    return users.find((currUser) => currUser.email === email);
  }
}
