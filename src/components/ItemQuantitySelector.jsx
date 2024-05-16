const ItemQuantitySelector = ({ handleIncrement, handleDecrement, totalItems, handleAddToCart }) => {
  return (
    <>
      <button onClick={handleDecrement} className="bg-gray-200 px-4 py-2">
        -
      </button>
      <span className="mx-4">{totalItems}</span>
      <button onClick={handleIncrement} className="bg-gray-200 px-4 py-2">
        +
      </button>
      <div>
        <button
          className="bg-gray-200 px-4 py-2 mt-4"
          onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </>
  );
};

export default ItemQuantitySelector;
