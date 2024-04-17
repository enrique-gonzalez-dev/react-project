import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    fetch("/src/assets/data.json")
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        const {
          boxing_store: { products },
        } = jsonData;
        if (categoryId) {
          const filteredProducts = products.filter(
            (product) =>
              product.category.toLowerCase() === categoryId.toLowerCase()
          );
          setItems(filteredProducts);
          return;
        }
        setItems(products);
      });
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
