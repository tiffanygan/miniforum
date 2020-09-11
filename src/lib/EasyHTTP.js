export default class EasyHTTP {
    constructor(url) {
        this.url = url;
    }

    async get() {
        const res = await fetch(this.url);
        return await res.json();
    }

    async getById(id) {
        const res = await fetch(this.url + `/${id}`);
        return await res.json();
    }

    async post(item) {
        const res = await fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {'Content-Type': 'application/json'}
        });
        return await res.json();
    }
    
    delete(id) {
        fetch(this.url + `/${id}`, {
            method: 'DELETE'
        });
    }
    
    update(id, item) {
        return fetch(this.url + `/${id}`, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {'Content-Type': 'application/json'}
        });
    }
}