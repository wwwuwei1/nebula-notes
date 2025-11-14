import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  width?: 'lg' | 'xl';
  className?: string;
}>;

export const PageContainer = ({ children, width = 'lg', className = '' }: Props) => {
  const widthClass = width === 'xl' ? 'max-w-6xl' : 'max-w-5xl';
  return (
    <section className={`mx-auto w-full ${widthClass} px-4 py-12 ${className}`}>
      {children}
    </section>
  );
};

