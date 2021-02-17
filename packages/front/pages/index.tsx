import About from '../components/about/About';
import Cryptos from '../components/cryptos/Cryptos';
import Features from '../components/features/Features';
import Layout from '../components/layout/Layout';
import { AssetProvider } from '../context/assetContext';
import { AuthProvider } from '../context/authContext';
import { CryptosProvider } from '../context/cryptosContext';

export default function Home() {
  return (
    <AuthProvider>
      <CryptosProvider>
        <AssetProvider>
          <Layout title="Main page">
            <Cryptos />
            <Features />
            <About />
          </Layout>
        </AssetProvider>
      </CryptosProvider>
    </AuthProvider>
  );
}
