export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
   
}