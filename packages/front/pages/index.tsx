import Cryptos from '../components/cryptos/Cryptos';
import Layout from '../components/layout/Layout';
import { AuthProvider } from '../context/authContext';

export default function Home() {
  return (
    <AuthProvider>
      <Layout title="Main page">
        <Cryptos />
      </Layout>
    </AuthProvider>
  );
}
