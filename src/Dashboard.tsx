import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  /// Clearing the localstorage after leaving

  window.onbeforeunload = () => {
    localStorage.clear();
  };

  ///////////////////////////////////////////

  /// Handling product_name, product_price

  const [name, setName] = useState("");
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const [price, setPrice] = useState("");
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  //////////////////////////////////////////

  ///// Getting cookies and the data needed

  // eslint-disable-next-line
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

  /// Adding the product to the database function

  const addProduct = async () => {
    // eslint-disable-next-line
    const res = await axios.post("http://localhost:4000/create", data_product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  /// Generating a temporary id
  var id = 0;
  const getID = () => {
    try {
      if (products.at(-1).id >= 0) {
        id = products.at(-1).id + 1;
      }
    } catch (err) {
      if (err) {
        id = 1;
      }
    }
  };
  //////////

  // {\__/}
  // (●_●)
  // ( >🌮 Want a taco? 

  /// Get all the products from the database based on email
  useEffect(() => {
    // eslint-disable-next-line
    const res = axios
      .post("http://localhost:4000/products", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setProducts(res.data);
      });
  });

  /// Deletion of an product by Id

  const deleteById = (id: any) => {
    setProducts((oldValues) => {
      return oldValues.filter((products) => products.id !== id);
    });
  };

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
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
            navigateHome();
          }}
        >
          Sign out
        </button>
        <h2 className="middle">Your current products</h2>
        <div className="product-list">
        {products.map((product) => {
          return (
            <div className="product">
              <hr></hr>
              <span className="tags">Name: </span>
              <span>{product.product_name}</span>
              <span className="tags">Price:</span>
              <span>{product.product_price}</span>
              <span className="tags">Vendor:</span>
              <span>{product.product_vendor}</span>
              <button
                onClick={() => {
                  const id = JSON.stringify({ id: product.id });
                  axios.post("http://localhost:4000/delete", id, {
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
        </div>
        <hr></hr>
        <h1>Add your desired product</h1>
        <form>
          <input placeholder="product name" onChange={handleName}></input>
          <input placeholder="product price" onChange={handlePrice}></input>
        </form>
        <button
          onClick={() => {
            // setProduct(p => p.concat(newThing))
            addProduct();
            getID();
            const new_product = {
              id: id,
              product_name: name,
              product_price: price,
              product_vendor: vendor,
            };
            setProducts((products) => products.concat(new_product));
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

// How do I make the auto_increment index go to show the actual numbers of entries in my table ?

// I have this example database made in xampp and I entered 40 things , deleted them all , then added a new thing and it has an id of 41.
// All the videos I saw are based on some SQL query , but I want to get that everytime it updates, automatic, without the need for me to add another query on all my requests to the database. Isn't there some check box for this or like an option ?

// answer pls.
