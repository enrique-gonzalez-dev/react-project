import { useParams } from "react-router-dom"
import { getSale } from "../utils";
import { useEffect, useState } from "react";

const OrderResume = () => {
  const [order, setOrder] = useState({});
  const params = useParams();
  const { orderId } = params;

  useEffect(() => {
    getSale(orderId).then((order) => {
      setOrder(order);
    });
  }, [orderId]);

  return (
    <div className="container mx-auto mt-3">
      <h1 className="text-2xl font-bold text-center pt-4">Orden confirmada</h1>
      <div className="text-center w-96 mx-auto">
        <h2 className="text-lg font-bold mt-2">Orden N°: {order.id}</h2>
        <p className="text-gray-500 mt-2">Fecha estimada de entrega: {order.estimatedDelivery}</p>
        <p className="text-gray-500 mt-2">Total: ${order.total}</p>
      </div>
    </div>
  )
}

export default OrderResume