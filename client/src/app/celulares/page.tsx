import PaginaCategoria from '@/components/PaginaCategoria';
import Carousel from '@/components/Carousel';

export default function CelularesPage() {
  return (
     <PaginaCategoria categoria="celulares" titulo="📱 Celulares" carousel={<Carousel />} />
  );
}