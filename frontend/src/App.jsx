// import './App.css'
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="w-full">
      <div className=" w-full top-0">
        <Header />
      </div>
      <div >
        <Outlet />
      </div>
    </div>
  );
}

export default App;
