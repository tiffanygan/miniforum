import Post from "../model/Post";

export default class UIController {
    constructor(document) {
        this.document = document;
        this.submitBtn = this.document.getElementById('submit');
        this.postArea = this.document.getElementById('post-area');
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
            const editIcon = document.createElement('i');
            editIcon.classList = 'fas fa-pen text-primary';
            editIcon.style.marginRight = '1rem';
            const deleteIcon = document.createElement('i');
            deleteIcon.classList = 'fas fa-trash text-danger';
            postBody.textContent = post.body;
            cardBody.appendChild(title);
            cardBody.appendChild(postBody);
            cardBody.appendChild(editIcon);
            cardBody.appendChild(deleteIcon);
            card.appendChild(cardBody);
            this.postArea.appendChild(card);
        })
    }

    clearPosts() {
        Array.from(this.postArea.childNodes).forEach(ele => ele.remove());
    }

    createPost() {
        return new Post(this.titleInput.value, this.bodyInput.value);
    }

    fillInput(post) {
        this.titleInput.value = post.title;
        this.bodyInput.value = post.body;
    }

    clearInput() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }
}