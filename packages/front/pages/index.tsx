import { useState } from 'react';
import Cryptos from '../components/cryptos/Cryptos';
import Header from '../components/header/Header';
import Layout from '../components/layout/Layout';

export default function Home() {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  return (
    <Layout title="Main page">
      <div className="container mx-auto relative">
        <Header isOptionsOpen={isOptionsOpen} setIsOptionsOpen={setIsOptionsOpen} />
        <Cryptos isMenuOpen={isOptionsOpen} />
      </div>
    </Layout>
  );
}
