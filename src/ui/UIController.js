import Post from "../model/Post";
import User from '../model/User';

export default class UIController {
    constructor(document) {
        this.document = document;
        this.successAlert = this.document.getElementById('success');
        this.postHereBtn = this.document.getElementById('post-here-btn');
        this.welcome = this.document.getElementById('welcome');
        this.logOutBtn = this.document.getElementById('log-out-btn');
        this.navbarLogIn = this.document.getElementById('navbar-log-in');
        this.navbarSignUp = this.document.getElementById('navbar-sign-up');
        this.prevPage = this.document.getElementById('prev-page');
        this.nextPage = this.document.getElementById('next-page');

        this.submitBtn = this.document.getElementById('submit');
        this.cancelBtn = this.document.getElementById('cancel');
        this.updateBtn = this.document.getElementById('update');
        this.postArea = this.document.getElementById('post-area');
        this.titleInput = this.document.getElementById('title');
        this.bodyInput = this.document.getElementById('content');
        this.postForm = this.document.getElementById('post-form');

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

        this.postModalTitle = this.document.getElementById('post-modal-title');
        this.postModalBody = this.document.getElementById('post-modal-body');
        this.postModalAuthor = this.document.getElementById('post-modal-author');
        this.postModal = $('#post-modal');
    }

    showPosts(posts, currUser, currPageNum, totPagesCount) {
        this.clearPosts();
        posts.forEach(post => {
            const card = document.createElement('div');
            card.classList = 'card mt-3 post';
            card.id = post.id;
            const title = document.createElement('h4');
            title.classList = 'card-header';
            title.textContent = post.title;
            const cardBody = document.createElement('div');
            cardBody.classList = 'card-body';
            const author = document.createElement('h5');
            author.textContent = `Posted by: ${post.author}`;
            author.classList = 'card-title text-muted';
            const postBody = document.createElement('p');
            postBody.style.whiteSpace = 'pre-wrap';
            postBody.classList = 'card-text';
            const lines = post.body.split(/\r\n|\r|\n/);
            if (lines.length > 1 || lines[0].length > 70) {
                postBody.textContent = lines[0].substring(0, 70) + '...';
            } else {
                postBody.textContent = post.body;
            }
            card.appendChild(title);
            cardBody.appendChild(postBody);
            cardBody.appendChild(author);
            if (currUser && post.author === currUser.username) {
                const editIcon = document.createElement('i');
                editIcon.classList = 'fas fa-pen text-primary';
                editIcon.style.marginRight = '1rem';
                const deleteIcon = document.createElement('i');
                deleteIcon.classList = 'fas fa-trash text-danger';
                cardBody.appendChild(editIcon);
                cardBody.appendChild(deleteIcon);
            }
            card.appendChild(cardBody);
            this.postArea.appendChild(card);
            this.postForm.style.display = 'none';
            this.postHereBtn.style.display = 'block';
        });
        this.nextPage.style.display = 'block';
        this.nextPage.dataset.currPageNum = currPageNum;
        this.prevPage.style.display = 'block';
        this.prevPage.dataset.currPageNum = currPageNum;
        
        if (parseInt(this.nextPage.dataset.currPageNum) === totPagesCount) {
            this.nextPage.style.display = 'none';
        } 
        if (parseInt(this.prevPage.dataset.currPageNum) === 1) {
            this.prevPage.style.display = 'none';
        }
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

    printPost(post) {
        this.titleInput.value = post.title;
        this.bodyInput.value = post.body;
        this.cancelBtn.style.display = 'inline-block';
        this.updateBtn.style.display = 'inline-block';
        this.updateBtn.dataset.id = post.id;
        this.submitBtn.style.display = 'none';
        this.postForm.style.display = 'block';
        this.postHereBtn.style.display = 'none';
    }

    addNewPostView() {
        this.clearPostInput();
        this.cancelBtn.style.display = 'none';
        this.updateBtn.style.display = 'none';
        this.submitBtn.style.display = 'inline-block';
        this.postForm.style.display = 'none';
        this.postHereBtn.style.display = 'block';
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

    welcomeUser(user) {
        if (!user) {
            return;
        }
        this.welcome.textContent = `Welcome ${user.username}!`
        this.welcome.style.display = 'block';
        this.logOutBtn.style.display = 'block';
        this.navbarLogIn.style.display = 'none';
        this.navbarSignUp.style.display = 'none';
    }
    
    logOut() {
        this.welcome.style.display = 'none';
        this.logOutBtn.style.display = 'none';
        this.navbarLogIn.style.display = 'block';
        this.navbarSignUp.style.display = 'block';
    }

    showPostModal(post) {
        this.postModal.modal('show');
        this.postModalTitle.textContent = post.title;
        this.postModalBody.textContent = post.body;
        this.postModalBody.style.whiteSpace = 'pre-wrap'
        this.postModalAuthor.textContent = `Posted by: ${post.author}`;
    }
}