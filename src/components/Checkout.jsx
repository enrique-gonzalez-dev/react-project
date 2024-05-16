import { useContext, useState } from "react";
import { cartContext } from "../cartContext";
import { Link, useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { toast } from "react-toastify";
import { createSale } from "../utils";
import moment from "moment";

const Checkout = () => {
  const currentContext = useContext(cartContext);

  const { cart, totalCartItems, totalPrice, clear } = currentContext;
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validEmail()) return;

    const estimatedDelivery = moment().add(7, "days").format("DD/MM/YYYY");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    if (!name || !email || !phone || !address) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    const order = {
      buyer: {
        name: name,
        email: email,
        phone: phone,
        address: address,
      },
      items: cart.map((item) => ({
        id: item.item.id,
        quantity: item.quantity,
      })),
      totalItems: totalCartItems,
      total: totalPrice.toFixed(2),
      estimatedDelivery: estimatedDelivery
    };
    createSale(order).then((response) => {
      toast.success("Compra realizada con éxito");
      clear();
      navigate(`/order/${response}`);
    }).catch((response) => {
      toast.error("Ocurrió un error al realizar la compra");
    });
  };

  const validEmail = () => {
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirmEmail").value;

    if (email !== confirmEmail) {
      setErrors({ ...errors, email: true });
      return false;
    } else {
      setErrors({ ...errors, email: false });
      return true;
    }
  }

  return (
    <div className="container mx-auto">
      <div className="mt-4">
        <Link to="/cart" className="flex">
          <MoveLeft /> <span className="pl-2">Volver al carrito</span>
        </Link>
      </div>
      <br />
      <h1 className="text-2xl font-bold text-center pt-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pb-8">
        <div className="bg-white p-4 shadow-sm text-center">
          <h2 className="text-lg font-bold mt-2">Datos del cliente</h2>
          <form className="mt-4">
            <label htmlFor="name" className="block text-left">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-2 py-1 border border-gray-300" />
            <label htmlFor="email" className="block text-left mt-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-2 py-1 border border-gray-300" />
            <label htmlFor="email" className="block text-left mt-2">
              Confirmar email
            </label>
            <input
              type="email"
              id="confirmEmail"
              className="w-full px-2 py-1 border border-gray-300" />
            {
              errors.email && <span className="text-sm text-red-800">* Los correos no coinciden</span>
            }
            <br />
            <label htmlFor="phone" className="block text-left mt-2">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-2 py-1 border border-gray-300" />
            <label htmlFor="address" className="block text-left mt-2">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              className="w-full px-2 py-1 border border-gray-300" />
            <button className="bg-gray-200 px-4 py-2 mt-4" onClick={handleSubmit}>
              Finalizar compra
            </button>
          </form>
        </div>
        <div className="bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold mt-2">Resumen de compra</h2>
          {cart.map((item) => (
            <div key={item.item.id} className="flex justify-between mt-4">
              <div>
                <p className="text-gray-500 mt-2">
                  {item.item.name}{" "}
                  <span className="font-bold"> x{item.quantity}</span>
                </p>
              </div>
            </div>
          ))}
          <br className="border-t-4 border-gray-200 mt-4 mb-4" />
          <p className="text-gray-500 mt-2">Total de items: {totalCartItems}</p>
          <p className="text-gray-500 mt-2">Total: ${totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
