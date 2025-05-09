import HeroSlider from "../components/HeroSlider";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <main>
      <HeroSlider images={[...]} />  {/* Carrusel de imágenes */}
      <CTA 
        title="Explora los destinos más increíbles" 
        buttonText="Ver destinos" 
      />
      <FeaturedDestinations />  {/* Componente con 3-4 destinos destacados */}
    </main>
  );
}