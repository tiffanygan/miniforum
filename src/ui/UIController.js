import Post from "../model/Post";
import User from '../model/User';
import md5 from "md5";

export default class UIController {
    constructor(document) {
        this.document = document;

        this.submitBtn = this.document.getElementById('submit');
        this.cancelBtn = this.document.getElementById('cancel');
        this.updateBtn = this.document.getElementById('update');
        this.postArea = this.document.getElementById('post-area');
        this.titleInput = this.document.getElementById('title');
        this.bodyInput = this.document.getElementById('content');

        this.signUpUsernameInput = this.document.getElementById('sign-up-username');
        this.signUpEmailInput = this.document.getElementById('sign-up-email');
        this.signUpPasswordInput = this.document.getElementById('sign-up-password');
        this.signUpConfirmPasswordInput = this.document.getElementById('confirm-password');
        this.logInBtn = this.document.getElementById('log-in-btn');
        this.signUpBtn = this.document.getElementById('sign-up-btn');
        this.passwordAlert = this.document.getElementById('password-alert');
        this.emailAlert = this.document.getElementById('email-alert');
        this.signUpModal = $('#sign-up-modal');
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

    createUser() {
        if (this.checkPasswords()) {
            const password = this.signUpPasswordInput.value;
            return new User(this.signUpUsernameInput.value, this.signUpEmailInput.value, md5(password));
        }
        return null;
    }

    editPost(post) {
        this.titleInput.value = post.title;
        this.bodyInput.value = post.body;
        this.cancelBtn.style.display = 'inline-block';
        this.updateBtn.style.display = 'inline-block';
        this.updateBtn.dataset.id = post.id;
        this.submitBtn.style.display = 'none';
    }

    addNewPost() {
        this.clearPostInput();
        this.cancelBtn.style.display = 'none';
        this.updateBtn.style.display = 'none';
        this.submitBtn.style.display = 'inline-block';
    }

    clearPostInput() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    checkPasswords() {
        if (this.signUpPasswordInput.value === this.signUpConfirmPasswordInput.value) {
            return true;
        }
    
        this.passwordAlert.style.display = 'block';
        this.signUpPasswordInput.style.boxShadow = '2px 3px red';
        this.signUpConfirmPasswordInput.style.boxShadow = '2px 3px red';

        setTimeout(() => {
            this.passwordAlert.style.display = 'none';
            this.signUpPasswordInput.style.boxShadow = 'none';
            this.signUpConfirmPasswordInput.style.boxShadow = 'none';
        }, 2000);

        return false;
    }

    signUpFaliure() {
        this.signUpEmailInput.style.boxShadow = '2px 3px red';
        this.emailAlert.style.display = 'block';

        setTimeout(() => {
            this.signUpEmailInput.style.boxShadow = 'none';
            this.emailAlert.style.display = 'none';
        }, 2000);
    }

    clearSignUpInput() {
        this.signUpEmailInput.value = '';
        this.signUpUsernameInput.value = '';
        this.signUpPasswordInput.value = '';
        this.signUpConfirmPasswordInput.value = '';
        this.signUpModal.modal('hide');
    }
}