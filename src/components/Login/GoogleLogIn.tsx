import {
  GoogleAuthProvider,
  OAuthCredential,
  signInWithPopup,
} from "firebase/auth";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getLogged, IUser } from "../../state/slice/loginSlice";
import { auth } from "../../config/firebaseConfig";
import { getUserByEmail, postUserThunk} from "../../services/loginServices";
import { v1 as uuidv1 } from "uuid";
import { useAppDispatch } from "../../state/store";
import { FaGoogle } from "react-icons/fa";


interface IGoogleLogInProps {}

const providerGoogleAuth = new GoogleAuthProvider();

const GoogleLogIn: React.FunctionComponent<IGoogleLogInProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getActualRol = async (email: string) => {
    const userStored = await getUserByEmail(email as string);
    return userStored.userRol;
  };

  const signInWithGoogleButton = () => {
    signInWithPopup(auth, providerGoogleAuth)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential: OAuthCredential | null =
          GoogleAuthProvider.credentialFromResult(result);

        const token = credential!.accessToken;

        // The signed-in user info.
        //If the logged in is succesfull you will acces this part of the code where you will
        //get a lot of information about the user that have logged in
        const user = result.user;

        const rol = await getActualRol(user.email as string);

        

        /*Whit the information of the user you can populate an state that is mainly focused on 
                  holding the information of the user that is logged in*/

        dispatch(
          postUserThunk({
            uid: user.uid,
            userToken: uuidv1(),
            userName: user.displayName,
            userImage: user.photoURL,
            userEmail: user.email,
            userRol: rol,
          } as IUser)
        );

        dispatch(
          getLogged(true)
        )

          navigate("/project")
        // ...
      })
      .catch((error: any) => {
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
    <div className="login100-social-item bg3">
      <button type="button" className="fa-google" onClick={signInWithGoogleButton}> <FaGoogle style={{color: "white", fontSize: "20px", marginRight: "10px"}}/> Sing Up with Google </button>
    </div>
  );
};

export default GoogleLogIn;
