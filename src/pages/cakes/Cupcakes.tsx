import { CakeCategoryPage } from '@/components/CakeCategoryPage';
import cupcakesHero from '@/assets/cupcakes-hero.jpg';

export default function Cupcakes() {
  return (
    <CakeCategoryPage
      category="cupcakes"
      title="Cupcakes"
      description="Delight in our artisan cupcakes, perfect for parties, events, or individual treats. Each cupcake is hand-decorated and made with premium ingredients, offering the perfect balance of cake, frosting, and beautiful presentation."
      heroImage={cupcakesHero}
    />
  );
}