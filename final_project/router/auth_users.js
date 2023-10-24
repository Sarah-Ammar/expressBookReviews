const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
  let users2 = users.filter((user) => {
    return user.username === username
  });
  if(users2.length > 0) {
    return true;
  } else {
    return false;
  }
  }


const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validAuthUsers = users.filter((user) =>{ return (user.username === username && user.password === password)
});
if (validAuthUsers.length > 0 ) {
  return true;
} else { return false;
}
}


//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
const isbn = req.params.isbn;
username = req.query.username; //I used const, let, and var, they were constant all the time.

const review = req.query.review;

if(isValid(username))
{ 
  books[isbn].reviews[username] = review;  //here: the square brackets helped to access the value of "username"
  return res.status(200).send("Review added succesfully");
}
else {
  return res.status(404).json({message: "User was not found"});    
}
 
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  username = req.query.username;

  
  if(isValid(username))
  { 
    books[isbn].reviews[username] = '';
    return res.status(200).send("Review deleted succesfully");
  }
  else {
    return res.status(404).json({message: "User was not found"});    
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
