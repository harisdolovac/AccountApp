// import React, { useState } from 'react'
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import "./SignUpOrSignIn.css"
// import { app } from "../../Components/Firebase/firebaseConfig"
// import { useNavigate } from "react-router-dom";




// const SignUp = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [userRegistered, setUserRegistered] = useState(false)


//     let navigate = useNavigate();
//     const auth = getAuth(app);
//     const handleSubmit = (event) => {
//         event.preventDefault();

//         createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 // Signed in
//                 const user = userCredential.user;
//                 // ...
//                 alert("You created an account")
//                 console.log(user);
//                 return navigate("/");
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 alert(errorMessage);
//                 // ..
//             });
//     };

//     const handleSubmitSignIn = (event) => {
//         event.preventDefault();
//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 // Signed in
//                 const user = userCredential.user;
//                 // ...
//                 alert("You are logged in")
//                 console.log(user);
//                 return navigate("/");
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;

//                 alert(errorMessage)
//                 console.log(errorCode);
//             });
//     }



//     return (
//         <>

//             {userRegistered ?



//                 (<div className='SignUpWrapper' >
//                     <form onSubmit={handleSubmit}>
//                         <label htmlFor="email">Email:</label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(event) => setEmail(event.target.value)}
//                         />

//                         <label htmlFor="password">Password:</label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(event) => setPassword(event.target.value)}
//                         />

//                         <button type="submit">Sign Up</button>
//                     </form>
//                     <div>
//                         <button className='buttonSwitch' onClick={() => setUserRegistered(!userRegistered)}>
//                             <h3>  Already registered user?Click here to login</h3>
//                         </button>
//                     </div>
//                 </div >) :

//                 (<div className='SignUpWrapper' >
//                     <form onSubmit={handleSubmitSignIn}>
//                         <label htmlFor="email">Email:</label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(event) => setEmail(event.target.value)}
//                         />

//                         <label htmlFor="password">Password:</label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(event) => setPassword(event.target.value)}
//                         />

//                         <button type="submit">Sign In</button>
//                     </form>
//                     <button className='buttonSwitch' onClick={() => setUserRegistered(!userRegistered)}>
//                         <h3>  You are not registered?Click here to register</h3>
//                     </button>
//                 </div>)

//             }
//         </>
//     )
// }
// export default SignUp
