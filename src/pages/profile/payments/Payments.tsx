import PrevNavbar from '@/components/Navbar/PrevNavbar';

import Pay from './components/Pay';
import PlanCard from './components/PlanCard';

const Payments = () => {
  return (
    <>
      <PrevNavbar title="구독" back />
      <div className="white-pageContainer pr-[1.462rem]">
        <PlanCard />
        <Pay />
      </div>
    </>
  );
};

export default Payments;
