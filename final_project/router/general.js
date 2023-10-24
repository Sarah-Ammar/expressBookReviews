const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

//start of async edit using Axios:
const axios = require('axios').default;


const connectToURL = (url)=>{
    const req = axios.get(url);
  
    req.then(resp => {
        console.log("Fulfilled")
        console.log(resp.data);
    })
    .catch(err => {
        console.log("Rejected for url "+url)
        console.log(err.toString())
    });
}




// Get the book list available in the shop
/*public_users.get('/',function (req, res) {
  //Write your code here
   res.send(books);
});*/

public_users.get('/', async (req, res) => {
  //Write your code here
 await res.send(books);
  
});

// Get book details based on ISBN  with promises
public_users.get('/books/isbn/:isbn',function (req, res) {
  const getBooksPromise = new Promise((resolve, reject) => {
  const isbn = req.params.isbn;

      if (isbn <= 10) {
      resolve(res.send(books[isbn]));
  }
      else {
          reject(res.send('ISBN not found'));
      }
  });
  getBooksPromise.
      then(function(){
          console.log("Promise for Task 11 is resolved");
 }).
      catch(function () { 
              console.log('ISBN not found');
});

});


// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  console.log(author.length);

  if (author.length === 0) {
    res.send("Anything!");
  }

  const byAuthorPromise = new Promise((resolve, reject) => {
  
    if (author.length > 0) {
      const searchName = author.replaceAll('+', ' ');
      for (i = 1; i <= 10; i++) {
        if (books[i].author === searchName) { resolve(res.send(books[i])); }
      }
      reject(res.send('Author not found'));
  }
  else if (req.params.author == und)
    {    res.send('Author not found')}
    
  });
  byAuthorPromise.then(function(){
    console.log("Promise for Task 12 is resolved");
}).
catch(function () { 
        console.log('Author not found');
});
  });
  //const firstIndex = author.indexOf(' ');
  //const firstName = author.substring(0, firstIndex);
  //const lastName = author.substring(firstIndex, author.length);
  


// Get all books based on title
public_users.get('/title/:title', function (req, res) {

  const byTitlePromise = new Promise((resolve, reject) => {
    const title1 = req.params.title;
  const title = title1.replace('+', ' ');
    if (title1) {
      for (i = 1; i <= 10; i++) {
        if (books[i].title === title) { resolve(res.send(books[i])); }
      }
  }
      else {
          reject(res.send('Tilte not found'));
      }
  });
   byTitlePromise.then(function(){
    console.log("Promise for Task 13 is resolved");
}).
catch(function () { 
        console.log('Title not found');
  });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  isbn = req.params.isbn;
  { res.send(books[isbn].reviews); }
}
);

module.exports.general = public_users;
