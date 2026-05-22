import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import { TodakButton } from './button';

export type TodakModalBackdrop = 'blur' | 'opaque' | 'transparent';
export type TodakModalPlacement = 'center' | 'top';
export type TodakModalScrollBehavior = 'inside' | 'outside';
export type TodakModalSize = '2xl' | '3xl' | 'full' | 'lg' | 'md' | 'sm' | 'xl';

export type TodakModalProps = {
  backdrop?: TodakModalBackdrop;
  bodyClassName?: string;
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  footer?: ReactNode;
  headerClassName?: string;
  hideCloseButton?: boolean;
  onClose?: () => void;
  open: boolean;
  placement?: TodakModalPlacement;
  scrollBehavior?: TodakModalScrollBehavior;
  size?: TodakModalSize;
  title?: ReactNode;
};

const sizeClassName: Record<TodakModalSize, string> = {
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  full: 'max-h-dvh max-w-none rounded-none sm:m-4 sm:rounded-2xl',
  lg: 'max-w-lg',
  md: 'max-w-md',
  sm: 'max-w-sm',
  xl: 'max-w-xl',
};

const backdropClassName: Record<TodakModalBackdrop, string> = {
  blur: 'bg-black/50 backdrop-blur-xs',
  opaque: 'bg-black/55',
  transparent: 'bg-transparent',
};

export function TodakModal({
  backdrop = 'blur',
  bodyClassName,
  children,
  className,
  description,
  footer,
  headerClassName,
  hideCloseButton = false,
  onClose,
  open,
  placement = 'center',
  scrollBehavior = 'inside',
  size = 'md',
  title,
}: TodakModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex p-4 animate-todak-fade-in',
        placement === 'center'
          ? 'items-center justify-center'
          : 'items-start justify-center pt-16',
        scrollBehavior === 'outside' && 'overflow-y-auto',
        backdropClassName[backdrop],
      )}
      role="presentation"
    >
      <section
        aria-modal="true"
        className={cn(
          'todak-card flex w-full flex-col overflow-hidden',
          sizeClassName[size],
          scrollBehavior === 'inside' && 'max-h-[85dvh]',
          className,
        )}
        role="dialog"
      >
        {(title || description || (onClose && !hideCloseButton)) && (
          <header
            className={cn(
              'flex items-start justify-between gap-4 border-b border-gray-100 p-5',
              headerClassName,
            )}
          >
            <div className="space-y-1">
              {title ? (
                <h2 className="text-sm font-black text-slate-800">{title}</h2>
              ) : null}
              {description ? (
                <p className="text-[10px] leading-relaxed text-gray-400">
                  {description}
                </p>
              ) : null}
            </div>
            {onClose && !hideCloseButton ? (
              <TodakButton
                aria-label="모달 닫기"
                className="text-sm"
                color="neutral"
                onClick={onClose}
                radius="full"
                size="icon"
                variant="light"
              >
                ×
              </TodakButton>
            ) : null}
          </header>
        )}
        <div
          className={cn(
            scrollBehavior === 'inside' && 'overflow-y-auto',
            'p-5',
            bodyClassName,
          )}
        >
          {children}
        </div>
        {footer ? (
          <footer className="border-t border-gray-100 bg-gray-50 p-4">
            {footer}
          </footer>
        ) : null}
      </section>
    </div>
  );
}
