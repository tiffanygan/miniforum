export default class UIController {
    constructor(document) {
        this.document = document;
        this.submitBtn = this.document.getElementById('submit');
        this.container = this.document.getElementById('post-area');
        this.titleInput = this.document.getElementById('title');
        this.bodyInput = this.document.getElementById('content');
    }

    showPosts(posts) {
        this.clearPosts();
        posts.forEach(post => {
            const card = document.createElement('div');
            card.classList = 'card mt-3';
            card.id = post.id;
            const cardBody = document.createElement('div');
            cardBody.classList = 'card-body';
            const title = document.createElement('h3');
            title.classList = 'card-title';
            title.textContent = post.title;
            const postBody = document.createElement('p');
            postBody.textContent = post.body;
            cardBody.appendChild(title);
            cardBody.appendChild(postBody);
            card.appendChild(cardBody);
            this.container.appendChild(card);
        })
    }

    clearPosts() {
        Array.from(this.container.childNodes).forEach(ele => ele.remove());
    }
}