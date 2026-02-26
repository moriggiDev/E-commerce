import Image from 'next/image';

export default function HeroSection() {

  return (

    <section className="w-full overflow-hidden">

      <div className="flex">

        <div className="flex-1 relative h-52 sm:h-64 md:h-76">

          <Image src="/images/hero-left.png" alt="RTX e Headset" fill className="object-cover" />

          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-40" />

        </div>

        <div className="flex-[3] relative h-52 sm:h-64 md:h-76">

          <Image src="/images/hero-center.png" alt="Setup NXS" fill className="object-cover" />

        </div>

        <div className="flex-1 relative h-52 sm:h-64 md:h-76">

          <Image src="/images/hero-right.png" alt="PS5 Roxo" fill className="object-cover" />

          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black opacity-40" />

        </div>

      </div>

    </section>

  );

}