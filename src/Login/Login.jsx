import "./Login.css";
import React, { useState } from "react";
import { useRoutes, useNavigate, Link, Navigate } from "react-router-dom";

export default function Login({loggedIn, setLoggedIn}) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const sendUser = (user) => {
    //send login info to backend for verification
    if(setLoggedIn) {
      navigate(`/`);
    }
  };

  return (
    <main>
      <form onSubmit={(e) => {
        e.preventDefault();
        sendUser(user);
      }}>
        <input type="text" placeholder="email" onChange={(e) => {setUser({...user,
          username: e.target.value})}} required></input>
        <input type="text" placeholder="password" onChange={(e) => {setUser({...user,
          password: e.target.value})}} required></input>
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}