import UIController from "./ui/UIController";
import UserService, {
  NO_ACCOUNT,
  PASSWORD_WRONG,
} from "./services/UserService";
import PostService from "./services/PostService";

let currUser = JSON.parse(localStorage.getItem("currUser"));
let orderNum = 0;

const ui = new UIController(document);
const userService = new UserService();
const postService = new PostService();
initPage();

ui.submitBtn.addEventListener("click", async () => {
  if (!currUser) {
    return;
  }

  const post = ui.createPost(currUser.username);
  if (!post) {
    return;
  }
  await postService.addPost(post);
  ui.clearPostInput();
  initPage();
});

ui.postArea.addEventListener("click", async (e) => {
  if (e.target.classList.contains("fa-trash")) {
    await postService.deletePost(e.target.parentElement.parentElement.id);
    initPage();
  } else if (e.target.classList.contains("fa-pen")) {
    const post = await postService.getPostById(e.target.parentElement.parentElement.id);
    ui.printPost(post);
  } else {
    let node = e.target;
    while (true) {
      if (node.classList.contains('post')) {
        const currPost = await postService.getPostById(node.id);
        ui.showPostModal(currPost);
        break;
      } else if (node === ui.postArea) {
        break;
      } else {
        node = node.parentElement;
      }
    }
  }
});

ui.cancelBtn.addEventListener("click", () => {
  ui.addNewPostView();
});

ui.updateBtn.addEventListener("click", async (e) => {
  const post = ui.createPost(currUser.username);
  await postService.updatePost(parseInt(e.target.dataset.id), post);
  ui.addNewPostView();
  initPage();
});

ui.signUpBtn.addEventListener("click", async () => {
  if (!ui.signUpCheckIfInputFilled()) {
    return;
  }

  const user = ui.signUpCreateUser();
  if (!user) {
    return;
  }

  if (!(await userService.checkEmail(user))) {
    ui.signUpShowEmailAlert();
    return;
  }

  if (!(await userService.checkUsername(user))) {
    ui.signUpShowUsernameAlert();
    return;
  }

  const createdUser = await userService.addUser(user);
  if (createdUser) {
    ui.clearSignUpInput();
    ui.showSuccessAlert();
    currUser = createdUser;
    localStorage.setItem("currUser", JSON.stringify(currUser));
    initPage();
    ui.welcomeUser(currUser);
    return;
  }
});

ui.logInBtn.addEventListener("click", async () => {
  if (!ui.logInCheckIfInputFilled()) {
    return;
  }

  const checkStatus = await userService.checkUser(
    ui.logInEmailInput.value,
    ui.logInPasswordInput.value
  );

  if (checkStatus === NO_ACCOUNT) {
    ui.logInFaliure("User does not exist.");
  } else if (checkStatus === PASSWORD_WRONG) {
    ui.logInFaliure("Password is wrong");
  } else {
    currUser = await userService.getUserByEmail(ui.logInEmailInput.value);
    localStorage.setItem("currUser", JSON.stringify(currUser));
    ui.logInClearInputs();
    ui.showSuccessAlert();
    initPage();
    ui.welcomeUser(currUser);
  }
});

ui.logOutBtn.addEventListener("click", () => {
  ui.logOut();
  currUser = null;
  localStorage.setItem("currUser", JSON.stringify(currUser));
  initPage();
});

ui.postHereBtn.addEventListener("click", () => {
  if (!currUser) {
    ui.logInModal.modal("show");
    return;
  }
  ui.postHereBtn.style.display = "none";
  ui.postForm.style.display = "block";
  ui.cancelBtn.style.display = "inline-block";
});

ui.nextPage.addEventListener("click", () => getPagePosts(ui.nextPage));

ui.prevPage.addEventListener("click", () => getPagePosts(ui.prevPage));

async function getPagePosts(pageBtn) {
  const pageNum = parseInt(pageBtn.dataset.pageNum);
  const posts = await postService.getPostsPage(pageNum);
  const totPageCount = await postService.getTotPageCount();
  ui.showPosts(posts, currUser, pageNum, totPageCount);
}

async function initPage() {
  orderNum = orderNum + 1;
  console.log(`order: ${orderNum}`);
  if (window.matchMedia("(max-width: 425px)").matches) {
    console.log(`small size, ${orderNum}`);
    postService.setPageLimit(2);
    ui.postArea.style.marginTop = '2rem';
  }
  if (window.matchMedia("(min-width: 426px) and (max-width: 1024px)").matches) {
    console.log(`medium size, ${orderNum}`);
    postService.setPageLimit(4);
  }
  if (window.matchMedia("(min-width: 1025px)").matches) {
    console.log(`large size, ${orderNum}`);
    postService.setPageLimit(6);
  }
  const currPageNum = 1;
  const posts = await postService.getPostsPage(currPageNum);
  const totPageCount = await postService.getTotPageCount();
  console.log(`post length: ${posts.length}`);
  ui.showPosts(posts, currUser, currPageNum, totPageCount);
  ui.welcomeUser(currUser);
}

window.addEventListener('resize', async () => {
  initPage();
});