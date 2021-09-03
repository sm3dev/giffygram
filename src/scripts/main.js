import { getUsers, getPosts, getMessages } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";


const showNavBar = () => {
  //Get a reference to the location on the DOM where the nav will display
  const navElement = document.querySelector("nav");
navElement.innerHTML = NavBar();
}

const allUsers = getUsers().then((apiUsers) => {
  console.log("All the users are as follows: ", apiUsers);
});

const allMessages = getMessages().then((apiMessages) => {
  console.log("Got all the messages now too!", apiMessages);
});

const showPostList = () => {
  //Get a reference to the location on the DOM where the list will display
  const postElement = document.querySelector(".postList");
  getPosts().then((allPosts) => {
    postElement.innerHTML = PostList(allPosts);
  });
};

const startGiffyGram = () => {
  showPostList();
  showNavBar();

  getUsers().then((data) => {
    console.log("User Data", data);
  });
};

startGiffyGram();

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", event => {
  console.log("what was clicked", event.target);
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
	}
})