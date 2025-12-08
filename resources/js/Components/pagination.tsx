import { Button } from '@/components/ui/button';

interface PaginationProps {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export function Pagination({ links }: PaginationProps) {
    return (
        <div className="mt-4 flex gap-2">
            {links.map((link, i) => (
                <Button
                    key={i}
                    variant={link.active ? 'default' : 'outline'}
                    disabled={!link.url}
                    asChild
                    size="sm"
                >
                    <a
                        href={link.url ?? '#'}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                </Button>
            ))}
        </div>
    );
}
