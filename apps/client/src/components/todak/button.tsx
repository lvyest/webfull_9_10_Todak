import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type TodakButtonColor =
  | 'coral'
  | 'danger'
  | 'neutral'
  | 'slate'
  | 'success'
  | 'warning';
export type TodakButtonRadius = 'full' | 'lg' | 'md' | 'none' | 'sm' | 'xl';
export type TodakButtonSize = 'icon' | 'lg' | 'md' | 'sm' | 'xs';
export type TodakButtonVariant =
  | 'bordered'
  | 'dark'
  | 'flat'
  | 'ghost'
  | 'light'
  | 'primary'
  | 'shadow'
  | 'soft'
  | 'solid';
type TodakButtonResolvedVariant = Exclude<
  TodakButtonVariant,
  'dark' | 'primary' | 'soft'
>;

export type TodakButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> & {
  color?: TodakButtonColor;
  endContent?: ReactNode;
  fullWidth?: boolean;
  icon?: ReactNode;
  isDisabled?: boolean;
  isIconOnly?: boolean;
  isLoading?: boolean;
  radius?: TodakButtonRadius;
  size?: TodakButtonSize;
  spinner?: ReactNode;
  startContent?: ReactNode;
  variant?: TodakButtonVariant;
};

const baseClassName =
  'relative inline-flex shrink-0 items-center justify-center whitespace-nowrap font-black tracking-normal outline-none transition-all focus-visible:ring-2 focus-visible:ring-todak-coral-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45';

const sizeClassName: Record<TodakButtonSize, string> = {
  icon: 'size-10 p-0 text-sm',
  lg: 'h-12 gap-2.5 px-5 text-sm',
  md: 'h-10 gap-2 px-4 text-xs',
  sm: 'h-8 gap-1.5 px-3 text-[11px]',
  xs: 'h-7 gap-1 px-2.5 text-[10px]',
};

const radiusClassName: Record<TodakButtonRadius, string> = {
  full: 'rounded-full',
  lg: 'rounded-lg',
  md: 'rounded-md',
  none: 'rounded-none',
  sm: 'rounded-sm',
  xl: 'rounded-xl',
};

const variantClassName: Record<
  TodakButtonResolvedVariant,
  Record<TodakButtonColor, string>
> = {
  bordered: {
    coral:
      'border border-todak-coral-200 bg-white text-todak-coral-600 hover:bg-todak-coral-50',
    danger: 'border border-rose-200 bg-white text-rose-600 hover:bg-rose-50',
    neutral: 'border border-gray-200 bg-white text-slate-700 hover:bg-gray-100',
    slate: 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-100',
    success:
      'border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50',
    warning:
      'border border-amber-200 bg-white text-amber-700 hover:bg-amber-50',
  },
  flat: {
    coral: 'bg-todak-coral-50 text-todak-coral-600 hover:bg-todak-coral-100',
    danger: 'bg-rose-50 text-rose-600 hover:bg-rose-100',
    neutral: 'bg-gray-100 text-slate-700 hover:bg-gray-200',
    slate: 'bg-slate-100 text-slate-800 hover:bg-slate-200',
    success: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
    warning: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
  },
  ghost: {
    coral:
      'border border-todak-coral-500 bg-transparent text-todak-coral-600 hover:bg-todak-coral-50',
    danger:
      'border border-rose-500 bg-transparent text-rose-600 hover:bg-rose-50',
    neutral:
      'border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-100',
    slate:
      'border border-slate-800 bg-transparent text-slate-900 hover:bg-slate-100',
    success:
      'border border-emerald-500 bg-transparent text-emerald-600 hover:bg-emerald-50',
    warning:
      'border border-amber-500 bg-transparent text-amber-700 hover:bg-amber-50',
  },
  light: {
    coral: 'bg-transparent text-todak-coral-600 hover:bg-todak-coral-50',
    danger: 'bg-transparent text-rose-600 hover:bg-rose-50',
    neutral: 'bg-transparent text-slate-600 hover:bg-gray-100',
    slate: 'bg-transparent text-slate-900 hover:bg-slate-100',
    success: 'bg-transparent text-emerald-600 hover:bg-emerald-50',
    warning: 'bg-transparent text-amber-700 hover:bg-amber-50',
  },
  shadow: {
    coral:
      'bg-todak-coral-500 text-white shadow-lg shadow-todak-coral-500/25 hover:bg-todak-coral-600',
    danger:
      'bg-rose-500 text-white shadow-lg shadow-rose-500/25 hover:bg-rose-600',
    neutral: 'bg-white text-slate-700 shadow-todak-soft hover:bg-gray-50',
    slate:
      'bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800',
    success:
      'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600',
    warning:
      'bg-amber-400 text-slate-900 shadow-lg shadow-amber-400/25 hover:bg-amber-500',
  },
  solid: {
    coral: 'bg-todak-coral-500 text-white shadow-md hover:bg-todak-coral-600',
    danger: 'bg-rose-500 text-white shadow-md hover:bg-rose-600',
    neutral: 'bg-gray-100 text-slate-700 hover:bg-gray-200',
    slate: 'bg-slate-900 text-white shadow-md hover:bg-slate-800',
    success: 'bg-emerald-500 text-white shadow-md hover:bg-emerald-600',
    warning: 'bg-amber-400 text-slate-900 shadow-md hover:bg-amber-500',
  },
};

const aliasVariant = {
  dark: { color: 'slate', variant: 'solid' },
  primary: { color: 'coral', variant: 'solid' },
  soft: { color: 'neutral', variant: 'bordered' },
} satisfies Record<
  Extract<TodakButtonVariant, 'dark' | 'primary' | 'soft'>,
  { color: TodakButtonColor; variant: TodakButtonResolvedVariant }
>;

export function TodakButton({
  children,
  className,
  color = 'coral',
  disabled,
  endContent,
  fullWidth = false,
  icon,
  isDisabled = false,
  isIconOnly = false,
  isLoading = false,
  radius = 'xl',
  size = 'md',
  spinner,
  startContent,
  type = 'button',
  variant = 'primary',
  ...props
}: TodakButtonProps) {
  const alias =
    variant in aliasVariant
      ? aliasVariant[variant as keyof typeof aliasVariant]
      : null;
  const normalizedVariant = (alias?.variant ??
    variant) as TodakButtonResolvedVariant;
  const normalizedColor = alias?.color ?? color;
  const disabledState = disabled || isDisabled || isLoading;
  const iconOnly = isIconOnly || size === 'icon';
  const loadingSpinner = spinner ?? (
    <span
      aria-hidden="true"
      className="size-3.5 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  );

  return (
    <button
      aria-busy={isLoading || undefined}
      className={cn(
        baseClassName,
        sizeClassName[size],
        radiusClassName[radius],
        variantClassName[normalizedVariant][normalizedColor],
        fullWidth && 'w-full',
        iconOnly && 'aspect-square gap-0 px-0',
        className,
      )}
      disabled={disabledState}
      type={type}
      {...props}
    >
      {isLoading ? loadingSpinner : (startContent ?? icon)}
      {iconOnly ? <span className="sr-only">{children}</span> : children}
      {!iconOnly && endContent ? endContent : null}
    </button>
  );
}
