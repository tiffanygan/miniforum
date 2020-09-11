export default class Post {
    constructor(title, body, author) {
        this.title = title;
        this.body = body;
        this.author = author;
    }

    setId(id) {
        this.id = id;
    }
}