import EasyHTTP from '../lib/EasyHTTP';

export default class PostService {
    constructor() {
        this.postClient = new EasyHTTP('http://localhost:3000/posts');
    }

    async getPostById(id) {
        const posts = await this.postClient.get();
        return posts.find(currPost => currPost.id === parseInt(id));
    }
}