import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('text-2xl font-bold text-foreground font-headline', className)}>
      Ethereal Earrings
    </Link>
  );
}
