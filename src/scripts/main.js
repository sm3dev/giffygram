import {
  getUsers,
  getPosts,
  getMessages,
  usePostCollection,
  createPost,
} from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";

const showNavBar = () => {
  //Get a reference to the location on the DOM where the nav will display
  const navElement = document.querySelector("nav");
  navElement.innerHTML = NavBar();
};
const showFooter = () => {
  //Get a reference to the location on the DOM where the footer will display
  const footerElement = document.querySelector("footer");
  footerElement.innerHTML = Footer();
};

const showPostEntry = () => {
  const postEntryElement = document.querySelector(".entryForm");
  postEntryElement.innerHTML = PostEntry();
};

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
  showNavBar();
  showPostEntry();
  showPostList();
  showFooter();

  getUsers().then((data) => {
    console.log("User Data", data);
  });
};

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", (event) => {
  console.log("what was clicked", event.target);
  if (event.target.id === "logout") {
    console.log("You clicked on logout");
  }
});

applicationElement.addEventListener("click", (event) => {
  if (event.target.id.startsWith("edit")) {
    // The split() method divides a String into an ordered list of substrings, puts these substrings into an array, and returns the array.
    console.log("post clicked", event.target.id.split("--"));

    // .split("--")[1] -- This uses the limit of 1
    // Limit = A non-negative integer specifying a limit on the number of substrings to be included in the array. If provided, splits the string at each occurrence of the specified separator, but stops when limit entries have been placed in the array. Any leftover text is not included in the array at all.
    console.log("the id is", event.target.id.split("--")[1]);
  }
});

applicationElement.addEventListener("change", (event) => {
  if (event.target.id === "yearSelection") {
    const yearAsNumber = parseInt(event.target.value);
    console.log(`User wants to see posts since ${yearAsNumber}`);
    //invoke a filter function passing the year as an argument
    showFilteredPosts(yearAsNumber);
  }
});

const showFilteredPosts = (year) => {
  //get a copy of the post collection
  const epoch = Date.parse(`01/01/${year}`);
  //filter the data
  const filteredData = usePostCollection().filter((singlePost) => {
    if (singlePost.dateCreated >= epoch) {
      return singlePost;
    }
  });
  const postElement = document.querySelector(".postList");
  postElement.innerHTML = PostList(filteredData);
};

applicationElement.addEventListener("click", (event) => {
  if (event.target.id === "newPost__cancel") {
    //clear the input fields
  }
});

applicationElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id === "newPost__submit") {
    //collect the input values into an object to post to the DB
    const title = document.querySelector("input[name='postTitle']").value;
    const url = document.querySelector("input[name='postURL']").value;
    const description = document.querySelector(
      "textarea[name='postDescription']"
    ).value;
    //we have not created a user yet - for now, we will hard code `1`.
    //we can add the current time as well
    const postObject = {
      title: title,
      imageURL: url,
      description: description,
      authorId: 1,
      dateCreated: Date.now(),
    };

    // be sure to import from the DataManager
    createPost(postObject).then((dbResponse) => {
      showPostList();
    });
  }
});

startGiffyGram();
