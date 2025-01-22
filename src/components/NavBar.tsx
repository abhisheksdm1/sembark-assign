import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

export default function NavBar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate total items in the cart by summing up the quantity of each item
  const totalItemsInCart = Object.values(cartItems).reduce(
    (acc, item) => acc + item.quantity, // Access the quantity from each item
    0
  );

  return (
    <div className="max-w-screen-lg bg-red-500 mx-auto h-[70px] flex justify-between items-center pl-[50px] pr-[50px]">
      <h1 className="text-white" data-testid="cypress-title">
        <Link to="/">SemBark.com</Link>
      </h1>
      <div className="flex items-center justify-center">
        <h1 className="text-white">
          <Link to="/cart">Cart</Link>
        </h1>
        <h1 className="bg-white relative right-[1px] top-[-10px] text-xs text-red-500 flex items-center rounded-full justify-center w-[20px] h-[20px]">
          {totalItemsInCart}
        </h1>
      </div>
    </div>
  );
}
