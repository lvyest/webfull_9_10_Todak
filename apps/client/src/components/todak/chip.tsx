import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type TodakChipColor =
  | 'coral'
  | 'danger'
  | 'neutral'
  | 'slate'
  | 'success'
  | 'warning';
export type TodakChipRadius = 'full' | 'lg' | 'md' | 'sm';
export type TodakChipSize = 'md' | 'sm' | 'xs';
export type TodakChipVariant = 'bordered' | 'dot' | 'flat' | 'solid';

export type TodakChipProps = HTMLAttributes<HTMLSpanElement> & {
  color?: TodakChipColor;
  endContent?: ReactNode;
  icon?: ReactNode;
  onClose?: () => void;
  radius?: TodakChipRadius;
  size?: TodakChipSize;
  startContent?: ReactNode;
  tone?: 'coral' | 'neutral';
  variant?: TodakChipVariant;
};

const sizeClassName: Record<TodakChipSize, string> = {
  md: 'min-h-6 px-2.5 text-[10px]',
  sm: 'min-h-5 px-2 text-[9px]',
  xs: 'min-h-4 px-1.5 text-[8px]',
};

const radiusClassName: Record<TodakChipRadius, string> = {
  full: 'rounded-full',
  lg: 'rounded-lg',
  md: 'rounded-md',
  sm: 'rounded-sm',
};

const variantClassName: Record<
  TodakChipVariant,
  Record<TodakChipColor, string>
> = {
  bordered: {
    coral: 'border border-todak-coral-200 bg-white text-todak-coral-600',
    danger: 'border border-rose-200 bg-white text-rose-600',
    neutral: 'border border-gray-200 bg-white text-slate-500',
    slate: 'border border-slate-300 bg-white text-slate-700',
    success: 'border border-emerald-200 bg-white text-emerald-600',
    warning: 'border border-amber-200 bg-white text-amber-700',
  },
  dot: {
    coral: 'bg-todak-coral-50 text-todak-coral-600',
    danger: 'bg-rose-50 text-rose-600',
    neutral: 'bg-slate-100 text-slate-600',
    slate: 'bg-slate-100 text-slate-800',
    success: 'bg-emerald-50 text-emerald-600',
    warning: 'bg-amber-50 text-amber-700',
  },
  flat: {
    coral: 'bg-todak-coral-50 text-todak-coral-600',
    danger: 'bg-rose-50 text-rose-600',
    neutral: 'bg-slate-100 text-slate-500',
    slate: 'bg-slate-100 text-slate-800',
    success: 'bg-emerald-50 text-emerald-600',
    warning: 'bg-amber-50 text-amber-700',
  },
  solid: {
    coral: 'bg-todak-coral-500 text-white',
    danger: 'bg-rose-500 text-white',
    neutral: 'bg-slate-200 text-slate-700',
    slate: 'bg-slate-900 text-white',
    success: 'bg-emerald-500 text-white',
    warning: 'bg-amber-400 text-slate-900',
  },
};

const dotClassName: Record<TodakChipColor, string> = {
  coral: 'bg-todak-coral-500',
  danger: 'bg-rose-500',
  neutral: 'bg-slate-400',
  slate: 'bg-slate-900',
  success: 'bg-emerald-500',
  warning: 'bg-amber-400',
};

export function TodakChip({
  children,
  className,
  color,
  endContent,
  icon,
  onClose,
  radius = 'full',
  size = 'md',
  startContent,
  tone = 'neutral',
  variant = 'flat',
  ...props
}: TodakChipProps) {
  const normalizedColor = color ?? tone;

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center gap-1 font-bold leading-none',
        sizeClassName[size],
        radiusClassName[radius],
        variantClassName[variant][normalizedColor],
        className,
      )}
      {...props}
    >
      {variant === 'dot' ? (
        <span
          className={cn('size-1.5 rounded-full', dotClassName[normalizedColor])}
        />
      ) : null}
      {startContent ?? icon}
      {children}
      {endContent}
      {onClose ? (
        <button
          aria-label="칩 닫기"
          className="-mr-1 rounded-full px-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
      ) : null}
    </span>
  );
}
