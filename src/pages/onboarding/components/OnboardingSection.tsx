import { forwardRef } from 'react';

const OnboardingSection = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => {
  return (
    <section ref={ref} className="h-screen flex flex-col justify-between">
      {children}
    </section>
  );
});

export default OnboardingSection;
