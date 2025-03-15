import Navbar from "./components/Navbar";
import BelowNavbar from "./components/BelowNavbar";
import TopSellers from "./components/TopSellers";
import { useSelector } from "react-redux";

function App(){
  const cartItems = useSelector(state => state.cart.cartItems);

  return(
    <>
      <Navbar count={cartItems.length} />
      <BelowNavbar />
      <TopSellers />
    </>
  );
}

export default App;