import { Link } from "react-router-dom";

const ItemList = ({ item }) => {
  return (
    <Link to={`/item/${item.id}`}>
      <div key={item.id} className="bg-white p-4 shadow-md">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-40 object-cover"
        />
        <h2 className="text-lg font-bold mt-2">{item.name}</h2>
        <p className="text-gray-500 mt-2">Precio: ${item.price}</p>
      </div>
    </Link>
  );
};

export default ItemList;
