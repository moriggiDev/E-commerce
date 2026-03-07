import Header from '@/components/Header';
import InfoCard from '@/components/InfoCard';

const politicas = [
  { titulo: 'Prazo para troca ou devolução', descricao: 'Você tem até 7 dias corridos após o recebimento do produto para solicitar troca ou devolução, conforme o Código de Defesa do Consumidor.' },
  { titulo: 'Como solicitar', descricao: 'Entre em contato pelo email contato@nxshub.com informando seu número de pedido e o motivo da troca ou devolução.' },
  { titulo: 'Condições do produto', descricao: 'O produto deve estar na embalagem original, sem sinais de uso e com todos os acessórios inclusos.' },
  { titulo: 'Reembolso', descricao: 'Após a aprovação da devolução o reembolso é processado em até 10 dias úteis no mesmo método de pagamento utilizado.' },
];

export default function TrocasView() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 flex flex-col gap-8">

        <div>
          <h1 className="text-3xl font-black tracking-widest text-white">Trocas e Devoluções</h1>
          <p className="text-indigo-600 text-sm mt-1">Sua satisfação é nossa prioridade</p>
        </div>

        <div className="flex flex-col gap-4">
          {politicas.map((item, i) => (
            <InfoCard
              key={i}
              titulo={item.titulo}
              descricao={item.descricao}
            />
          ))}
        </div>

      </div>
    </main>
  );
}