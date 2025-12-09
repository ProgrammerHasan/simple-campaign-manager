import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
 children,
 title,
 description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#faf8f3] to-[#f0eee8] p-6 dark:from-[#0b0b0a] dark:to-[#131312]">
            <div className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <Link
                        href={home()}
                        className="inline-flex flex-col items-center gap-2"
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md dark:bg-[#111]">
                            <AppLogoIcon className="size-10 text-emerald-600 dark:text-emerald-400" />
                        </div>
                    </Link>

                    <p className="mt-4 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                        Assalamu Alaikum
                    </p>
                    <p className="text-[12px] text-muted-foreground dark:text-[#9ca39c]">
                        “In the name of Allah, the Most Gracious, the Most
                        Merciful”
                    </p>
                </div>

                <div className="rounded-2xl border border-[#ecebe6] bg-white p-8 shadow-[0_8px_25px_rgba(0,0,0,0.08)] backdrop-blur-sm dark:border-[#272727] dark:bg-[#161616] dark:shadow-[0_8px_25px_rgba(0,0,0,0.35)]">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-semibold text-[#1b1b18] dark:text-white">
                            {title}
                        </h1>
                        {description && (
                            <p className="mt-1 text-sm text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>
                    <div className="mt-4">{children}</div>
                </div>

                <p className="mt-6 text-center text-xs text-[#7c7c75] dark:text-[#8c8c8c]">
                    © {new Date().getFullYear()} Simple Campaign Manager —
                    Built with gratitude. Alhamdulillah.
                </p>
            </div>
        </div>
    );
}
