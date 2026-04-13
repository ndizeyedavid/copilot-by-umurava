import CategorySection from "./components/CategorySection";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

export default function page() {
  return (
    <div>
      <Header />
      <HeroSection />
      <CategorySection />
    </div>
  );
}
