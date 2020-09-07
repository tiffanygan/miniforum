export default class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    setId(id) {
        this.id = id;
    }
}