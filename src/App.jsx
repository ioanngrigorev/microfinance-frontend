import { Routes, Route } from 'react-router-dom'
import { MoralisProvider } from 'react-moralis'
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
    <MoralisProvider
      appId={process.env.REACT_APP_MORALIS_APP_ID || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImJhZjE3MTE2LTcwYjktNGI4MC05NWM5LWY1ZDg5OWFkZDg3ZSIsIm9yZ0lkIjoiNDc2MTU0IiwidXNlcklkIjoiNDg5ODYzIiwidHlwZUlkIjoiZmI2YzYyNmItZTFmMC00NGRlLWE0NmItZTFiYmI3YTUzYzY1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NjA1ODM5MDgsImV4cCI6NDkxNjM0MzkwOH0.6A42Y-RnNFj6ME-uTe87nEv3Zaj3Jkhhr_zciBOiJc8'}
      serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL || 'https://your-server-url.moralis.io:2053/server'}
      initializeOnMount={true}
    >
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
    </MoralisProvider>
  )
}

export default App


