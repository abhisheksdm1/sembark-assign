import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./components/ProductList";
import CategoryFilter from "./pages/CategoryFilter";

// Define the routes with proper TypeScript typing
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: "product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "products/category/:category",
        element: <CategoryFilter />,
      },
    ],
  },
]);

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
