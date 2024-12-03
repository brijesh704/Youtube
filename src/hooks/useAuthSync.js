import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setUser, removeUser } from "../features/userSlice";
import { auth } from "../utils/firebase";

const useAuthSync = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          setUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate("/");
      } else {
        dispatch(removeUser());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);
  return loading;
};

export default useAuthSync;
