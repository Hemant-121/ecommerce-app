
// import './App.css'
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";


function App() {

  return (
    <div className="h-full">
    <div className="fixed top-0 w-full z-10">
      <Header />
    </div>
    <div className="mt-20">
      <Outlet />
    </div>
  </div>
  )
}

export default App;
