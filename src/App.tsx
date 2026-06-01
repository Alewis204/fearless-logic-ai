import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Signup from './pages/Signup';

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketingLayout><Home /></MarketingLayout>} />
        <Route path="/pricing" element={<MarketingLayout><Pricing /></MarketingLayout>} />
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/signup" element={<AuthLayout><Signup /></AuthLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
