import PaginaCategoria from '@/components/PaginaCategoria';
import Footer from '@/components/Footer';
import Carousel from '@/components/Carousel';

export default function ConsolesPage() {
  return (
     <PaginaCategoria categoria="consoles" titulo="🕹️ Consoles" carousel={<Carousel />} footer={<Footer />} />
  );
}