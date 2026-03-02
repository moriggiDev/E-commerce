import Header from '@/components/Header';

export default function AjudaPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 flex flex-col gap-8">

        <div>
          <h1 className="text-3xl font-black tracking-widest text-white">Central de Ajuda</h1>
          <p className="text-purple-400 text-sm mt-1">Como podemos te ajudar?</p>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { pergunta: 'Como rastrear meu pedido?', resposta: 'Após a confirmação do pagamento você receberá um código de rastreio por email em até 24 horas.' },
            { pergunta: 'Quais são as formas de pagamento?', resposta: 'Aceitamos cartão de crédito, débito, Pix e boleto bancário.' },
            { pergunta: 'Qual o prazo de entrega?', resposta: 'O prazo varia de 3 a 15 dias úteis dependendo da sua região.' },
            { pergunta: 'Como cancelar um pedido?', resposta: 'Pedidos podem ser cancelados em até 24 horas após a confirmação pelo email contato@nxshub.com.' },
            { pergunta: 'O site é seguro?', resposta: 'Sim! Utilizamos criptografia SSL e todas as transações são processadas com total segurança.' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-2">
              <h3 className="text-purple-400 font-bold">{item.pergunta}</h3>
              <p className="text-gray-400 text-sm">{item.resposta}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}