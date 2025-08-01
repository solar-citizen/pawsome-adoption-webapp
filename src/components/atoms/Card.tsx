import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

export type CardPartProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

function Card({ className, children, ...props }: CardPartProps) {
  return (
    <div
      className={clsx('rounded-lg border border-gray-200 bg-white shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...props }: CardPartProps) {
  return (
    <div className={clsx('flex flex-col space-y-1.5 p-6', className)} {...props}>
      {children}
    </div>
  );
}

function CardContent({ className, children, ...props }: CardPartProps) {
  return (
    <div className={clsx('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className, children, ...props }: CardPartProps) {
  return (
    <h2
      className={clsx('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children ?? 'Details'}
    </h2>
  );
}

function CardDescription({ className, children, ...props }: CardPartProps) {
  return (
    <p className={clsx('text-sm text-gray-600', className)} {...props}>
      {children}
    </p>
  );
}

export { Card, CardContent, CardDescription, CardHeader, CardTitle };
