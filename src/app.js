import UIController from "./ui/UIController";
import UserService, {
  NO_ACCOUNT,
  PASSWORD_WRONG,
} from "./services/UserService";
import PostService from "./services/PostService";

let currUser = JSON.parse(localStorage.getItem("currUser"));

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
  }
});

ui.postArea.addEventListener("click", async (e) => {
  if (e.target.classList.contains("fa-pen")) {
    const post = await postService.getPostById(
      e.target.parentElement.parentElement.id
    );
    ui.printPost(post);
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

ui.nextPage.addEventListener("click", async () => {
  const posts = await postService.getPostsPage(parseInt(ui.nextPage.dataset.currPageNum) + 1);
  const currPageNum = parseInt(ui.nextPage.dataset.currPageNum) + 1;
  const totPageCount = await postService.getTotPageCount();
  ui.showPosts(posts, currUser, currPageNum, totPageCount);
  addEventListnerToPosts();
});

ui.prevPage.addEventListener("click", async () => {
  const posts = await postService.getPostsPage(parseInt(ui.prevPage.dataset.currPageNum) - 1);
  const currPageNum = parseInt(ui.prevPage.dataset.currPageNum) - 1;
  const totPageCount = await postService.getTotPageCount();
  ui.showPosts(posts, currUser, currPageNum, totPageCount);
  addEventListnerToPosts();
});

async function initPage() {
  const currPageNum = 1;
  const posts = await postService.getPostsPage(currPageNum);
  const totPageCount = await postService.getTotPageCount();
  ui.showPosts(posts, currUser, currPageNum, totPageCount);
  ui.welcomeUser(currUser);
  addEventListnerToPosts();
}

async function addEventListnerToPosts() {
  const htmlCollection = document.getElementsByClassName("post");
  Array.from(htmlCollection).forEach((post) =>
    post.addEventListener("click", async (e) => {
      if (e.target.classList.contains("fas")) {
        return;
      }
      const currPost = await postService.getPostById(post.id);
      ui.showPostModal(currPost);
    })
  );
}
