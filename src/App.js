import ProductListingPage from "./pages/ProductListing";
import { Provider } from "./context";

function App() {
  return (
    <Provider>
      <ProductListingPage />
    </Provider>
  );
}

export default App;
