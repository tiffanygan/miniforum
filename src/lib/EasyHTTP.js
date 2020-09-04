export default class EasyHTTP {
    constructor(url) {
        this.url = url;
    }

    async get() {
        const res = await fetch(this.url);
        const jsonRes = await res.json();
        return jsonRes;
    }

    post() {
        fetch(this.url, {method: 'POST', body: JSON.stringify({title: 'test', body: 'this is a test'}), headers: {'Content-Type': 'application/json'}});
    }
}