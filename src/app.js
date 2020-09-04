import UIController from './ui/UIController';
import EasyHTTP from './lib/EasyHTTP';
import Post from './model/Post';

const ui = new UIController(document);
const httpClient = new EasyHTTP('http://localhost:3000/posts');
httpClient.get().then(res => ui.showPosts(res));

ui.submitBtn.addEventListener('click', () => {
    const post = new Post(ui.titleInput.value, ui.bodyInput.value, httpClient.get().then(res => console.log(res.length)));
    
})

// httpClient.post();