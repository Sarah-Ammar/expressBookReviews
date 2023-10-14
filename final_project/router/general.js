const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
const author = req.params.author;
const searchName = author.replace('+', ' ');
//const firstIndex = author.indexOf(' ');
//const firstName = author.substring(0, firstIndex);
//const lastName = author.substring(firstIndex, author.length);
 for(i = 1; i <= 10; i++) {
  if (books[i].author === searchName)
  {res.send(books[i]);} 
 }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title1 = req.params.title;
const title = title1.replace('+', ' ');
 for(i = 1; i <= 10; i++) {
  if (books[i].title === title)
  {res.send(books[i]);} 
 }

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
isbn = req.params.isbn;
    {res.send(books[isbn].reviews);} 
   }
);

module.exports.general = public_users;
