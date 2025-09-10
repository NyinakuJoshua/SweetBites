import { CakeCategoryPage } from '@/components/CakeCategoryPage';
import seasonalHero from '@/assets/seasonal-hero.jpg';

export default function SeasonalCakes() {
  return (
    <CakeCategoryPage
      category="seasonal"
      title="Seasonal Cakes"
      description="Celebrate the flavors of each season with our specially crafted seasonal cakes. From fresh spring berries to warm autumn spices, our seasonal selection brings the best of each time of year to your celebrations."
      heroImage={seasonalHero}
    />
  );
}