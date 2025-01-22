import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../redux/cartSlice";
import { RootState } from "../redux/store";
import { Link, useParams } from "react-router-dom";

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

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState<Product | null>(null); // Single product state
  const cartItems = useSelector((state: RootState) => state.cart.items); // Get cart items
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the product ID from the URL

  useEffect(() => {
    // Fetch product details based on the `id` from the URL
    async function fetchProductDetails() {
      try {
        const response = await axios.get<Product>(
          `https://fakestoreapi.com/products/${id}`
        );
        setProductDetails(response.data); // Update the state with the fetched product
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }

    if (id) {
      fetchProductDetails(); // Fetch the product when the component mounts or when `id` changes
    }
  }, [id]); // Re-run the effect when `id` changes

  // Handle adding an item to the cart
  const handleAddToCart = (product: Product) => {
    dispatch(increment({ id: product.id, product })); // Pass both id and product as a payload
  };

  // Handle removing an item from the cart
  const handleRemoveFromCart = (id: number) => {
    dispatch(decrement(id)); // Dispatch decrement with the product ID
  };

  // Navigate to another product detail page

  if (!productDetails) {
    return <div>Loading product details...</div>; // Display loading message while fetching product
  }

  return (
    <div>
      <div className="max-w-screen-lg mx-auto mt-5 pr-[50px] pl-[50px]">
        <button className="bg-red-500 p-2 text-white">
          <Link to="/">Back </Link>
        </button>
      </div>

      <div className="max-w-screen-lg mx-auto mt-5 pr-[50px] pl-[50px]">
        <div key={productDetails?.id} className="border p-4 rounded shadow">
          <div className="grid justify-center justify-items-center grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <img
                src={productDetails?.image}
                alt={productDetails?.title}
                className="w-48 h-48 object-contain mb-4"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold mb-2">
                {productDetails?.title}
              </h1>
              <p className="bg-red-500 inline-block p-2">
                {productDetails?.category}
              </p>
              <p className="text-gray-600">
                ${productDetails?.price.toFixed(2)}
              </p>
              <p className="text-gray-600">
                Rating : {productDetails?.rating.rate}
              </p>
              <div className="flex items-center">
                {cartItems[productDetails.id] ? (
                  // If product is in the cart, show the quantity controls
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => handleRemoveFromCart(productDetails.id)}
                      className="bg-red-500 text-white p-2"
                    >
                      -
                    </button>
                    <p className="mx-2">
                      {cartItems[productDetails.id]?.quantity}
                    </p>
                    <button
                      onClick={() => handleAddToCart(productDetails)}
                      className="bg-red-500 text-white p-2"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  // If product is not in the cart, show "Add to Cart" button
                  <button
                    className="bg-red-500 text-white p-2"
                    onClick={() => handleAddToCart(productDetails)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
