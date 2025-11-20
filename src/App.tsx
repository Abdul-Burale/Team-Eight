import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  const location = useLocation();

  // Pages where header & footer SHOULD NOT show
  const authPages = ["/signin", "/signup"];
  const hideLayout = authPages.includes(location.pathname);

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">

      {/* Header only on NON-auth pages */}
      {!hideLayout && <Header />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
