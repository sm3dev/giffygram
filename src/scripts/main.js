import { getUsers } from "./data/DataManager.js";
import { getPosts } from "./data/DataManager.js";
import { getMessages } from "./data/DataManager.js";

const allUsers = getUsers().then((apiUsers) => {
  console.log("All the users are as follows: ", apiUsers);
});

const allPosts = getPosts().then((apiPosts) => {
  console.log("All the posts are here now:", apiPosts);
});

const allMessages = getMessages().then((apiMessages) => {
  console.log("Got all the messages now too!", apiMessages);
});

const startGiffyGram = () => {
  const postElement = document.querySelector(".postList");
  postElement.innerHTML = "Hello, Cohort 51!";
};

// Are you defining the function here or invoking it?
startGiffyGram();

getUsers().then((data) => {
  console.log("User Data", data);
});
