import PaginaCategoria from '@/components/PaginaCategoria';
import Carousel from '@/components/Carousel';

export default function AcessoriosPage() {
  return (
    <>
      <PaginaCategoria categoria="acessorios" titulo="🖱️ Acessórios" carousel={<Carousel />} />
    </>
  );
}