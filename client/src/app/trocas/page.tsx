import Header from '@/components/Header';

export default function TrocasPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 flex flex-col gap-8">

        <div>
          <h1 className="text-3xl font-black tracking-widest text-white">Trocas e Devoluções</h1>
          <p className="text-purple-400 text-sm mt-1">Sua satisfação é nossa prioridade</p>
        </div>

        <div className="flex flex-col gap-4">

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-2">
            <h3 className="text-purple-400 font-bold">Prazo para troca ou devolução</h3>
            <p className="text-gray-400 text-sm">Você tem até 7 dias corridos após o recebimento do produto para solicitar troca ou devolução, conforme o Código de Defesa do Consumidor.</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-2">
            <h3 className="text-purple-400 font-bold">Como solicitar</h3>
            <p className="text-gray-400 text-sm">Entre em contato pelo email contato@nxshub.com informando seu número de pedido e o motivo da troca ou devolução.</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-2">
            <h3 className="text-purple-400 font-bold">Condições do produto</h3>
            <p className="text-gray-400 text-sm">O produto deve estar na embalagem original, sem sinais de uso e com todos os acessórios inclusos.</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-2">
            <h3 className="text-purple-400 font-bold">Reembolso</h3>
            <p className="text-gray-400 text-sm">Após a aprovação da devolução o reembolso é processado em até 10 dias úteis no mesmo método de pagamento utilizado.</p>
          </div>

        </div>

      </div>
    </main>
  );
}