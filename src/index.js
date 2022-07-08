import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDBGHOZbYEQz5ibnxTrzNpJFNCCYM5emDo",
    authDomain: "fir-9-practice-69709.firebaseapp.com",
    projectId: "fir-9-practice-69709",
    storageBucket: "fir-9-practice-69709.appspot.com",
    messagingSenderId: "668309337818",
    appId: "1:668309337818:web:b44d2ab70eec0b4df657e3"
  }

//   init firebase app
  initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'Books')

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books);
  })
  .catch(err => {
    console.log(err.message);
  })

  // adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', e => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value
  })
  .then(() => {
    addBookForm.reset();
  })

})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', e => {
  e.preventDefault();

  const docRef = doc(db, 'Books',  deleteBookForm.id.value);

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset();
    })


})