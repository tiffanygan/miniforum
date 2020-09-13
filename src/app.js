import UIController from "./ui/UIController";
import EasyHTTP from "./lib/EasyHTTP";
import UserService, { NO_ACCOUNT, PASSWORD_WRONG } from './services/UserService';
import PostService from './services/PostService';

let currUser = null;
const ui = new UIController(document);
const postClient = new EasyHTTP("http://localhost:3000/posts");
const userService = new UserService();
const postService = new PostService();
initPage();

ui.submitBtn.addEventListener('click', async () => {
    if (!currUser) {
        return;
    }

    const post = ui.createPost(currUser.username);
    if (!post) {
        return;
    }
    postClient.post(post);
    ui.clearPostInput();
    initPage();
});

ui.postArea.addEventListener('click', e => {
    if (e.target.classList.contains('fa-trash')) {
        postClient.delete(e.target.parentElement.parentElement.id);
        initPage();
    }
});

ui.postArea.addEventListener('click', async e => {
    if (e.target.classList.contains('fa-pen')) {
        const post = await postClient.getById(e.target.parentElement.parentElement.id);
        ui.editPost(post);
    }
});

ui.cancelBtn.addEventListener('click', () => ui.addNewPost());

ui.updateBtn.addEventListener('click', async e => {
    const post = ui.createPost();
    await postClient.update(parseInt(e.target.dataset.id), post);
    ui.addNewPost();
    initPage();
});

ui.signUpBtn.addEventListener('click', async () => {
    if (!ui.signUpCheckIfInputFilled()) {
        return;
    }

    const user = ui.signUpCreateUser();
    if (!user) {
        return;
    }

    if (! await userService.checkEmail(user)) {
        ui.signUpShowEmailAlert();
        return;
    }

    if (! await userService.checkUsername(user)) {
        ui.signUpShowUsernameAlert();
        return;
    }

    const createdUser = await userService.addUser(user);
    if (createdUser) {
        ui.clearSignUpInput();
        ui.showSuccessAlert();
        currUser = createdUser;
        initPage();
        return;
    }
});

ui.logInBtn.addEventListener('click', async () => {
    if (!ui.logInCheckIfInputFilled()) {
        return;
    }

    const checkStatus = await userService.checkUser(ui.logInEmailInput.value, ui.logInPasswordInput.value);

    if (checkStatus === NO_ACCOUNT) {
        ui.logInFaliure('User does not exist.');
    } else if (checkStatus === PASSWORD_WRONG) {
        ui.logInFaliure('Password is wrong');
    } else {
        currUser = await userService.getUserByEmail(ui.logInEmailInput.value);
        ui.logInClearInputs();
        ui.showSuccessAlert();
        initPage();
    }
})

async function initPage() {
    const posts = await postClient.get();
    ui.showPosts(posts, currUser);

    window.htmlCollection = document.getElementsByClassName('post');
    Array.from(window.htmlCollection).forEach(post => post.addEventListener('click', async () => {
        const currPost = await postService.getPostById(post.id);
        ui.showPostModal(currPost);
    }));

    if (!currUser) {
        ui.postForm.style.display = 'none';
        ui.postHereBtn.style.display = 'block';
        return;
    }
    ui.postForm.style.display = 'block';
    ui.postHereBtn.style.display = 'none';
}