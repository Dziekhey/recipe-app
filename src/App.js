import Recipes from "./pages/recipes";
import Recipe from "./pages/recipe";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddRecipe from "./pages/add-recipe";

const router = createBrowserRouter([
  { path: "/", element: <Recipes /> },
  { path: "/recipes", element: <Recipes /> },
  { path: "/recipes/:id", element: <Recipe /> },
  {path: "/add-recipe", element: <AddRecipe />}
]);

function App() {
  return (
    <>
     <RouterProvider router={router} />
    </>
  );
}

export default App;
