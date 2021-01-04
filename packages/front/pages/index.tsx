import Cryptos from '../components/cryptos/Cryptos';

export default function Home() {
  return (
    <div className="container">
      <section className="py-4">
        <div className="border-b-2 py-2">
          <h1 className="font-mono text-2xl text-center ">Cryptocurrences</h1>
          <button>
            <div className="w-7 h-7 absolute top-4 right-4 fill-current text-gray-500 hover:text-gray-900">
              Options
            </div>
          </button>
        </div>
        <Cryptos />
      </section>
    </div>
  );
}
