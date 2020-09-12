import Post from "../model/Post";
import User from '../model/User';

export default class UIController {
    constructor(document) {
        this.document = document;
        this.successAlert = this.document.getElementById('success');

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
        this.signUpBtn = this.document.getElementById('sign-up-btn');
        this.passwordAlert = this.document.getElementById('password-alert');
        this.emailAlert = this.document.getElementById('email-alert');
        this.usernameAlert = this.document.getElementById('username-alert');
        this.signInNotFilledAlert = this.document.getElementById('sign-in-not-filled-alert')
        this.signUpModal = $('#sign-up-modal');
        
        this.logInEmailInput = this.document.getElementById('log-in-email');
        this.logInPasswordInput = this.document.getElementById('log-in-password');
        this.logInBtn = this.document.getElementById('log-in-btn');
        this.logInNotFilledAlert = this.document.getElementById('log-in-not-filled-alert');
        this.logInFailure = this.document.getElementById('log-in-failure');
        this.logInFailureText = this.document.getElementById('log-in-failure-message')
        this.logInModal = $('#log-in-modal');
    }

    showPosts(posts, currUser) {
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
            const author = document.createElement('p');
            author.textContent = `Posted by: ${post.author}`;
            const editIcon = document.createElement('i');
            editIcon.classList = 'fas fa-pen text-primary';
            editIcon.style.marginRight = '1rem';
            const deleteIcon = document.createElement('i');
            deleteIcon.classList = 'fas fa-trash text-danger';
            postBody.textContent = post.body;
            if (!currUser || post.author !== currUser.username) {
                editIcon.style.display = 'none';
                deleteIcon.style.display = 'none';
            }
            cardBody.appendChild(title);
            cardBody.appendChild(postBody);
            cardBody.appendChild(author);
            cardBody.appendChild(editIcon);
            cardBody.appendChild(deleteIcon);
            card.appendChild(cardBody);
            this.postArea.appendChild(card);
        })
    }

    clearPosts() {
        Array.from(this.postArea.childNodes).forEach(ele => ele.remove());
    }

    createPost(author) {
        if (this.titleInput.value === null || this.bodyInput.value === null) {
            return false;
        }
        return new Post(this.titleInput.value, this.bodyInput.value, author);
    }

    signUpCreateUser() {
        if (this.checkPasswords()) {
            return new User(this.signUpUsernameInput.value, this.signUpEmailInput.value, this.signUpPasswordInput.value);
        }
        return null;
    }

    logInCreateUser() {
        return new User()
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
    
    signUpShowEmailAlert() {
        this.signUpEmailInput.style.boxShadow = '2px 3px red';
        this.emailAlert.style.display = 'block';

        setTimeout(() => {
            this.signUpEmailInput.style.boxShadow = 'none';
            this.emailAlert.style.display = 'none';
        }, 2000);
    }

    signUpShowUsernameAlert() {
        this.signUpUsernameInput.style.boxShadow = '2px 3px red';
        this.usernameAlert.style.display = 'block';

        setTimeout(() => {
            this.signUpUsernameInput.style.boxShadow = 'none';
            this.usernameAlert.style.display = 'none';
        }, 2000);
    }

    clearSignUpInput() {
        this.signUpEmailInput.value = '';
        this.signUpUsernameInput.value = '';
        this.signUpPasswordInput.value = '';
        this.signUpConfirmPasswordInput.value = '';
        this.signUpModal.modal('hide');
    }

    signUpCheckIfInputFilled() {
        if ((this.signUpEmailInput.value === '') || (this.signUpUsernameInput.value === '') || (this.signUpPasswordInput.value === '') || (this.signUpConfirmPasswordInput.value === '')) {
            this.signInNotFilledAlert.style.display = 'block';
            setTimeout(() => this.signInNotFilledAlert.style.display = 'none', 2000);
            return false;
        }
        return true;
    }

    logInCheckIfInputFilled() {
        if ((this.logInEmailInput.value === '') || (this.logInPasswordInput.value === '')) {
            this.logInNotFilledAlert.style.display = 'block';
            setTimeout(() => this.logInNotFilledAlert.style.display = 'none', 2000);
            return false;
        }
        return true;
    }

    logInFaliure(message) {
        this.logInFailure.style.display = 'block';
        this.logInFailureText.textContent = message;
        setTimeout(() => this.logInFailure.style.display = 'none', 3000);
    }

    logInClearInputs() {
        this.logInEmailInput.value = '';
        this.logInPasswordInput.value = '';
        this.logInModal.modal('hide');
    }

    showSuccessAlert() {
        this.successAlert.style.display = 'block';
        setTimeout(() => this.successAlert.style.display = 'none', 3000);
    }
}