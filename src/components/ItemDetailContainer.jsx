import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../utils";
import { toast } from "react-toastify";
import useCart from "./hooks/useCart";
import { cartContext } from "../cartContext";
import { isEmpty } from "lodash";
import { Loader } from "lucide-react";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [totalItems, setTotalItems] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const contextValue = useCart(cartContext);

  useEffect(() => {
    setIsLoading(true);
    getItemById(id).then((item) => {
      setItem(item);
      setIsLoading(false);
    }).catch(() => {
      toast.error("Ocurrió un error al cargar el producto", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        hideProgressBar: true,
      });
      setIsLoading(false);
    });
  }, [id]);

  const handleIncrement = () => {
    if (totalItems === item.quantity) {
      toast.error("No hay más stock disponible", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        hideProgressBar: true,
      });
      return;
    }

    setTotalItems(totalItems + 1);
  };

  const handleDecrement = () => {
    setTotalItems(totalItems - 1);
  };

  const handleAddToCart = () => {
    if (totalItems === 0) {
      toast.error("Debes seleccionar al menos un item", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        hideProgressBar: true,
      });
      return;
    }

    contextValue.addItem(item, totalItems);
  };

  return (
    <div className="container mx-auto mt-3">
      <h1 className="text-2xl font-bold text-center pt-4">
        Detalle del producto
      </h1>
      {isEmpty(item) ? (
        <>
          {
            isLoading ? (
              <div className="text-center mt-4 flex justify-center">
                <Loader />
              </div>
            ) : (
              <div className="text-center mt-4">
                <p>El producto no existe.</p>
              </div>
            )
          }
        </>
      ) : (
        <>
          <div className="text-center flex justify-center">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-96 h-48 my-8 object-cover"
            />
          </div>
          <div className="text-center w-96 mx-auto">
            <h2 className="text-lg font-bold mt-2">{item.name}</h2>
            <p className="text-gray-500 mt-2">Precio: ${item.price}</p>
            <p className="text-gray-500 mt-2">Stock: {item.quantity}</p>
            <p className="text-gray-500 mt-2">
              Descripción: {item.description}
            </p>
          </div>
          <div className="text-center mt-4">
            <button onClick={handleDecrement} className="bg-gray-200 px-4 py-2">
              -
            </button>
            <span className="mx-4">{totalItems}</span>
            <button onClick={handleIncrement} className="bg-gray-200 px-4 py-2">
              +
            </button>
            <div>
              <button
                className="bg-gray-200 px-4 py-2 mt-4"
                onClick={handleAddToCart}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemDetailContainer;
