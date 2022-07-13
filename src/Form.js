import { Button, Input, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDatabase, ref, set, onValue } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { accessUsers } from "./Users";

const firebaseConfig = {
  apiKey: "AIzaSyDt7aP1noE1jL0UJgtpBdyWPFWiXyhNZl8",
  authDomain: "test-b42cb.firebaseapp.com",
  databaseURL: "https://test-b42cb-default-rtdb.firebaseio.com",
  projectId: "test-b42cb",
  storageBucket: "test-b42cb.appspot.com",
  messagingSenderId: "1064024615875",
  appId: "1:1064024615875:web:02ee292c904c897b9d2b76"
};

export default function Form() {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState("");
  const [access, setAccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (access) navigate("/users");

  useEffect(() => {
    const users = ref(database, "users");
    onValue(users, (snapshot) => {
      const dataUsers = snapshot.val();
      setData(Object.values(dataUsers).map((item) => Object.values(item)));
    });
  });

  const GoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setAccess(!!result.user);
      })
      .catch((error) => console.log(error.message));
    dispatch(accessUsers(data));
  };

  const CreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCreate) => {
        const user = userCreate.user;
        set(ref(database, "users/" + text), {
          email: email,
          password: password,
          text: text
        });
        console.log(user);
      })
      .catch((error) => console.log(error.message));
  };

  const LoginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userLogin) => {
        setAccess(!!userLogin.user);
      })
      .catch((error) => console.log(error.message));
    dispatch(accessUsers(data));
  };

  return (
    <div className="form">
      <div className="blockForm">
        <h1>Sing In</h1>
        <div className="item">
          <label>
            Email:
            <Input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>
        <div className="item">
          <label>
            Password:
            <Input
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div className="text">
          <label>
            Text:
            <TextField
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="btn">
        <Button onClick={CreateAccount}>Sing Up</Button>
        <Button onClick={LoginUser}>Sing In</Button>
      </div>
      <Button onClick={GoogleAuth}>Sing In With Google</Button>
    </div>
  );
}
