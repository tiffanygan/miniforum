import UIController from "./ui/UIController";
import EasyHTTP from "./lib/EasyHTTP";
import UserService from './services/UserService';

const ui = new UIController(document);
const postClient = new EasyHTTP("http://localhost:3000/posts");
const userService = new UserService();
showPosts();

ui.submitBtn.addEventListener('click', () => {
    const post = ui.createPost();
    if (!post) {
        return;
    }
    postClient.post(post);
    ui.clearPostInput();
    showPosts();
});

ui.postArea.addEventListener('click', e => {
    if (e.target.classList.contains('fa-trash')) {
        postClient.delete(e.target.parentElement.parentElement.id);
        showPosts();
    }
});

ui.postArea.addEventListener('click', e => {
    if (e.target.classList.contains('fa-pen')) {
        postClient.getById(e.target.parentElement.parentElement.id).then(post => {
            ui.editPost(post);
        });
    }
});

ui.cancelBtn.addEventListener('click', () => ui.addNewPost());

ui.updateBtn.addEventListener('click', async e => {
    const post = ui.createPost();
    await postClient.update(parseInt(e.target.dataset.id), post);
    ui.addNewPost();
    showPosts();
});

ui.signUpBtn.addEventListener('click', async () => {
    if (!ui.signUpCheckIfInputFilled()) {
        return;
    }

    const user = ui.signUpCreateUser();
    if (!user) {
        return;
    }

    if (await userService.addUser(user)) {
        ui.clearSignUpInput();
        ui.showSuccessAlert();
        return;
    }

    ui.signUpFaliure();
});

ui.logInBtn.addEventListener('click', () => {
    if (!ui.logInCheckIfInputFilled()) {
        return;
    }

    if (!userService.getUser(ui.logInEmailInput.value)) {
        ui.logInFaliure();
        return;
    }

    ui.logInClearInputs();
    ui.showSuccessAlert();
})

function showPosts() {
    postClient.get().then((posts) => ui.showPosts(posts));
}