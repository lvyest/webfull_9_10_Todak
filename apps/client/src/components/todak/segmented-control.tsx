import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type TodakSegmentedColor = 'coral' | 'slate';
export type TodakSegmentedRadius = 'full' | 'lg' | 'md' | 'xl';
export type TodakSegmentedSize = 'md' | 'sm' | 'xs';
export type TodakSegmentedVariant = 'bordered' | 'solid' | 'underlined';

export type TodakSegmentedControlItem<TValue extends string> = {
  isDisabled?: boolean;
  icon?: ReactNode;
  label: ReactNode;
  value: TValue;
};

export type TodakSegmentedControlProps<TValue extends string> = {
  ariaLabel: string;
  className?: string;
  color?: TodakSegmentedColor;
  items: TodakSegmentedControlItem<TValue>[];
  onValueChange: (value: TValue) => void;
  radius?: TodakSegmentedRadius;
  size?: TodakSegmentedSize;
  value: TValue;
  variant?: TodakSegmentedVariant;
};

const wrapperVariantClassName: Record<TodakSegmentedVariant, string> = {
  bordered: 'border border-gray-200 bg-white p-0.5',
  solid: 'border border-slate-900 bg-slate-900 p-0.5',
  underlined: 'border-b border-gray-200 bg-transparent',
};

const radiusClassName: Record<TodakSegmentedRadius, string> = {
  full: 'rounded-full',
  lg: 'rounded-lg',
  md: 'rounded-md',
  xl: 'rounded-xl',
};

const sizeClassName: Record<TodakSegmentedSize, string> = {
  md: 'min-h-9 px-3 text-xs',
  sm: 'min-h-8 px-2.5 text-[11px]',
  xs: 'min-h-7 px-2 text-[10px]',
};

const activeClassName: Record<
  TodakSegmentedVariant,
  Record<TodakSegmentedColor, string>
> = {
  bordered: {
    coral: 'bg-todak-coral-500 text-white shadow-sm',
    slate: 'bg-slate-900 text-white shadow-sm',
  },
  solid: {
    coral: 'bg-todak-coral-500 text-white',
    slate: 'bg-white text-slate-900',
  },
  underlined: {
    coral: 'border-todak-coral-500 text-todak-coral-600',
    slate: 'border-slate-900 text-slate-900',
  },
};

const inactiveClassName: Record<TodakSegmentedVariant, string> = {
  bordered: 'text-slate-500 hover:bg-slate-50',
  solid: 'text-slate-300 hover:bg-white/10',
  underlined: 'border-transparent text-slate-500 hover:text-slate-800',
};

export function TodakSegmentedControl<TValue extends string>({
  ariaLabel,
  className,
  color = 'slate',
  items,
  onValueChange,
  radius = 'lg',
  size = 'md',
  value,
  variant = 'bordered',
}: TodakSegmentedControlProps<TValue>) {
  return (
    <div
      aria-label={ariaLabel}
      className={cn(
        'inline-flex overflow-hidden font-bold',
        wrapperVariantClassName[variant],
        variant !== 'underlined' && radiusClassName[radius],
        className,
      )}
    >
      {items.map(item => (
        <button
          aria-pressed={item.value === value}
          disabled={item.isDisabled}
          className={cn(
            'inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap border-b-2 outline-none transition-all focus-visible:ring-2 focus-visible:ring-todak-coral-500 disabled:pointer-events-none disabled:opacity-40',
            sizeClassName[size],
            variant !== 'underlined' && radiusClassName[radius],
            item.value === value
              ? activeClassName[variant][color]
              : inactiveClassName[variant],
          )}
          key={item.value}
          onClick={() => onValueChange(item.value)}
          type="button"
        >
          <span className="inline-flex items-center justify-center gap-1.5">
            {item.icon}
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
