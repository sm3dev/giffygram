// const loggedInUser = {
//   id: 1,
//   name: "Michael Wright",
//   email: "mrwry7@gmail.pizza",
// };

let loggedInUser = {};

export const setLoggedInUser = (userObj) => {
  loggedInUser = userObj;
};

export const getLoggedInUser = () => {
  return loggedInUser;
};

export const logoutUser = () => {
  loggedInUser = {};
};

export const getUsers = () => {
  return fetch("http://localhost:8088/users").then((response) =>
    response.json()
  );
};

export const loginUser = (userObj) => {
  return fetch(
    `http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`
  )
    .then((response) => response.json())
    .then((parsedUser) => {
      //is there a user?
      console.log("parsedUser", parsedUser); //data is returned as an array
      if (parsedUser.length > 0) {
        setLoggedInUser(parsedUser[0]);
        return getLoggedInUser();
      } else {
        //no user
        return false;
      }
    });
};

export const registerUser = (userObj) => {
  return fetch(`http://localhost:8088/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  })
    .then((response) => response.json())
    .then((parsedUser) => {
      setLoggedInUser(parsedUser);
      return getLoggedInUser();
    });
};

let postCollection = [];

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];
};

// This is commented out because we're using a login version of getPosts()
// export const getPosts = () => {
//   return fetch("http://localhost:8088/posts")
//     .then((response) => response.json())
//     .then((parsedResponse) => {
//       postCollection = parsedResponse;
//       console.log("Post collection is this:", postCollection);
//       return parsedResponse;
//     });
// };

// export const getMessages = () => {
//   return fetch("http://localhost:8088/messages").then((response) =>
//     response.json()
//   );
// };

export const createPost = (postObj) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObj),
  }).then((response) => response.json());
};

// Get posts from a specific user
// Use this for moods and posts in the Daily Journal
export const getPosts = () => {
  const userId = getLoggedInUser().id;
  return fetch(`http://localhost:8088/posts?_expand=user`)
    .then((response) => response.json())
    .then((parsedResponse) => {
      console.log("data with user", parsedResponse);
      postCollection = parsedResponse;
      return parsedResponse;
    });
};

// This method will retrieve a single post. This ensures we have the latest and greatest information from the database.
export const getSinglePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`).then((response) =>
    response.json()
  );
};

// This method will update a post in the database. We will use the database verb PUT in the fetch call. This does not create a new item. This replaces the data with the matching id.
export const updatePost = (postObj) => {
  return fetch(`http://localhost:8088/posts/${postObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObj),
  })
    .then((response) => response.json())
    .then(getPosts);
};

// fetch call delete a post
export const deletePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(getPosts);
};

// fetch call to add new Like object to database
export const postLike = (likeObject) => {
  return fetch(`http://localhost:8088/userLikes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(likeObject),
  })
    .then((response) => response.json())
    .then(getPosts);
};


// fetch call to get the number of Likes
export const getLikes = (postId) => {
  return fetch(`http://localhost:8088/userLikes?postId=${postId}`)
    .then(response => response.json())
}
