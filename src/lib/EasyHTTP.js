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
    
    async delete(id) {
        await fetch(this.url + `/${id}`, {
            method: 'DELETE'
        });
    }
    
    async update(id, item) {
        return await fetch(this.url + `/${id}`, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {'Content-Type': 'application/json'}
        });
    }

    async getWithSearchParams(params) {
        const res = await fetch(`${this.url}?` + new URLSearchParams(params));
        return await res.json();
    }
}