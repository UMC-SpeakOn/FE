import type { ReactNode } from 'react';

import Title from './Title';

type ReportSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

const ReportSection = ({
  title,
  description,
  children,
}: ReportSectionProps) => {
  return (
    <section className="w-full flex flex-col gap-[1.044rem]">
      <Title title={title} description={description} />

      {children}
    </section>
  );
};

export default ReportSection;
