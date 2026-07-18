import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import FeaturedProducts from "./FeaturedProducts";
import WhyCopper from "./WhyCopper";
import Footer from "../../layout/footer/Footer";
import Header from "../../layout/header/Header";

export default function HomePage() {
  return (
    <main dir="rtl">
      <Header />
      <HeroSection />

      <CategorySection />

      <FeaturedProducts />

      <WhyCopper />
      <Footer />
    </main>
  );
}
