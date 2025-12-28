import React from 'react';
import { cn } from '../../lib/utils';

export function Section({ children, className, id }) {
  return (
    <section id={id} className={cn("relative min-h-screen w-full flex flex-col justify-center px-6 py-24", className)}>
      {children}
    </section>
  );
}
