import type { HTMLAttributes, ReactNode } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/cn';

export type TodakAvatarColor = 'coral' | 'neutral' | 'slate';
export type TodakAvatarRadius = 'full' | 'lg' | 'md' | 'sm';
export type TodakAvatarSize = 'lg' | 'md' | 'sm' | 'xl' | 'xs';

export type TodakAvatarProps = HTMLAttributes<HTMLDivElement> & {
  avatar?: ReactNode;
  color?: TodakAvatarColor;
  isOwn?: boolean;
  label?: string;
  name?: string;
  radius?: TodakAvatarRadius;
  size?: TodakAvatarSize;
  src?: string;
  status?: ReactNode;
};

const sizeClassName: Record<TodakAvatarSize, string> = {
  lg: 'size-11 text-2xl',
  md: 'size-9 text-lg',
  sm: 'size-7 text-sm',
  xl: 'size-14 text-3xl',
  xs: 'size-6 text-xs',
};

const radiusClassName: Record<TodakAvatarRadius, string> = {
  full: 'rounded-full',
  lg: 'rounded-lg',
  md: 'rounded-md',
  sm: 'rounded-sm',
};

const colorClassName: Record<TodakAvatarColor, string> = {
  coral: 'border-todak-coral-500 bg-todak-coral-50 text-todak-coral-600',
  neutral: 'border-gray-200 bg-white text-slate-700',
  slate: 'border-slate-300 bg-slate-900 text-white',
};

export function TodakAvatar({
  avatar,
  className,
  color = 'neutral',
  isOwn = false,
  label,
  name,
  radius = 'full',
  size = 'md',
  src,
  status,
  ...props
}: TodakAvatarProps) {
  const initials = name?.trim().slice(0, 2).toUpperCase();
  const content = src ? (
    <Image
      alt={name ?? ''}
      className="object-cover"
      fill
      sizes="56px"
      src={src}
      unoptimized
    />
  ) : (
    (avatar ?? initials)
  );

  return (
    <div className={cn('inline-flex flex-col items-center gap-1', className)}>
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden border shadow-sm',
          colorClassName[isOwn ? 'coral' : color],
          isOwn && 'border-2 shadow-md',
          radiusClassName[radius],
          sizeClassName[size],
        )}
        {...props}
      >
        {content}
        {status ? (
          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full border border-gray-200 bg-white text-[10px] shadow-sm">
            {status}
          </span>
        ) : null}
      </div>
      {label ? (
        <span
          className={cn(
            'rounded px-1.5 text-[9px] font-bold text-white shadow-sm',
            isOwn ? 'bg-todak-coral-500' : 'bg-slate-800',
          )}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
