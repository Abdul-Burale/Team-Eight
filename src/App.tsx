import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import Home from './pages/Home.tsx'
function App() {

  return (
    <>
    <div className="full-background">
      <Header />
      <div className="relative overflow-y-auto max-h-screen"> 
        <Home />
        <Footer />
      </div>
    </div>

    </>
  )
}

export default App
