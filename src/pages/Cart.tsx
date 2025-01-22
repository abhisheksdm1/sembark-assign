import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { decrement, increment } from "../redux/cartSlice";

// Define a type for the product
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const Cart = () => {
  // Select the cart items from the store
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // Handle increment action for a specific product
  const handleIncrement = (id: number, product: Product) => {
    dispatch(increment({ id, product }));
  };

  // Handle decrement action for a specific product
  const handleDecrement = (id: number) => {
    dispatch(decrement(id));
  };

  // Calculate total price
  const calculateTotal = () => {
    return Object.values(cartItems).reduce(
      (acc, { product, quantity }) => acc + product.price * quantity,
      0
    );
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-5 px-4 sm:px-[50px]">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>

      {Object.keys(cartItems).length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div>
          {Object.entries(cartItems).map(([id, { product, quantity }]) => (
            <div
              key={id}
              className="border p-4 rounded mb-4 flex flex-col sm:flex-row items-center sm:justify-between"
            >
              <div className="flex items-center mb-4 sm:mb-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 object-contain mr-4"
                />
                <div>
                  <h2 className="font-bold text-sm sm:text-base">
                    {product.title}
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDecrement(Number(id))}
                  className="bg-red-500 text-white p-2 text-sm sm:text-base"
                >
                  -
                </button>
                <p className="mx-2 text-sm sm:text-base">{quantity}</p>
                <button
                  onClick={() => handleIncrement(Number(id), product)}
                  className="bg-red-500 text-white p-2 text-sm sm:text-base"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-4">
            <h2 className="font-bold text-lg sm:text-xl">Total Price:</h2>
            <p className="text-xl sm:text-2xl">
              ${calculateTotal().toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
