import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <nav className="bg-gray-300 py-3 shadow-md px-3 md:px-0">
      <div className="container mx-auto">
        <div className="block md:justify-between md:flex">
          <h1 className="font-bold py-2 text-xl">GloveHub</h1>
          <div className="flex align-middle justify-between">
            <a href="#" className="md:px-4 py-2 hover:text-slate-500 duration-200">Categorías</a>
            <CartWidget total={4} url={'#'}/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
