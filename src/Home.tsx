import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

function Home() {
  const [email, setEmail] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [pass, setPass] = useState("");

  const [token, setToken] = useState([]);
  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  function register() {
    axios({
      method: "post",
      url: "http://localhost:3001/register",
      headers: {},
      data: {
        email: email,
        password: pass,
      },
    });
  }
  function login() {
    axios({
      method: "post",
      url: "http://localhost:3001/login",
      headers: {},
      data: {
        email: email,
        password: pass,
      },
    }).then((response) => {
      console.log(response.data.token);
      setToken(response.data.token);
      console.log(response.data.token.length);
      // if (response.data === "E BINE FRATE") {
      //   setLogged(response.data);
      // } else if (response.data !== "E BINE FRATE") {
      //   setLogged(response.data);
      // }
    });
  }
  return (
    <div className="App">
      {/* REGISTER PAGE*/}
      <h1>Register</h1>
      <form>
        <input placeholder="email" onChange={handleEmail}></input>
        <input placeholder="pass" onChange={handlePass}></input>
      </form>
      <button
        onClick={() => {
          register();
        }}
      >
        register
      </button>

      {/* LOGIN PAGE*/}

      <h1>Login</h1>
      <form>
        <input placeholder="email" onChange={handleEmail}></input>
        <input placeholder="pass" onChange={handlePass}></input>
      </form>
      <button
        onClick={() => {
          login();
        }}
      >
        login
      </button>
      <span>.</span>
      <span>.</span>
      <span>.</span>
      <span>{token}</span>
    </div>
  );
}

export default Home;
