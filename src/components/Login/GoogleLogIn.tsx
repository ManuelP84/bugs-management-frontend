import { GoogleAuthProvider, OAuthCredential, signInWithPopup } from "firebase/auth";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLogged, getUser, IUser } from "../../state/slice/loginSlice";
import { auth } from "../../config/firebaseConfig";

interface IGoogleLogInProps {}

const providerGoogleAuth = new GoogleAuthProvider();

const GoogleLogIn: React.FunctionComponent<IGoogleLogInProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInWithGoogleButton = () => {
    signInWithPopup(auth, providerGoogleAuth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential: OAuthCredential | null =
          GoogleAuthProvider.credentialFromResult(result);

        const token = credential!.accessToken;

        // The signed-in user info.
        //If the logged in is succesfull you will acces this part of the code where you will
        //get a lot of information about the user that have logged in
        const user = result.user;

        /*Whit the information of the user you can populate an state that is mainly focused on 
                  holding the information of the user that is logged in*/

        
        dispatch(getUser({uid: user.uid, userName: user.displayName, userImage: user.photoURL} as IUser));
        dispatch(getLogged(true))

        navigate("/stock");

        // ...
      })
      .catch((error:any) => {
        //If the logged in is not succesfull yu will get to this part and with the message you can tell
        //the user what went wrong

        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div>
      <button onClick={signInWithGoogleButton}> Log in with Google </button>
    </div>
  );
};

export default GoogleLogIn;
