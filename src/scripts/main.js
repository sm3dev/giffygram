import { getUsers } from "./data/DataManager.js";

const allUsers = getUsers().then(apiUsers => {
console.log("All the users are as follows: ", apiUsers)
})

console.log("oh nowwwww", allUsers);