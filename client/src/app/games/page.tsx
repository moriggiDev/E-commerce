import PaginaCategoria from '@/components/PaginaCategoria';
import Carousel from '@/components/Carousel';

export default function GamesPage() {
  return (
  <PaginaCategoria categoria="games" titulo="🎮 Games" carousel={<Carousel />} />
  )
}