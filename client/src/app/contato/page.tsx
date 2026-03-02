import Header from '@/components/Header';

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 flex flex-col gap-8">

        <div>
          <h1 className="text-3xl font-black tracking-widest text-white">Fale Conosco</h1>
          <p className="text-purple-400 text-sm mt-1">Estamos aqui para te ajudar</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-2">
            <span className="text-2xl">📧</span>
            <h3 className="text-purple-400 font-bold">Email</h3>
            <p className="text-gray-400 text-sm">contato@nxshub.com</p>
            <p className="text-gray-600 text-xs">Respondemos em até 24 horas</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-2">
            <span className="text-2xl">💬</span>
            <h3 className="text-purple-400 font-bold">WhatsApp</h3>
            <p className="text-gray-400 text-sm">(11) 99999-9999</p>
            <p className="text-gray-600 text-xs">Seg a Sex das 9h às 18h</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-2">
            <span className="text-2xl">📱</span>
            <h3 className="text-purple-400 font-bold">Redes Sociais</h3>
            <p className="text-gray-400 text-sm">@nxshub em todas as plataformas</p>
            <p className="text-gray-600 text-xs">Instagram, Twitter, Discord</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-2">
            <span className="text-2xl">🕐</span>
            <h3 className="text-purple-400 font-bold">Horário de Atendimento</h3>
            <p className="text-gray-400 text-sm">Segunda a Sexta: 9h às 18h</p>
            <p className="text-gray-600 text-xs">Sábado: 9h às 13h</p>
          </div>

        </div>

      </div>
    </main>
  );
}