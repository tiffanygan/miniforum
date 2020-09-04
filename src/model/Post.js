export default class Post {
    constructor(title, body, id) {
        this.title = title;
        this.body = body;
        this.id = id;
    }

    createPost() {
        return {id: this.id, title: this.title, body: this.body}
    }
}