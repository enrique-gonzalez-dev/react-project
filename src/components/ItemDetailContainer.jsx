import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    fetch('/src/assets/data.json').then((response) => {
      return response.json();
    }).then((jsonData) => {
      const { boxing_store: { products } } = jsonData;
      const product = products.find((product) => product.id === parseInt(id));

      setItem(product);
    });
  }, [id]);


  return (
    <div className="container mx-auto mt-3">
      <h1 className="text-2xl font-bold text-center pt-4">Detalle del producto</h1>
      <div className="text-center flex justify-center">
        <img src={item.imageUrl} alt={item.name} className="w-96 h-48 my-8 object-cover"/>
      </div>
      <div className="text-center w-96 mx-auto">
        <h2 className="text-lg font-bold mt-2">{item.name}</h2>
        <p className="text-gray-500 mt-2">Precio: ${item.price}</p>
        <p className="text-gray-500 mt-2">Stock: {item.stock}</p>
        <p className="text-gray-500 mt-2">Descripción: {item.description}</p>
      </div>
    </div>
  );
}

export default ItemDetailContainer;