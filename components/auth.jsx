import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from 'react-bootstrap/Button';
//import { InputGroup } from 'react-bootstrap';
import './loginSection.css';

export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const auth = firebase.auth();
    const [user] = useAuthState(auth);

    console.log(auth?.currentUser?.email);

    return (
        <>                  <div className = "loginContainer">   
                                {user ? <LogOff /> : <SignIn />} 
                            </div>
        </>
                        
                
    );
};
function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const signIn = async() => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        }catch (err){
            console.log(err);
        }
    };

    console.log(auth?.currentUser?.email);

    const signInWithGoogle = async() => {
        try {
            await signInWithPopup(auth, googleProvider);
        }catch(err){
            console.log(err);
        }
    };
    return (
        <>
        <div className="buttonTopContainer">
             <input className = "loginInput" placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
            <input className = "loginInput" placeholder="Password..." 
            type= "password"
            onChange={(e) => setPassword(e.target.value)}/>
            <Button className="loginButton" onClick={signIn}>Sign In</Button>
           
           <Button className="loginButtonGoogle" onClick={signInWithGoogle}> Sign in With Google</Button>
        </div>
        
        </>
    
    )
}
function LogOff(){
    const logOut = async () => {
        try {
            await signOut(auth);
        }catch(err){
            console.log(err);
        }
    }
    return(
        <>
             <Button className="loginButton" onClick={logOut}> Logout</Button>
        </>
    )
}