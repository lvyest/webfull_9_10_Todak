import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

import { cn } from '@/lib/cn';

export type TodakFieldRadius = 'full' | 'lg' | 'md' | 'none' | 'sm' | 'xl';
export type TodakFieldSize = 'lg' | 'md' | 'sm';
export type TodakFieldVariant = 'bordered' | 'flat' | 'faded' | 'underlined';

type FieldMetaProps = {
  description?: ReactNode;
  errorMessage?: ReactNode;
  isDisabled?: boolean;
  isInvalid?: boolean;
  label?: ReactNode;
};

type FieldChromeProps = FieldMetaProps & {
  className?: string;
  controlClassName?: string;
  radius?: TodakFieldRadius;
  size?: TodakFieldSize;
  variant?: TodakFieldVariant;
};

export type TodakFieldProps = LabelHTMLAttributes<HTMLLabelElement> & {
  hint?: ReactNode;
  isInvalid?: boolean;
  label: ReactNode;
};

export type TodakInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size'
> &
  FieldChromeProps & {
    endContent?: ReactNode;
    startContent?: ReactNode;
  };

export type TodakSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'color' | 'size'
> &
  FieldChromeProps;

export type TodakTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'color'
> &
  FieldChromeProps;

const controlBaseClassName =
  'w-full bg-transparent text-slate-700 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:text-gray-400';

const sizeClassName: Record<TodakFieldSize, string> = {
  lg: 'min-h-12 px-4 text-sm',
  md: 'min-h-10 px-3 text-xs',
  sm: 'min-h-8 px-2.5 text-[11px]',
};

const radiusClassName: Record<TodakFieldRadius, string> = {
  full: 'rounded-full',
  lg: 'rounded-lg',
  md: 'rounded-md',
  none: 'rounded-none',
  sm: 'rounded-sm',
  xl: 'rounded-xl',
};

const variantClassName: Record<TodakFieldVariant, string> = {
  bordered:
    'border border-gray-200 bg-white focus-within:border-todak-coral-500',
  faded:
    'border border-gray-200 bg-slate-50 focus-within:border-todak-coral-500 focus-within:bg-white',
  flat: 'border border-transparent bg-slate-100 focus-within:bg-white focus-within:ring-1 focus-within:ring-todak-coral-500',
  underlined:
    'rounded-none border-b border-gray-300 bg-transparent focus-within:border-todak-coral-500',
};

export function TodakField({
  children,
  className,
  hint,
  isInvalid = false,
  label,
  ...props
}: TodakFieldProps) {
  return (
    <label className={cn('block space-y-1.5', className)} {...props}>
      <span
        className={cn(
          'text-xs font-bold',
          isInvalid ? 'text-rose-600' : 'text-gray-600',
        )}
      >
        {label}
      </span>
      {children}
      {hint ? (
        <span
          className={cn(
            'block text-[10px]',
            isInvalid ? 'text-rose-500' : 'text-gray-400',
          )}
        >
          {hint}
        </span>
      ) : null}
    </label>
  );
}

export function TodakInput({
  className,
  controlClassName,
  description,
  disabled,
  endContent,
  errorMessage,
  isDisabled = false,
  isInvalid = false,
  label,
  radius = 'xl',
  size = 'md',
  startContent,
  variant = 'bordered',
  ...props
}: TodakInputProps) {
  const disabledState = disabled || isDisabled;
  const control = (
    <div
      className={cn(
        'flex items-center gap-2 transition-colors',
        sizeClassName[size],
        radiusClassName[radius],
        variantClassName[variant],
        isInvalid && 'border-rose-300 focus-within:border-rose-500',
        disabledState && 'cursor-not-allowed opacity-60',
        controlClassName,
      )}
    >
      {startContent}
      <input
        className={cn(controlBaseClassName, className)}
        disabled={disabledState}
        {...props}
      />
      {endContent}
    </div>
  );

  return renderFieldFrame({
    control,
    description,
    errorMessage,
    isInvalid,
    label,
  });
}

export function TodakSelect({
  children,
  className,
  controlClassName,
  description,
  disabled,
  errorMessage,
  isDisabled = false,
  isInvalid = false,
  label,
  radius = 'xl',
  size = 'md',
  variant = 'bordered',
  ...props
}: TodakSelectProps) {
  const disabledState = disabled || isDisabled;
  const control = (
    <select
      className={cn(
        'w-full appearance-none text-slate-700 outline-none transition-colors disabled:cursor-not-allowed disabled:text-gray-400',
        sizeClassName[size],
        radiusClassName[radius],
        variantClassName[variant],
        isInvalid && 'border-rose-300 focus:border-rose-500',
        disabledState && 'opacity-60',
        controlClassName,
        className,
      )}
      disabled={disabledState}
      {...props}
    >
      {children}
    </select>
  );

  return renderFieldFrame({
    control,
    description,
    errorMessage,
    isInvalid,
    label,
  });
}

export function TodakTextarea({
  className,
  controlClassName,
  description,
  disabled,
  errorMessage,
  isDisabled = false,
  isInvalid = false,
  label,
  radius = 'xl',
  size = 'md',
  variant = 'bordered',
  ...props
}: TodakTextareaProps) {
  const disabledState = disabled || isDisabled;
  const control = (
    <textarea
      className={cn(
        'min-h-32 w-full resize-none text-slate-700 outline-none transition-colors placeholder:text-gray-400 disabled:cursor-not-allowed disabled:text-gray-400',
        sizeClassName[size],
        radiusClassName[radius],
        variantClassName[variant],
        isInvalid && 'border-rose-300 focus:border-rose-500',
        disabledState && 'opacity-60',
        controlClassName,
        className,
      )}
      disabled={disabledState}
      {...props}
    />
  );

  return renderFieldFrame({
    control,
    description,
    errorMessage,
    isInvalid,
    label,
  });
}

function renderFieldFrame({
  control,
  description,
  errorMessage,
  isInvalid,
  label,
}: FieldMetaProps & { control: ReactNode }) {
  if (!label && !description && !errorMessage) {
    return control;
  }

  return (
    <div className="space-y-1.5">
      {label ? (
        <span
          className={cn(
            'block text-xs font-bold',
            isInvalid ? 'text-rose-600' : 'text-gray-600',
          )}
        >
          {label}
        </span>
      ) : null}
      {control}
      {errorMessage ? (
        <p className="text-[10px] font-semibold text-rose-500">
          {errorMessage}
        </p>
      ) : description ? (
        <p className="text-[10px] text-gray-400">{description}</p>
      ) : null}
    </div>
  );
}
