import { GallerySection } from "@/components/sections/gallery-section";
import { CollectionSection } from "@/components/sections/collection-section";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <GallerySection />
      <CollectionSection />
    </main>
  );
}
