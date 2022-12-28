import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  window.onbeforeunload = () => {
    localStorage.clear();
  };
  const [cookies, setCookie, removeCookie] = useCookies();
  const [products, setProducts] = useState<any[]>([]);
  const data = JSON.stringify({
    email: cookies.email,
  });
  useEffect(() => {
    const res = axios
      .post("http://localhost:3001/products", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  if (cookies.token) {
    return (
      <div>
        <h1>bravo ma , esti logat ca si <span className="colored">{cookies.email}</span></h1>
        <button
          onClick={() => {
            removeCookie("token", { path: "/", sameSite: "none" });
            removeCookie("email", { path: "/", sameSite: "none" });
          }}
        >
          Sign out
        </button>
        <h2 className="middle">Your current products</h2>
        {products.map((product) => {
          return (
            <div className="product">
              <hr></hr>
              <span>Id: </span>
              <span>{product.id}</span>
              <span>Name: </span>
              <span>{product.product_name}</span>
              <span>Price:</span>
              <span>{product.product_price}</span>
              <span>Vendor:</span>
              <span>{product.product_vendor}</span>
              <hr></hr>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <h1>du-te ba si logheaza-te</h1>
        <a href="/">i-a de aici</a>
      </div>
    );
  }
}

export default Dashboard;
