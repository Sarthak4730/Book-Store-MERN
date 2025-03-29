import Navbar from "./components/Navbar";
import BelowNavbar from "./components/BelowNavbar";
import TopSellers from "./components/TopSellers";
import { useSelector } from "react-redux";
import { AuthProvider } from "./context/AuthContext";

function App(){
  const cartItems = useSelector(state => state.cart.cartItems);

  return(
    <AuthProvider>
      <Navbar count={cartItems.length} />
      <BelowNavbar />
      <TopSellers />
    </AuthProvider>
  );
}

export default App;