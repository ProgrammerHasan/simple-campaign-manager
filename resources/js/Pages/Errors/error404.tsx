import { Button } from '@/components/ui/button';
import campaigns from '@/routes/campaigns';
import { Head, Link } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';

export default function Error404() {
    return (
        <>
            <Head title="Page Not Found" />

            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
                <AlertTriangle className="mb-6 h-16 w-16 text-red-500" />
                <h1 className="mb-2 text-4xl font-bold text-gray-900">404</h1>
                <p className="mb-6 max-w-md text-center text-lg text-gray-600">
                    Oops! The page you are looking for does not exist. It might
                    have been moved or deleted.
                </p>
                <Button asChild variant="default" size="lg">
                    <Link href={campaigns.index()}>Go Back to Campaigns</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="mt-4">
                    <Link href={campaigns.create()}>Create New Campaign</Link>
                </Button>
            </div>
        </>
    );
}
