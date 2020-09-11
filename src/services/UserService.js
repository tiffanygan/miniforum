import EasyHTTP from '../lib/EasyHTTP';
import User from '../model/User';
import md5 from 'md5';

export const PASSWORD_WRONG = 1;
export const NO_ACCOUNT = 2;
export const LOGIN_SUCCESS = 0;

export default class UserService {
    constructor() {
        this.userClient = new EasyHTTP('http://localhost:3000/users');
    }
    
    async addUser(user) {
        const users = await this.userClient.get();
        
        if (users.map(currUser => currUser.email).includes(user.email)) {
            return null;
        }

        user.password = md5(user.password);
        const postedUser = await this.userClient.post(user);
        return postedUser;
    }
    
    async checkUser(email, password) {
        const users = await this.userClient.get();
        const user = users.find(currUser => currUser.email === email);

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
        const user = users.find(currUser => currUser.email = email);

        if (user) {
            return user;
        }
        return false;
    }
}