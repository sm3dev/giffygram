const loggedInUser = {
  id: 1,
  name: "Michael Wright",
  email: "mrwry7@gmail.pizza",
};

export const getLoggedInUser = () => {
  return loggedInUser;
};

export const getUsers = () => {
  return fetch("http://localhost:8088/users").then((response) =>
    response.json()
  );
};

let postCollection = [];

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];
};

export const getPosts = () => {
  return fetch("http://localhost:8088/posts")
    .then((response) => response.json())
    .then((parsedResponse) => {
      postCollection = parsedResponse;
      console.log("Post collection is this:", postCollection);
      return parsedResponse;
    });
};

export const getMessages = () => {
  return fetch("http://localhost:8088/messages").then((response) =>
    response.json()
  );
};

export const createPost = (postObj) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObj),
  }).then((response) => response.json());
};

// This method will retrieve a single post. This ensures we have the latest and greatest information from the database.
export const getSinglePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`)
    .then(response => response.json())
}

// This method will update a post in the database. We will use the database verb PUT in the fetch call. This does not create a new item. This replaces the data with the matching id.
export const updatePost = postObj => {
  return fetch(`http://localhost:8088/posts/${postObj.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj)

  })
      .then(response => response.json())
      .then(getPosts)
}

// fetch call delete a post
export const deletePost = postId => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }

  })
      .then(response => response.json())
      .then(getPosts)
}
