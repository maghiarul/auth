import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Home() {
  // information like email and password handling

  const [email, setEmail] = useState("");
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [pass, setPass] = useState("");

  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  ////////////////////////////////////

  //navigation through the website

  const navigate = useNavigate();
  const navigateDashboard = () => {
    navigate("/dashboard");
  };

  //////////////////////////////

  //cookies and handling cookies

  const [cookies, setCookie] = useCookies(["token", "email"]);

  const handleCookie = () => {
    setCookie("token", JSON.parse(localStorage.getItem("token")!), {
      path: "/",
      maxAge: 3600,
      secure: true,
      sameSite: "none",
    });
    setCookie("email", JSON.parse(localStorage.getItem("email")!), {
      path: "/",
      maxAge: 3600,
      secure: true,
      sameSite: "none",
    });
  };

  /////////////////////////////

  // login and register requests

  const data = JSON.stringify({
    email: email,
    password: pass,
  });

  const Register = async () => {
    const res = await axios.post("http://localhost:3001/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const Login = async () => {
    const res = await axios
      .post("http://localhost:3001/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("email", JSON.stringify(email))
        handleCookie();
        if (cookies.token) {
          navigateDashboard();
        }
      });
  };
  //////////////////////////////

  /// constantly watches so a loggedIn user can't go back to login/register page
  useEffect(() => {
    if (cookies.token) {
      navigateDashboard();
    }
  });

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
          Register();
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
          Login();
        }}
      >
        login
      </button>
    </div>
  );
}

export default Home;
