import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { getItems, getItemsByCategory } from "../utils";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      getItemsByCategory(categoryId).then((items) => {
        setItems(items);
      });
    } else {
      getItems().then((items) => {
        setItems(items);
      });
    }
  }, [categoryId]);

  return (
    <main>
      <div className="container mx-auto h-40 mt-3">
        <h1 className="text-2xl font-bold text-center pt-4">
          Nuestros productos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pb-8">
          {items.map((item) => (
            <ItemList key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ItemListContainer;
