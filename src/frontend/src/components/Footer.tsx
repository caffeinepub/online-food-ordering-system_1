import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'food-ordering-system'
  );

  return (
    <footer className="border-t border-border/40 bg-muted/30 mt-auto">
      <div className="container py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <p className="text-base font-semibold text-foreground">
              College Mini Project – Online Food Ordering System
            </p>
            <p className="text-lg font-semibold text-primary">Thank You</p>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 fill-primary text-primary" />
            <span>using</span>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </div>
          
          <p className="text-xs text-muted-foreground">© {currentYear} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
