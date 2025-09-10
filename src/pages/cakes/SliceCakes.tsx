import { CakeCategoryPage } from '@/components/CakeCategoryPage';
import sliceHero from '@/assets/slice-hero.jpg';

export default function SliceCakes() {
  return (
    <CakeCategoryPage
      category="slice"
      title="Slice Cakes"
      description="Perfect for smaller gatherings or when you want to try multiple flavors. Our individual cake slices offer all the quality and taste of our full-sized cakes in convenient, personal portions."
      heroImage={sliceHero}
    />
  );
}