import { signInWithEmailAndPassword } from "firebase/auth";
import * as React from "react";
import { auth } from "../config/firebaseConfig";
import GoogleLogIn from "../components/Login/GoogleLogIn";
import { getUserByEmail, postUserThunk } from "../services/loginServices";
import { v1 as uuidv1 } from "uuid";
import { useAppDispatch } from "../state/store";
import { IUser } from "../state/slice/loginSlice";

interface ILoginProps {}

const LoginPage: React.FunctionComponent<ILoginProps> = (props) => {
  const [email, setUserEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useAppDispatch();

  const logInForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Logged in
          //If the logged in is succesfull you will acces this part of teh code where you will
          //get a lot of information about the user that have logged in
          const user = userCredential.user;

          const actualUser = await getUserByEmail(email);
          console.log("**** user credentials ****");
          console.log(userCredential);
          console.log("**** user ***");
          console.log(user);

          dispatch(
            postUserThunk({
              uid: user.uid,
              userToken: uuidv1(),
              userName: actualUser.userName,
              userImage: actualUser.userImage,
              userEmail: user.email,
              userRol: actualUser.userRol,
            } as IUser)
          );

          /*Whit the information of the user you can populate an state that is mainly focused on 
        holding the information of the user that is logged in*/
          // ...
        })
        .catch((error) => {
          //If the logged in is not succesfull yu will get to this part and with the message you can tell
          //the user what went wrong
          const errorMessage = error.message;
          console.log("*** Log in error ***");
          console.log(errorMessage);
        });

      setPassword("");
      setUserEmail("");
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <form>
        <label htmlFor="email">Email</label>
        <br />
        <input
          onChange={(e) => setUserEmail(e.target.value)}
          type="text"
          name="email"
          value={email}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          value={password}
        />
        <br />
        <button onClick={(e) => logInForm(e)}>Log In</button>
        <br />
      </form>
      <GoogleLogIn />
    </div>
  );
};

export default LoginPage;
