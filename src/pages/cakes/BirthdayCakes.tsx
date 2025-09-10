import { CakeCategoryPage } from '@/components/CakeCategoryPage';
import birthdayHero from '@/assets/birthday-hero.jpg';

export default function BirthdayCakes() {
  return (
    <CakeCategoryPage
      category="birthday"
      title="Birthday Cakes"
      description="Make every birthday celebration extra special with our custom birthday cakes. From fun and colorful designs to elegant and sophisticated styles, we create the perfect centerpiece for your loved one's special day."
      heroImage={birthdayHero}
    />
  );
}