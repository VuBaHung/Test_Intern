import { useEffect, useState } from "react";
import "./App.css";
import API from "./data/shoes.json";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState([]);
  const [cart, setCart] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    API && setData(API.shoes);
  }, []);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const getCart = async () => {
      const cart = await axios.get("http://localhost:5000/getcart");
      setCart(cart.data.carts);
    };
    getCart();
  }, [callback]);
  const addToCart = async (cart) => {
    await axios.patch(`http://localhost:5000/addcart/${cart.id}`, {
      cart,
    });

    setCallback(!callback);
  };

  const updateCart = async (product) => {
    await axios.post(`http://localhost:5000/updatecart`, {
      product,
    });
    setCallback(!callback);
  };
  const removeProduct = async (id) => {
    await axios.delete(`http://localhost:5000/deletecart/${id}`);
    setCallback(!callback);
  };
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total.toFixed(2));
    };
    getTotal();
  }, [cart]);
  const increment = (id) => {
    cart.forEach((item) => {
      if (item.id === id) {
        item.quantity += 1;
        addToCart(item);
        console.log({ item });
      }
    });
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item.id === id) {
        item.quantity <= 1 ? removeProduct(id) : (item.quantity -= 1);
        addToCart(item);
      }
    });
  };

  return (
    <div className="App_mainContent_12BYb">
      <div className="App_card_38zmH">
        <div className="App_cardTop_3hHIG">
          <img src="/nike.png" alt="" className="App_cardTopLogo_2ho9K" />
        </div>
        <div className="App_cardTitle_29nyq">Our Products</div>
        <div className="App_cardBody_1tfYc">
          {data &&
            data.map((item) => (
              <div key={item.id} style={{ paddingBottom: "30px" }}>
                <div className="App_shopItem_3FgVU">
                  <div
                    className="App_shopItemImage_341iU"
                    style={{ backgroundColor: `${item.color}` }}
                  >
                    <img src={item.image} alt="" />
                  </div>
                </div>
                <div className="App_shopItemName_1_FJR">{item.name}</div>
                <div className="App_shopItemDescription_1EIVK">
                  {item.description}
                </div>
                <div className="App_shopItemBottom_3401_">
                  <div className="App_shopItemPrice_2SLiG">${item.price}</div>
                  {cart.some((cartitem) => cartitem.id * 1 === item.id) ? (
                    <div className="App_shopItemButton_23FO12">
                      <img src="/check.png" alt="" width={20} height={20} />
                    </div>
                  ) : (
                    <div
                      className="App_shopItemButton_23FO1"
                      onClick={() => updateCart(item)}
                    >
                      <p>ADD TO CART</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="App_card_38zmH">
        <div className="App_cardTop_3hHIG">
          <img src="/nike.png" alt="" className="App_cardTopLogo_2ho9K" />
        </div>
        <div className="App_cardTitle_29nyq">
          Your cart<span className="App_cardTitleAmount_17QFR">${total}</span>
        </div>
        <div className="App_cardBody_1tfYc">
          <div>
            {cart && cart.length === 0 ? (
              <h4 style={{ fontWeight: "lighter" }}>Your cart is empty</h4>
            ) : (
              cart.map((item) => (
                <div className="App_cartItem_lfA9I" key={item.id}>
                  <div className="App_cartItemLeft_1HqDk">
                    <div
                      className="App_cartItemImage_1rLvq cartItemImage"
                      style={{ backgroundColor: `${item.color}` }}
                    >
                      <div className="App_cartItemImageBlock_wRE4E">
                        <img src={item.image} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="App_cartItemRight_2LNcC">
                    <div className="App_cartItemName_3he6M cartItemName">
                      {item.name}
                    </div>
                    <div className="App_cartItemPrice_R0sr2 cartItemPrice">
                      ${item.price}
                    </div>
                    <div className="App_cartItemActions_13kia">
                      <div className="amount">
                        <button onClick={() => decrement(item.id)}> - </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increment(item.id)}> + </button>
                      </div>
                      <div
                        className="App_cartItemRemove_1GiLR cartItemRemove"
                        onClick={() => removeProduct(item.id)}
                      >
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALISURBVHic7Zs9bxNBEIYfgyUKAhhQUhDRICEBCh0fgkhBNIT8gPwZ6Gig5y8QCUhH5AqE3EZJgQRKEDSpKEAQkTMdcijGRvi8Z+/e3eze4X2kKe40t/Pu+LRfN4bIdNNQbLsJ3ATOFWznC7AJ/C6syCMngC3gsCTb7LdZGx5SXucH9kBD6BGNRoGrNWlTLQEa7R5VaFMtAbXBZwLWkVnHxtZ9iZr6N6Bp6TcHXAOOW/qfz7i36un5X8A28NXSfywrQJfypzVtS4D7ZSRgpwKdyWsfJnXOZincxf7VrxoJcHKcg80g2ClFShg6ZTQyD2xQr3GgC7yi+EYs8t+TZ329gKwJfiLzbRU4Cywh/fmuGegpw/PssmYwS5aAfURTD3ikFegKo4PNe61gDrxjWFMPuGj7sMte4JLh3mWH57VYSF03cDg7cEmAabxQ2aM7UkjX1O8GfSRgHmgjM8YO4wfOFWC379umYguZVcyrrkm0U/4JMGvwm2N0tblh0b5Jk+222csbcCd1PYOsI9KYzhvuqij6Bx8JMO0kZyz91HehcRAMLSA0MQGhBYQmJiC0gNDEBIQWEJqYgNACQhMTEFpAaGICQgsITUxAaAGhiQnwEMP0+axr6af+6c1HAjqp6wQpo02zxWhi3moIykveU+FBfUGCfEq7N8Z3GSlrSbD/vl/oVNiFvAnQpvLH4pUmJsDBN2tEDlnHn1UBZppljLgkYC/j/i2HNspmMeP+nkawY8ABowPOa41gFjSQaTKt5wDRqsKaIeAh8Bjd/x+laQBPMrQ80wy8iJSgmAK/QWpzW4rxW8gndNMvPyiPua0YH4DnGcGrYGuK/f7LGeBjgM5Nsl3gtGK/h7gAfFbukIt96mvySgt4WVB4UesBL4BTyn0dy42+iEGxog/bR8ai60XFlzl1NZFiyllknNDgB/ANKbaq1V9pI1XlD82w8ru3YIVHAAAAAElFTkSuQmCC"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
