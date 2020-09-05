export default class EasyHTTP {
    constructor(url) {
        this.url = url;
    }

    async get() {
        const res = await fetch(this.url);
        return await res.json();
    }

    async getPost(id) {
        const res = await fetch(this.url + `/${id}`);
        return await res.json();
    }

    post(post) {
        fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {'Content-Type': 'application/json'}
        });
    }
    
    delete(id) {
        fetch(this.url + `/${id}`, {
            method: 'DELETE'
        });
    }
    
    update(id, post) {
        fetch(this.url + `/${id}`, {
            method: 'PUT',
            body: JSON.stringify(post),
            headers: {'Content-Type': 'application/json'}
        });
    }
}