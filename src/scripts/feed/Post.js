export const Post = (postObject) => {
    return `
      <section class="post">
        <header>
            <h2 class="post__tiEntrytle">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
      </section>
    `
  }

//   reference: https://github.com/nss-day-cohort-51/client-side-mastery/blob/main/book-2-giffygram/chapters/47-GG-PostList-Post.md
// Displaying More Properties as HTML
// In the next couple chapters, you will see more comprehensive code for displaying the properties of a Post as HTML, but you are encouraged to give it a shot first.

// Open src/scripts/feed/Post.js and add more HTML structure, and interpolate the description, timestamp, and/or the userId property in it.