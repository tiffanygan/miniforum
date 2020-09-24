import EasyHTTP from '../lib/EasyHTTP';

export default class PostService {
    constructor() {
        this.pageLimit = 4;
        this.sort = 'id';
        this.order = 'desc';
        this.paginationParams = {_sort: this.sort, _order: this.order, _limit: this.pageLimit};
        this.postClient = new EasyHTTP(`https://tiffanygan.ml:4000/posts`);
    }
    
    async addPost(post) {
        return await this.postClient.post(post);
    }
    
    async deletePost(id) {
        return await this.postClient.delete(id);
    }
    
    async getPostById(id) {
        return await this.postClient.getById(id);
    }
    
    async updatePost(id, post) {
        return await this.postClient.update(id, post);
    }
    
    async getPosts() {
        return await this.postClient.get();
    }

    async getTotPageCount() {
        const posts = await this.getPosts();
        return Math.ceil(posts.length / this.pageLimit);
    }
    
    async getPostsPage(pageNum) {
        this.paginationParams['_page'] = pageNum;
        return await this.postClient.getWithSearchParams(this.paginationParams);
    }

    setPageLimit(limit) {
        this.pageLimit = limit;
        this.paginationParams['_limit'] = limit;
    }
}