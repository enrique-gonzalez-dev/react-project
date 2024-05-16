import { useContext } from "react"
import { cartContext } from "../../cartContext";

const useCart = () => {
    const currentValue = useContext(cartContext)
    return currentValue
}

export default useCart;