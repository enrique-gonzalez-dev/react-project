import { Link } from "react-router-dom";
import { cartContext } from "../cartContext";
import useCart from "./hooks/useCart";
import { MoveLeft } from "lucide-react";

const Cart = () => {
  const currentValue = useCart(cartContext);

  const { cart, totalCartItems, totalPrice, addItem, removeItem, clear } = currentValue;

  return (
    <main>
      <div className="container mx-auto h-40 mt-3">
        <div className="mt-4">
          <Link to="/" className="flex">
            <MoveLeft /> <span className="pl-2">Volver a la tienda</span>
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-center pt-4">
          Carrito
        </h1>
        { totalCartItems > 0 ? (
          cart.map((item) => (
            <div key={item.item.id} className="bg-white p-4 shadow-md">
              <div className="flex">
                <Link to={`/item/${item.item.id}`}>
                  <img
                    src={item.item.imageUrl}
                    alt={item.item.name}
                    className="h-40 w-40 object-cover"
                  />
                </Link>
                <div className="ml-4">
                  <h2 className="text-lg font-bold mt-2">{item.item.name}</h2>
                  <p className="text-gray-500 mt-2">Precio: ${item.item.price}</p>
                  <p className="text-gray-500 mt-2">Cantidad: {item.quantity}</p>
                </div>
              </div>
              <button onClick={() => removeItem(item.item.id)} className="bg-gray-200 px-4 py-2 mt-4">Eliminar</button>
            </div>
          ))
        ) : (
          <h2 className="text-center mt-4">No hay items en el carrito</h2>
        )}
        { totalCartItems > 0 && (
          <div className="text-center mt-4 pb-10">
            <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <button onClick={clear} className="bg-gray-200 px-4 py-2 mt-4">Vaciar carrito</button>
            <Link to="/checkout" className="bg-gray-200 px-4 py-2 mt-4 ml-4">Finalizar compra</Link>
          </div>
        )
        }
      </div>
    </main>
  );
}

export default Cart;