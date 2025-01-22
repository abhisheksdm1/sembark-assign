import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../redux/cartSlice";
import { RootState } from "../redux/store";
import { useNavigate, useParams } from "react-router-dom";

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

export default function ProductList() {
  const [productList, setProductList] = useState<Product[]>([]);
  const cartItems = useSelector((state: RootState) => state.cart.items); // Get the cart items
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams(); // Get the category from URL params

  const formattedCategory = category ? category.replace("-", " ") : "";
  const [selectedCategory, setSelectedCategory] = useState<string>("select");
  const [selectedSort, setSelectedSort] = useState<string>("select");

  // Fetch products based on category and sort
  const fetchProducts = async (category: string, sortOrder: string) => {
    try {
      let url = "https://fakestoreapi.com/products";
      if (category) {
        const encodedCategory = encodeURI(category);
        url = `https://fakestoreapi.com/products/category/${encodedCategory}`;
      }
      if (sortOrder) {
        url += `?sort=${sortOrder}`;
      }
      const response = await axios.get<Product[]>(url);
      setProductList(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Update the URL to reflect the selected category
    navigate(`/products/category/${category.replace(" ", "-")}`);
    fetchProducts(category, selectedSort); // Fetch products based on the selected category and sort
  };

  // Handle sorting change
  const handleSortChange = (sortOrder: string) => {
    setSelectedSort(sortOrder);
    fetchProducts(formattedCategory, sortOrder); // Fetch products based on category and sort order
  };

  useEffect(() => {
    fetchProducts(formattedCategory, selectedSort); // Fetch products when category or sort changes
  }, [formattedCategory, selectedSort]);

  // Handle adding an item to the cart
  const handleAddToCart = (product: Product) => {
    dispatch(increment({ id: product.id, product }));
  };

  // Handle removing an item from the cart
  const handleRemoveFromCart = (id: number) => {
    dispatch(decrement(id));
  };

  const handleChange = (id: number) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <>
      <div className="max-w-screen-lg mx-auto mt-5 pr-[50px] pl-[50px] flex justify-between">
        <div>
          <label htmlFor="category" className="bg-red-500 text-white p-2">
            Category:{" "}
          </label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)} // Update URL and fetch products
          >
            <option value="select" disabled>
              select
            </option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="bg-red-500 text-white p-2">
            Sort:{" "}
          </label>
          <select
            id="sort"
            name="sort"
            value={selectedSort}
            onChange={(e) => handleSortChange(e.target.value)} // Update sort and fetch products
          >
            <option value="select" disabled>
              select
            </option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto mt-5 pr-[50px] pl-[50px] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productList.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <div
              className="cursor-pointer"
              onClick={() => handleChange(product.id)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h1 className="text-lg font-bold mb-2">{product.title}</h1>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center">
              {cartItems[product.id] ? (
                <div className="flex">
                  <button
                    onClick={() => handleRemoveFromCart(product.id)}
                    className="bg-red-500 text-white p-2"
                  >
                    -
                  </button>
                  <p className="mx-2">{cartItems[product.id].quantity}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-red-500 text-white p-2"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="bg-red-500 text-white p-2"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
