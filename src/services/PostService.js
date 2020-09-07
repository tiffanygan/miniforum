import EasyHTTP from '../lib/EasyHTTP';

export default class PostService {
    constructor() {
        this.postClient = new EasyHTTP('http://localhost:3000/posts');
    }


}