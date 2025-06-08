import WelcomeSection from "../components/WelcomeSection";
import GallerySection from "../components/GallerySection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full bg-gray-950">
      <WelcomeSection />
      <GallerySection />
    </main>
  );
}
