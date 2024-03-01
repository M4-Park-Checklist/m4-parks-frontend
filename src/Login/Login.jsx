import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import CustomButton from "../ButtonRule";

export default function Login({loggedIn, setLoggedIn}) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const sendUser = async (user) => {
    try {
      // const response = await axios.get();    //send login info to backend for verification (backend endpoint not complete at time of submission)
      setLoggedIn(true)
    } catch (error) {
      console.error("Error: incorrect login", error);
      alert("Incorrect credentials, please try again.");
    }
    if(loggedIn) {
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
        <CustomButton type="submit">Submit</CustomButton>
      </form>
    </main>
  )
}

Login.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired
}