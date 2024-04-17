import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <nav className="bg-gray-300 py-3 shadow-md px-3 md:px-0">
      <div className="container mx-auto">
        <div className="block md:justify-between md:flex">
          <Link to="/">
            <h1 className="font-bold py-2 text-xl">GloveHub</h1>
          </Link>
          <div className="flex align-middle justify-between">
            <Link to="/" className="md:px-4 py-2 hover:text-slate-500 duration-200">Inicio</Link>
            <Link to='/category/guantes' className="md:px-4 py-2 hover:text-slate-500 duration-200">Guantes</Link>
            <Link to='/category/ropa' className="md:px-4 py-2 hover:text-slate-500 duration-200">Ropa</Link>
            <Link to='/category/accesorios' className="md:px-4 py-2 hover:text-slate-500 duration-200">Accesorios</Link>
            <Link to='/category/equipo' className="md:px-4 py-2 hover:text-slate-500 duration-200">Equipo</Link>

            <CartWidget total={4} url={'/cart'}/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
