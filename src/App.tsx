import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { RootRouter } from "./RootRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <RootRouter />

      {/* // toast container is required for the toast to work */}
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
