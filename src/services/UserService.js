import EasyHTTP from '../lib/EasyHTTP';

export default class UserService {
    constructor() {
        this.userClient = new EasyHTTP('http://localhost:3000/users');
        this.initialized = this.init();
    }
    
    async addUser(user) {
        await this.initialized;

        if (this.users.map(currUser => currUser.email).includes(user.email)) {
            return false;
        }

        this.users.push(user);
        this.userClient.post(user);
        return true;
    }
    
    async init() {
        this.users = await this.userClient.get();
    }

    getUser(email) {
        if (this.users.map(user => user.email).includes(email)) {
            return true;
        }
        return false;
    }
}