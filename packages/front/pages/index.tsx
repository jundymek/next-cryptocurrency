import About from '../components/about/About';
import Cryptos from '../components/cryptos/Cryptos';
import Features from '../components/features/Features';
import Layout from '../components/layout/Layout';
import { AuthProvider } from '../context/authContext';

export default function Home() {
  return (
    <AuthProvider>
      <Layout title="Main page">
        <Cryptos />
        <Features />
        <About />
      </Layout>
    </AuthProvider>
  );
}
