import EasyHTTP from '../lib/EasyHTTP';

export default class PostService {
    constructor() {
        this.pageNum = 1;
        this.searchParams = `?_sort=id&_order=desc&_page=${this.pageNum}&_limit=2`;
        this.postClient = new EasyHTTP(`https://tiffanygan.ml:4000/posts`);
    }
    
    async getPostById(id) {
        const posts = await this.postClient.get();
        return posts.find(currPost => currPost.id === parseInt(id));
    }
    
    async addPost(post) {
        return this.postClient.post(post);
    }
    
    async deletePost(id) {
        return this.postClient.delete(id);
    }
    
    async getPostById(id) {
        return this.postClient.getById(id);
    }
    
    async updatePost(id, post) {
        return this.postClient.update(id, post);
    }
    
    async getPosts() {
        return this.postClient.get();
    }
    
    async getNextPage() {
        this.searchParams = `?_sort=id&_order=desc&_page=${this.pageNum}&_limit=2`;
        this.pageNum += 1;
        return await this.postClient.getWithSearchParams(this.searchParams);
    }
    
    async getPrevPage() {
        this.pageNum -= 1;
        this.paginatedClient = new EasyHTTP(`https://tiffanygan.ml:4000/posts?_sort=id&_order=desc&_page=${this.pageNum}&_limit=2`);
        return this.paginatedClient.get();
    }
}