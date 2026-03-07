import Header from '@/components/Header';
import InfoCard from '@/components/InfoCard';


const contatos = [
    { icon: '📧', titulo: 'Email', descricao: 'contato@nxshub.com', extra: 'Respondemos em até 24 horas' },
    { icon: '💬', titulo: 'WhatsApp', descricao: '(11) 99999-9999', extra: 'Seg a Sex das 9h às 18h' },
    { icon: '📱', titulo: 'Redes Sociais', descricao: '@nxshub em todas as plataformas', extra: 'Instagram, Twitter, Discord' },
    { icon: '🕐', titulo: 'Horário de Atendimento', descricao: 'Segunda a Sexta: 9h às 18h', extra: 'Sábado: 9h às 13h' },
];

export default function ContatoView() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 flex flex-col gap-8">

        <div>
          <h1 className="text-3xl font-black tracking-widest text-white">Fale Conosco</h1>
          <p className="text-indigo-400 text-sm mt-1">Estamos aqui para te ajudar</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contatos.map((item, i) => (
            <InfoCard
              key={i}
              icon={item.icon}
              titulo={item.titulo}
              descricao={item.descricao}
              extra={item.extra}
            />
          ))}
        </div>

      </div>
    </main>
  );
}