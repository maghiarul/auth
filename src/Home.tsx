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
    setCookie("email", email, {
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
    // eslint-disable-next-line
    const res = await axios.post("http://localhost:4000/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const Login = async () => {
    // eslint-disable-next-line
    const res = await axios
      .post("http://localhost:4000/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
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

  ///products array

  const [p, setP] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:4000/product-list").then((res) => {
      setP(res.data);
    });
  });

  return (
    <div className="App">
      {/* REGISTER PAGE*/}
      <h1>Register</h1>
      <form>
        <input required placeholder="username" onChange={handleEmail}></input>
        <input required placeholder="pass" onChange={handlePass}></input>
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
        <input required placeholder="username" onChange={handleEmail}></input>
        <input required placeholder="pass" onChange={handlePass}></input>
      </form>
      <button
        onClick={() => {
          Login();
        }}
      >
        login
      </button>

      {/* Product page */}
      <h1 className="middle">Products</h1>
      {p.map((pr) => {
        return (
          <div className="product">
            <hr></hr>
            <span className="tags">Name: </span>
            <span>{pr.product_name}</span>
            <span className="tags">Price:</span>
            <span>{pr.product_price}</span>
            <span className="tags">Vendor:</span>
            <span>{pr.product_vendor}</span>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
