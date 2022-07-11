import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword
 } from 'firebase/auth'

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

// init authentication
const auth = getAuth()

// collection ref
const colRef = collection(db, 'Books')

// Queries
const q = query(colRef, orderBy('createdAt'))

// get collection data invoking the getdocs function

// getDocs(colRef)
//   .then((snapshot) => {
//     let books = []
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(books);
//   })
//   .catch(err => {
//     console.log(err.message);
//   })

// Below is an alternative to this....

// real time collection data

onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  });
  console.log(books); 
})

  // adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', e => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addBookForm.reset();
  })

})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', e => {
  e.preventDefault();

  const docRef = doc(db, 'Books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })

})

// get a single document
const docRef = doc(db, 'Books', '0lYuV3Em0UGuK6EBzixw')

// getDoc(docRef)
//   .then((doc) => {
//     console.log(doc.data(), doc.id);
//   })
//   .catch((err) => {
//     console.log(err, err.message);
//   })

// real time listener for a single document
onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
})

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', e => {
  e.preventDefault()

  const docRef = doc(db, 'Books', updateForm.id.value)

  updateDoc(docRef, {
    author: "Andrew wommack"
  })
  .then(() => {
    updateForm.reset()
  })

})

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', e => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value
 
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('User created:', cred.user);
      signupForm.reset()
    })
    .catch((err) => {
      console.log(err.message);
    })

})

// Logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('The user Logged out');
    })
    .catch((err) => {
      console.log(err.message);
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', e => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('The user is Logged in', cred.user);
    })
    .catch((err) => {
      console.log(err.message);
    })

})