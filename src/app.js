import UIController from "./ui/UIController";
import EasyHTTP from "./lib/EasyHTTP";

const ui = new UIController(document);
const httpClient = new EasyHTTP("http://localhost:3000/posts");
showPosts();

ui.submitBtn.addEventListener('click', () => {
    const post = ui.createPost();
    if (!post) {
        return;
    }
    httpClient.post(post);
    ui.clearInput();
    showPosts();
});

ui.postArea.addEventListener('click', e => {
    if (e.target.classList.contains('fa-trash')) {
        httpClient.delete(e.target.parentElement.parentElement.id);
        showPosts();
    }
});

ui.postArea.addEventListener('click', e => {
    if (e.target.classList.contains('fa-pen')) {
        httpClient.getPost(e.target.parentElement.parentElement.id).then(post => {
            console.log(post)
            ui.fillInput(post);
            
        });
    }
});

function showPosts() {
    httpClient.get().then((posts) => ui.showPosts(posts));
}