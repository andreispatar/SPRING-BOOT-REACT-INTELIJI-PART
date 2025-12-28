import { createContext, useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { fetchCategories } from "../Service/CategoryService.js";
import { fetchItems } from "../Service/ItemService.js";


export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useState({ token: null, role: null });
  const [itemsData, setItemsData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [categoryResponse, itemResponse] = await Promise.all([
          fetchCategories(),
          fetchItems(),
        ]);
        setCategories(categoryResponse.data);
        setItemsData(itemResponse.data);
      } catch (err) {
        console.error("Failed to fetch initial data", err);
        // stale/forbidden token: clear it and retry without auth so lists still render
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          try {
            const [categoryRetry, itemRetry] = await Promise.all([
              fetchCategories({ useAuth: false }),
              fetchItems({ useAuth: false }),
            ]);
            setCategories(categoryRetry.data);
            setItemsData(itemRetry.data);
            toast.error("Session expired. Please log in again.");
            return;
          } catch (retryErr) {
            console.error("Retry fetch initial data failed", retryErr);
          }
        }
        setCategories([]); // keep app rendering even if API is down
        setItemsData([]);
      }
    }
    loadData();
  }, []);

  const setAuthData = (token, role) => {
    setAuth({ token, role });
  };

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (cartItem) => cartItem.name === item.name
      );

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const incrementItem = (itemName) => {
    setCartItems((prev) =>
      prev.map((cartItem) =>
        cartItem.name === itemName
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
          : cartItem
      )
    );
  };

  const decrementItem = (itemName) => {
    setCartItems((prev) =>
      prev
        .map((cartItem) =>
          cartItem.name === itemName
            ? { ...cartItem, quantity: Math.max((cartItem.quantity || 1) - 1, 0) }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const removeFromCart = (itemName) => {
    setCartItems((prev) =>
      prev.filter((cartItem) => cartItem.name !== itemName)
    );
  };

  const contextValue = {
    categories,
    setCategories,
    auth,
    setAuthData,
    itemsData,
    setItemsData,
    cartItems,
    setCartItems,
    addToCart,
    incrementItem,
    decrementItem,
    removeFromCart,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
