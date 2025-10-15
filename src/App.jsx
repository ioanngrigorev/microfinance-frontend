import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CalculatorPage from './pages/CalculatorPage'
import ProductsPage from './pages/ProductsPage'
import ApplicationPage from './pages/ApplicationPage'
import AdminPage from './pages/AdminPage'
import PersonalAccountPage from './pages/PersonalAccountPage'
import CryptoAccountPage from './pages/CryptoAccountPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/application" element={<ApplicationPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/personal-account" element={<PersonalAccountPage />} />
          <Route path="/crypto-account" element={<CryptoAccountPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App


