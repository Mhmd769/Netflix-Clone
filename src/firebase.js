import { initializeApp } from "firebase/app";

import { createUserWithEmailAndPassword,
         getAuth,
        signInWithEmailAndPassword, 
        signOut} from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { addDoc,
         collection,
         getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCfL9puJ5L64GrASPK2o971uMY8LrDKmtg",
  authDomain: "netflix-clone-a36a0.firebaseapp.com",
  projectId: "netflix-clone-a36a0",
  storageBucket: "netflix-clone-a36a0.appspot.com",
  messagingSenderId: "1087545930346",
  appId: "1:1087545930346:web:754cab5d26cdbec6ab1013"
};

const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
      const res =  await createUserWithEmailAndPassword(auth,email,password);
      
      const user = res.user;
      await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider: "locall",
        email,
      });
      toast.success(email+" "+"SignUp in Successfully")
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email,password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password);
       toast.success(email+" "+ "Logged in Successfully")
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        }
}

const logout = ()=>{
    signOut(auth);
    toast.success("Sing Out Successfully")

}

export {auth,db,login,signup,logout};