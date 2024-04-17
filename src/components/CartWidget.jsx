import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const CartWidget = ({total, url}) => {
  return (
    <>
      <div className="relative flex items-center">
        <span id='totalItems' className="bg-red-500 z-10 text-white text-xs px-2 py-1 rounded-full absolute bottom-6 left-6">{total}</span>
        <Link to={url} className="px-3">
          <ShoppingCart width={18} className="hover:text-slate-500 duration-200"/>
        </Link>
      </div>
    </>
  );
}

export default CartWidget;