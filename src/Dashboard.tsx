import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { idText, updateCommaList } from "typescript";

function Dashboard() {
  const [name, setName] = useState("");
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const [price, setPrice] = useState("");
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  ////////////
  window.onbeforeunload = () => {
    localStorage.clear();
  };
  const [cookies, setCookie, removeCookie] = useCookies();
  const [products, setProducts] = useState<any[]>([]);
  const data = JSON.stringify({
    email: cookies.email,
  });

  const vendor = cookies.email;

  const data_product = JSON.stringify({
    product_name: name,
    product_price: price,
    product_vendor: vendor,
  });

  const addProduct = async () => {
    const res = await axios.post("http://localhost:3001/create", data_product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
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

  const deleteById = (id: any) => {
    setProducts((oldValues) => {
      return oldValues.filter((products) => products.id !== id);
    });
  };

  if (cookies.token) {
    return (
      <div>
        <h1>
          bravo ma , esti logat ca si{" "}
          <span className="colored">{cookies.email}</span>
        </h1>
        <button
          onClick={() => {
            removeCookie("token", {
              path: "/",
              sameSite: "none",
              secure: true,
            });
            removeCookie("email", {
              path: "/",
              sameSite: "none",
              secure: true,
            });
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
              <button
                onClick={() => {
                  const id = JSON.stringify({ id: product.id });
                  console.log(id);
                  axios.post("http://localhost:3001/delete", id, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  deleteById(product.id);
                }}
              >
                Delete this product
              </button>
              <hr></hr>
            </div>
          );
        })}
        <hr></hr>
        <h1>Add your desired product</h1>
        <form>
          <input placeholder="product name" onChange={handleName}></input>
          <input placeholder="product price" onChange={handlePrice}></input>
        </form>
        <button
          onClick={() => {
            addProduct();
          }}
        >
          add product
        </button>
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
