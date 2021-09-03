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

export const getPosts = () => {
  return fetch("http://localhost:8088/posts")
    .then(response => response.json())
    .then((parsedResponse) => {
      // do something with response here
      return parsedResponse;
    });
};

export const getMessages = () => {
  return fetch("http://localhost:8088/messages").then(response =>
    response.json()
  );
};
