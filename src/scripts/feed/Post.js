import { getLoggedInUser, getLikes } from "../data/DataManager.js";
//this needs to be located above the Post declaration
//this could also be imported to this module
const getNumberOfLikes = (postId) => {
    getLikes(postId)
    .then(response => {
      document.querySelector(`#likes__${postId}`).innerHTML = `👍 ${response.length}`;
    })
  }

export const Post = (postObject) => {

  const userIdOfLoggedInUser = getLoggedInUser()["id"];

  const dateString = new Date(postObject.dateCreated);
  const formattedDate = dateString.toDateString();

  // I need a conditional that checks if a current post was created by a userId.
  // If the logged in user created the current post, show the edit and delete buttons
  // If the logged in user did not create the current post, do not show the edit and delete buttons

  if (postObject.user.id === userIdOfLoggedInUser) {
    // 1. Check that post author and the current logged in user match

    // If the logged in user created the current post, return this form with Edit and Delete buttons visible
    return `<section id="post--${postObject.id}" class="post border-radius">
    <header>
        <h2 class="post__titleEntry">${postObject.title}</h2>
    </header>
    <img class="post__image border-radius" src="${postObject.imageURL}" />
    <section class="post-description__block">
        <p class="post-description__text">${postObject.description}</p>
    </section>
    <section class="user-like_block">
        <button id="like__${postObject.id}">Like</button>
        <p id="likes__${postObject.id}"> ${getNumberOfLikes(postObject.id)}</p>
    </section>
    <section class="author-dated-posted__block">
        <section class="post__author"><span class="post-author__text">Create by: ${postObject.user.name}</span></section>
        <section class="post__created-date">Posted: ${formattedDate}</section>
    </section>
    <div class="button__container">
    <button class="edit__button inside-post__button" id="edit__${postObject.id}">Edit</button>
    <button id="delete__${postObject.id}">Delete</button>
    </div>
</section>`;
  } else {
    return `<section id="post--${postObject.id}" class="post border-radius">
    <header>
        <h2 class="post__titleEntry">${postObject.title}</h2>
    </header>
    <img class="post__image border-radius" src="${postObject.imageURL}" />
    <section class="post-description__block">
        <p class="post-description__text">${postObject.description}</p>
    </section>
    <section class="user-like_block">
        <button id="like__${postObject.id}">Like</button>
        <p id="likes__${postObject.id}"> ${getNumberOfLikes(postObject.id)}</p>
    </section>
    <section class="author-dated-posted__block">
        <section class="post__author"><span class="post-author__text">Create by: ${postObject.user.name}</span></section>
        <section class="post__created-date">Posted: ${formattedDate}</section>
    </section>
    <div class="button__container">
    <button disabled class="edit__button inside-post__button" id="edit__${postObject.id}">Edit</button>
    <button disabled id="delete__${postObject.id}">Delete</button>
    </div>
</section>`;
  }
};

//   reference: https://github.com/nss-day-cohort-51/client-side-mastery/blob/main/book-2-giffygram/chapters/47-GG-PostList-Post.md
// Displaying More Properties as HTML
// In the next couple chapters, you will see more comprehensive code for displaying the properties of a Post as HTML, but you are encouraged to give it a shot first.

// Open src/scripts/feed/Post.js and add more HTML structure, and interpolate the description, timestamp, and/or the userId property in it.
