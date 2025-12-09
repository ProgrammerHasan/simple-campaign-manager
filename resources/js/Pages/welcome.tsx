import { dashboard, login, register } from '@/routes';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fbfaf5] to-[#f2f1eb] p-6 dark:from-[#0c0c0c] dark:to-[#181818]">
                <div className="mb-10 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md dark:bg-[#111]">
                        <Sparkles className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>

                    <p className="mt-6 text-[15px] font-medium text-emerald-700 dark:text-emerald-400">
                        Assalamu Alaikum wa Rahmatullah
                    </p>

                    <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[#1b1b18] dark:text-white">
                        Simple Campaign Manager
                    </h1>

                    <p className="mx-auto mt-3 max-w-xl text-sm text-[#6f6e6a] dark:text-[#b3b3b3]">
                        Alhamdulillah, you’ve reached a clean and modern
                        workspace designed to help you manage and send email
                        campaigns with clarity, ease, and excellence.
                    </p>
                </div>

                <div className="w-full max-w-xl rounded-2xl border border-[#ecebe6] bg-white p-8 shadow-[0_6px_24px_rgba(0,0,0,0.08)] dark:border-[#272727] dark:bg-[#151515]">
                    <h2 className="mb-3 flex items-center gap-2 text-xl font-medium text-[#1b1b18] dark:text-white">
                        <Mail className="h-5 w-5" />
                        Your Campaign Workspace
                    </h2>

                    <p className="text-[14px] leading-relaxed text-[#6e6d69] dark:text-[#a1a1a1]">
                        A streamlined, productive environment crafted to help
                        you launch successful email campaigns. Stay organized,
                        stay focused, and continue building with
                        excellence—InshaAllah.
                    </p>

                    {!auth.user && (
                        <div className="mt-7 flex flex-col items-center gap-4">
                            <Link
                                href={login()}
                                className="w-full rounded-lg bg-emerald-600 py-2.5 text-center font-medium text-white shadow-sm transition-all hover:bg-emerald-700"
                            >
                                Log In
                            </Link>

                            {canRegister && (
                                <Link
                                    href={register()}
                                    className="w-full rounded-lg border border-emerald-600 py-2.5 text-center font-medium text-emerald-700 transition-all hover:bg-emerald-50 dark:hover:bg-[#1d2b1d]"
                                >
                                    Create an Account
                                </Link>
                            )}
                        </div>
                    )}

                    {auth.user && (
                        <div className="mt-7 text-center">
                            <Link
                                href={dashboard()}
                                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white shadow-sm transition-all hover:bg-emerald-700"
                            >
                                Go to Dashboard
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    )}
                </div>

                <footer className="mt-12 text-xs text-[#8d8d85] dark:text-[#707070]">
                    © {new Date().getFullYear()} Simple Campaign Manager —
                    Built with gratitude. Alhamdulillah.
                </footer>
            </div>
        </>
    );
}
