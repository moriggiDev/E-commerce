import Header from '@/components/Header';
import InfoCard from '@/components/InfoCard';


const perguntas = [
  { titulo: 'Como rastrear meu pedido?', descricao: 'Após a confirmação do pagamento você receberá um código de rastreio por email em até 24 horas.' },
  { titulo: 'Quais são as formas de pagamento?', descricao: 'Aceitamos cartão de crédito, débito, Pix e boleto bancário.' },
  { titulo: 'Qual o prazo de entrega?', descricao: 'O prazo varia de 3 a 15 dias úteis dependendo da sua região.' },
  { titulo: 'Como cancelar um pedido?', descricao: 'Pedidos podem ser cancelados em até 24 horas após a confirmação pelo email contato@nxshub.com.' },
  { titulo: 'O site é seguro?', descricao: 'Sim! Utilizamos criptografia SSL e todas as transações são processadas com total segurança.' },
];

export default function AjudaView() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 flex flex-col gap-8">

        <div>
          <h1 className="text-3xl font-black tracking-widest text-white">Central de Ajuda</h1>
          <p className="text-indigo-600 text-sm mt-1">Como podemos te ajudar?</p>
        </div>

        <div className="flex flex-col gap-4">
          {perguntas.map((item, i) => (
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