import React, { useEffect, useRef, useState } from "react";
import { checkValidData } from "../../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

import "../../App.css";
const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  const handleToggleForm = () => {
    setIsSignup(!isSignup);
  };
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    // signin / signup
    if (isSignup) {
      // signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            // photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = user;
              // here will update the store
              dispatch(
                setUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  // photoURL: photoURL,
                })
              );
              // Profile updated!
              // ...

              navigate("/");
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error);
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user, "user in login routeeeee");
          const { uid, email, displayName } = user;
          dispatch(
            setUser({
              uid,
              email,
              displayName,
            })
          );
          navigate("/");

          alert("loged in");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };

  return (
    <>
      <div className="relative h-screen overflow-x-hidden ">
        {/* <Head /> */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bgx-image">
          <div
            // src="https://assets.nflxext.com/ffe/siteui/vlv3/04bef84d-51f6-401e-9b8e-4a521cbce3c5/null/IN-en-20240903-TRIFECTA-perspective_0d3aac9c-578f-4e3c-8aa8-bbf4a392269b_large.jpg"
            // alt="bg-image"
            className="object-cover w-full h-[100vh] bg-slate-500"
          />
        </div>

        <form
          className={`absolute bg-black w-full max-w-sm md:max-w-md p-8 md:p-12 mt-20 mx-auto right-0 left-0 text-white bg-opacity-70 rounded-lg ${
            isSignup ? "signup-form" : "login-form"
          }`}
        >
          <h1 className="py-4 text-3xl font-bold">
            {isSignup ? "Sign Up" : "Sign In"}
          </h1>
          {isSignup && (
            // Signup form fields

            <input
              type="text"
              placeholder="Name"
              ref={name}
              className="w-full p-4 my-4 bg-gray-700"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="w-full p-4 my-4 bg-gray-700"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-4 my-4 bg-gray-700"
          />
          <p className="text-sm text-red-500 ">{errorMessage}</p>
          <button
            className="w-full p-4 my-6 bg-red-500 rounded-lg"
            onClick={handleButtonClick}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>

          <p className="py-6">
            {isSignup ? "Already have an account?" : "New to Youtube?"}
            <span
              className="text-red-700 cursor-pointer ms-1"
              onClick={handleToggleForm}
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
