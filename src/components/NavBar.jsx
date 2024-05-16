import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import { getCategories } from "../utils";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories)
  });
  }, []);

  return (
    <nav className="bg-gray-300 py-3 shadow-md px-3 md:px-0">
      <div className="container mx-auto">
        <div className="block md:justify-between md:flex">
          <Link to="/">
            <h1 className="font-bold py-2 text-xl">GloveHub</h1>
          </Link>
          <div className="flex align-middle justify-between">
            <Link to="/" className="md:px-4 py-2 hover:text-slate-500 duration-200">Inicio</Link>

            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.name}`}
                className="md:px-4 py-2 hover:text-slate-500 duration-200" >
                {category.title}
              </Link>
            ))}
            <CartWidget total={4} url={'/cart'}/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
