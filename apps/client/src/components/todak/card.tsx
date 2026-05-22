import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type TodakCardPadding = 'lg' | 'md' | 'none' | 'sm';
export type TodakCardRadius =
  | 'lg'
  | 'md'
  | 'none'
  | 'sm'
  | 'xl'
  | '2xl'
  | '3xl';
export type TodakCardShadow = 'lg' | 'md' | 'none' | 'sm';
export type TodakCardVariant =
  | 'bordered'
  | 'flat'
  | 'shadow'
  | 'solid'
  | 'unstyled';

export type TodakCardProps = HTMLAttributes<HTMLDivElement> & {
  isHoverable?: boolean;
  isPressable?: boolean;
  padding?: TodakCardPadding;
  radius?: TodakCardRadius;
  shadow?: TodakCardShadow;
  tone?: 'card' | 'panel';
  variant?: TodakCardVariant;
};

export type TodakCardHeaderProps = HTMLAttributes<HTMLDivElement> & {
  description?: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
};

const variantClassName: Record<TodakCardVariant, string> = {
  bordered: 'border border-todak-line bg-white',
  flat: 'border border-transparent bg-slate-50',
  shadow: 'border border-gray-200/70 bg-white shadow-todak-soft',
  solid: 'border border-slate-900 bg-slate-900 text-white',
  unstyled: '',
};

const radiusClassName: Record<TodakCardRadius, string> = {
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  lg: 'rounded-lg',
  md: 'rounded-md',
  none: 'rounded-none',
  sm: 'rounded-sm',
  xl: 'rounded-xl',
};

const paddingClassName: Record<TodakCardPadding, string> = {
  lg: 'p-8',
  md: 'p-6',
  none: 'p-0',
  sm: 'p-4',
};

const shadowClassName: Record<TodakCardShadow, string> = {
  lg: 'shadow-todak-panel',
  md: 'shadow-todak-soft',
  none: 'shadow-none',
  sm: 'shadow-sm',
};

export function TodakCard({
  className,
  isHoverable = false,
  isPressable = false,
  padding = 'none',
  radius = '2xl',
  role,
  shadow,
  tabIndex,
  tone,
  variant,
  ...props
}: TodakCardProps) {
  const normalizedVariant =
    variant ?? (tone === 'panel' ? 'bordered' : 'shadow');
  const normalizedShadow =
    shadow ?? (normalizedVariant === 'shadow' ? 'md' : 'none');

  return (
    <div
      className={cn(
        'transition-all',
        variantClassName[normalizedVariant],
        radiusClassName[radius],
        paddingClassName[padding],
        shadowClassName[normalizedShadow],
        isHoverable && 'hover:-translate-y-0.5 hover:shadow-todak-panel',
        isPressable &&
          'cursor-pointer outline-none active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-todak-coral-500 focus-visible:ring-offset-2',
        className,
      )}
      role={isPressable ? 'button' : role}
      tabIndex={isPressable ? 0 : tabIndex}
      {...props}
    />
  );
}

export function TodakCardHeader({
  children,
  className,
  description,
  eyebrow,
  title,
  ...props
}: TodakCardHeaderProps) {
  return (
    <div className={cn('space-y-1', className)} {...props}>
      {eyebrow ? <p className="todak-section-label">{eyebrow}</p> : null}
      {title ? <h2 className="todak-title">{title}</h2> : null}
      {description ? <p className="todak-subcopy">{description}</p> : null}
      {children}
    </div>
  );
}

export function TodakCardBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5', className)} {...props} />;
}

export function TodakCardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <footer
      className={cn('border-t border-gray-100 bg-gray-50 px-5 py-4', className)}
      {...props}
    />
  );
}
