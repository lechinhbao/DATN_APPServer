
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA6zZnfw7622INzyu-CDlTPtO6Nr7C5JTg",
    authDomain: "bagstore-531c5.firebaseapp.com",
    projectId: "bagstore-531c5",
    storageBucket: "bagstore-531c5.appspot.com",
    messagingSenderId: "853066326744",
    appId: "1:853066326744:web:5114eda7c9e5c4fdceedad",
    measurementId: "G-LEMJC9JF8H"
  };
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const uploadImage = async (files: any, cate: any) => {
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `${cate}/` + files.originalname);
    const uploadTask = await uploadBytesResumable(storageRef, files.buffer);
    let url = getDownloadURL(uploadTask.ref).then((downloadURL) => {
        return downloadURL;
    });
    return url;
    // Listen for state changes, errors, and completion of the upload.
};
export default uploadImage;