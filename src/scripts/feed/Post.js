// import { getUsers, getPosts } from "../data/DataManager.js";

export const Post = (postObject) => {
    const dateString = new Date(postObject.dateCreated);
    const formattedDate = dateString.toDateString();
    // const nameOfUser = (postObj) => {
    //     // tell me the post author user id
    //     const whichUser = postObj.authorId;
    //     // const foundUser = userObj[whichUser + 1].name;
        
    //     // this function needs to return a users.name value
    //     return foundUser;
    // }
    // nameOfUser(postObject, userObject);
    return `<section class="post">
    <header>
        <h2 class="post__titleEntry">${postObject.title}</h2>
    </header>
    <img class="post__image" src="${postObject.imageURL}" />
    <section class="post-description__block">
        <p class="post-description__text">${postObject.description}</p></section>
    <section class="author-dated-posted__block">
        <section class="post__author"><span class="post-author__text">Create by: Name goes here</span></section>
        <section class="post__created-date">Posted: ${formattedDate}</section>
    </section>
    <div><button id="edit--${postObject.id}">Edit</button></div>

</section>`
  }

//   reference: https://github.com/nss-day-cohort-51/client-side-mastery/blob/main/book-2-giffygram/chapters/47-GG-PostList-Post.md
// Displaying More Properties as HTML
// In the next couple chapters, you will see more comprehensive code for displaying the properties of a Post as HTML, but you are encouraged to give it a shot first.

// Open src/scripts/feed/Post.js and add more HTML structure, and interpolate the description, timestamp, and/or the userId property in it.