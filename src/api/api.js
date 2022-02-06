// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  push,
  onValue,
} from "firebase/database";
import {
  getStorage,
  ref as refStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import moment from "moment";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvTGa8WALko8_9N3pevJQm1EN18rICmD0",
  authDomain: "tritter-abb6f.firebaseapp.com",
  databaseURL:
    "https://tritter-abb6f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tritter-abb6f",
  storageBucket: "tritter-abb6f.appspot.com",
  messagingSenderId: "811919630213",
  appId: "1:811919630213:web:0e00e778ae74152fa32eec",
};

// Initialize Firebase
const base = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();
const dbRef = ref(getDatabase());
const storage = getStorage();

export const createPostImage = async (data) => {
  const metadata = {
    contentType: "image/jpeg",
  };

  const storageRef = refStorage(storage, "images/" + data.image.name);
  const uploadTask = uploadBytesResumable(storageRef, data.image, metadata);

  await uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      console.error(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        createPost({ ...data, imageURL: downloadURL });
      });
    }
  );

  return true;
};

const generateColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const getDataUser = async (user) => {
  const response = await get(child(dbRef, `users/${user}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...snapshot.val(), isLogin: true })
        );
        return { ...snapshot.val(), isLogin: true };
      } else {
        localStorage.setItem("user", JSON.stringify({ isLogin: false }));
      }
    })
    .catch((error) => {
      localStorage.setItem("user", JSON.stringify({ isLogin: false }));
    });
  return response;
};

export const checkUser = async () => {
  await onAuthStateChanged(auth, async (user) => {
    if (user) {
      await getDataUser(user.uid);
    } else {
      localStorage.setItem("user", JSON.stringify({ isLogin: false }));
    }
  });
  return true;
};

checkUser();

export const registerUser = (data) => {
  const response = createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  )
    .then(async (userCredential) => {
      const user = {
        uid: userCredential.user.uid,
        userName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        createDate: userCredential.user.metadata.creationTime,
        login: data.login,
        photoURL: "https://pbs.twimg.com/media/C2aFnnsUQAATvzs.png:large",
        color: generateColor(),
      };

      await set(ref(db, "users/" + user.uid), { ...user });
      return { isRegistration: true, user: { ...user, isLogin: true } };
    })
    .catch((e) => {
      return { isRegistration: false, error: e };
    });

  return response;
};

export const loginUser = (data) => {
  const response = signInWithEmailAndPassword(auth, data.email, data.password)
    .then(async (userCredential) => {
      const user = await getDataUser(userCredential.user.uid);
      return { isLogin: true, ...user };
    })
    .catch((error) => {
      return {
        isLogin: false,
        errorCode: error.code,
        errorMessage: error.message,
      };
    });

  return response;
};

export const logOut = () => {
  const response = signOut(auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });

  return response;
};

export const createPost = async (data) => {
  const postListRef = ref(db, "posts");
  const newPostRef = push(postListRef);
  const user = JSON.parse(localStorage.getItem("user"));
  const post = {
    bold: data.bold,
    text: data.text,
    userUid: user.uid,
    createDate: moment().toISOString(),
    imageURL: data.imageURL ? data.imageURL : "",
    user: {
      userName: user.userName,
      photoURL: user.photoURL,
      color: user.color,
      login: user.login,
    },
  };
  await set(newPostRef, post);
  return post;
};

export const getAllPosts = async () => {
  const res = await get(child(dbRef, `posts`)).then((snapshot) => {
    if (snapshot.exists()) {
      const res = snapshot.val();
      const array = Object.keys(res);
      const posts = [];

      array.forEach((id) => {
        posts.unshift({ id, ...res[id] });
      });
      return posts;
    }
  });

  return res;
};

getAllPosts();

export const dinamycGetAllPosts = async (callback) => {
  const starCountRef = ref(db, "posts/");
  await onValue(starCountRef, (snapshot) => {
    snapshot.val();
    callback(snapshot.val());
  });
};

export const getPost = async (id) => {
  const response = await get(child(dbRef, `posts/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const res = snapshot.val();
      const comments = [];
      if (res.comments) {
        const array = Object.keys(res.comments);
        
        array.forEach((id) => {
          comments.unshift({ id, ...res.comments[id] });
        });
      }

      return { ...res, comments };
    }
  });

  return response;
};

export const createComment = async (data) => {
  const postListRef = ref(db, `posts/${data.id}/comments`);
  const newPostRef = push(postListRef);
  const user = JSON.parse(localStorage.getItem("user"));
  const comment = {
    bold: data.bold,
    text: data.text,
    userUid: user.uid,
    createDate: moment().toISOString(),
    imageURL: data.imageURL ? data.imageURL : "",
    user: {
      userName: user.userName,
      photoURL: user.photoURL,
      color: user.color,
      login: user.login,
    },
  };
  await set(newPostRef, comment);
  return comment;
};

export const createCommentImage = async (data) => {
  const metadata = {
    contentType: "image/jpeg",
  };

  const storageRef = refStorage(storage, "images/" + data.photo.name);
  const uploadTask = uploadBytesResumable(storageRef, data.photo, metadata);

  await uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      console.error(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        createComment({ ...data, imageURL: downloadURL });
      });
    }
  );

  return true;
};

export const getProfile = async (id) => {
  const response = await get(child(dbRef, `users/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const res = snapshot.val();
      return res
    }
  });

  return response;
};

export const getProfilePosts = async (uid) => {
  const res = await get(child(dbRef, `posts`)).then((snapshot) => {
    if (snapshot.exists()) {
      const res = snapshot.val();
      const array = Object.keys(res);
      const posts = [];

      array.forEach((id) => {
        res[id].userUid === uid &&
        posts.unshift({ id, ...res[id] });
      });
      return posts;
    }
  });

  return res;
};
