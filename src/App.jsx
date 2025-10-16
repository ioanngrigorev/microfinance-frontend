import { Routes, Route } from 'react-router-dom'
import { MoralisProvider } from 'react-moralis'
import { ApplicationProvider } from './context/ApplicationContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CalculatorPage from './pages/CalculatorPage'
import ProductsPage from './pages/ProductsPage'
import ApplicationPage from './pages/ApplicationPage'
import AdminPage from './pages/AdminPage'
import PersonalAccountPage from './pages/PersonalAccountPage'
import CryptoAccountPage from './pages/CryptoAccountPage'
import CryptoWalletPage from './pages/CryptoWalletPage'
import WalletManager from './components/WalletManager'
import StablecoinBalance from './components/StablecoinBalance'
import LoanDisbursement from './components/LoanDisbursement'

function App() {
  return (
    <ApplicationProvider>
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
            <Route path="/crypto-wallet" element={<CryptoWalletPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ApplicationProvider>
  )
}

export default App


