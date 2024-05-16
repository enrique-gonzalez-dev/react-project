import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const cartContext = createContext();

const Provider = cartContext.Provider;

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCartItems, setTotalCartItems] = useState(0);

  const addItem = (item, quantity) => {
    const index = cart.findIndex((cartItem) => cartItem.item.id === item.id);
    if (index === -1) {
      setCart([...cart, { item, quantity }]);
      toast.success("Se ha añadido al carrito");
    } else {
      const newCart = [...cart];
      if (newCart[index].quantity + quantity > item.quantity) {
        newCart[index].quantity = item.quantity;
        toast.error("No hay más stock disponible");
      } else {
        toast.success("Se ha añadido al carrito");
        newCart[index].quantity += quantity;
      }
      setCart(newCart);
    }
  };

  useEffect(() => {
    let total = 0;
    let totalItems = 0;

    cart.forEach((cartItem) => {
      total += cartItem.item.price * cartItem.quantity;
      totalItems += cartItem.quantity;
    });

    setTotalPrice(total);
    setTotalCartItems(totalItems);
  }, [cart]);

  const removeItem = (itemId) => {
    const newCart = cart.filter((cartItem) => cartItem.item.id !== itemId);
    setCart(newCart);
  };

  const clear = () => {
    setCart([]);
    setTotalCartItems(0);
  };

  const currentValue = {
    cart,
    totalCartItems,
    totalPrice,
    addItem,
    removeItem,
    clear,
  };

  return <Provider value={currentValue}>{children}</Provider>;
};

export default CartProvider;
