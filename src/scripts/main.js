import {
  getUsers,
  getPosts,
  getMessages,
  usePostCollection,
  createPost,
  getSinglePost,
  getLoggedInUser,
  updatePost,
  deletePost,
  logoutUser,
  setLoggedInUser,
  loginUser,
  registerUser
} from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";
import { PostEdit } from "./feed/PostEdit.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { LoginForm } from "./auth/LoginForm.js";

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

//Check for a user: check that a user is created
const checkForUser = () => {
  if (sessionStorage.getItem("user")) {
    //this is expecting an object. Need to fix
    setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
    startGiffyGram();
  } else {
    //show login/register
    showLoginRegister();
  }
};

// This displays the login and registration forms in the DOM. It is invoked in checkForUser()
const showLoginRegister = () => {
  showNavBar();
  const entryElement = document.querySelector(".entryForm");

  //template strings can be used here too
  entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;

  //make sure the post list is cleared out too
const postElement = document.querySelector(".postList");
postElement.innerHTML = "";
}

// Listeners start here ***********************************************

// this is the event listener for the main.giffygram elemement
const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", (event) => {
  console.log("what was clicked", event.target);
  if (event.target.id === "logout") {
    console.log("You clicked on logout");
  }
});

// This grabs listens for the Edit Button click
applicationElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id.startsWith("edit")) {
    const postId = event.target.id.split("__")[1];
    getSinglePost(postId).then((response) => {
      showEdit(response);
    });
  }
});

// This function takes a post object and writes it's info into the HTML template inside the PostEdit function
const showEdit = (postObj) => {
  const entryElement = document.querySelector(".entryForm");
  entryElement.innerHTML = PostEdit(postObj);
};

// Submit an Editted post
applicationElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id.startsWith("updatePost")) {
    const postId = event.target.id.split("__")[1];
    //collect all the details into an object
    const title = document.querySelector("input[name='postTitle']").value;
    const url = document.querySelector("input[name='postURL']").value;
    const description = document.querySelector(
      "textarea[name='postDescription']"
    ).value;
    const dateCreated = document.querySelector("input[name='postTime']").value;

    const postObject = {
      title: title,
      imageURL: url,
      description: description,
      userId: getLoggedInUser().id,
      dateCreated: parseInt(dateCreated),
      id: parseInt(postId),
    };

    updatePost(postObject)
      .then((response) => {
        showPostList();
      })
      .then(showPostEntry());
  }
});

// Cancel button
applicationElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id.endsWith("cancel")) {
    // const postId = event.target.id.split("__")[1];
    showPostEntry();
  }
});

// Filter
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

// Create a new post
applicationElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id === "newPost__submit") {
    //collect the input values into an object to post to the DB
    const title = document.querySelector("input[name='postTitle']").value;
    const url = document.querySelector("input[name='postURL']").value;
    const description = document.querySelector(
      "textarea[name='postDescription']"
    ).value;
    //we can add the current time as well
    const postObject = {
      title: title,
      imageURL: url,
      description: description,
      userId: getLoggedInUser().id,
      dateCreated: Date.now(),
    };

    // be sure to import from the DataManager
    createPost(postObject).then((dbResponse) => {
      showPostList();
    });
  }
});

// Delete post event listener
applicationElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id.startsWith("delete")) {
    const postId = event.target.id.split("__")[1];
    deletePost(postId).then((response) => {
      showPostList();
    });
  }
});

// Logout event listener
applicationElement.addEventListener("click", (event) => {
  if (event.target.id === "logout") {
    logoutUser();
    console.log(getLoggedInUser());
    sessionStorage.clear();
    checkForUser();
    }
});

// Login event listener
// This allows a user object to be created when a user submits the login form
applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id === "login__submit") {
    //collect all the details into an object
    const userObject = {
      name: document.querySelector("input[name='name']").value,
      email: document.querySelector("input[name='email']").value
    }
    loginUser(userObject)
    .then(dbUserObj => {
      if(dbUserObj){
        sessionStorage.setItem("user", JSON.stringify(dbUserObj));
        startGiffyGram();
      }else {
        //got a false value - no user
        const entryElement = document.querySelector(".entryForm");
        entryElement.innerHTML = `<p class="center">WHOA, Tiger! That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
      }
    })
  }
})

// Event listener for new user registration
applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id === "register__submit") {
    //collect all the details into an object
    const userObject = {
      name: document.querySelector("input[name='registerName']").value,
      email: document.querySelector("input[name='registerEmail']").value,
      dateJoined: Date.now()
    }
    registerUser(userObject)
    .then(dbUserObj => {
      sessionStorage.setItem("user", JSON.stringify(dbUserObj));
      startGiffyGram();
    })
  }
})




// The function of the giffygram app
// It gets run inside a conditional of checkForUser()
const startGiffyGram = () => {
  showNavBar();
  showPostEntry();
  showPostList();
  showFooter();
  getUsers().then((data) => {
    console.log("User Data", data);
  });
  console.log("who is the current logged in user?", getLoggedInUser());
};

checkForUser();
