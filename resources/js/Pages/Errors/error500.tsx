import { Button } from '@/components/ui/button';
import campaigns from '@/routes/campaigns';
import { Head, Link } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';

export default function Error500() {
    return (
        <>
            <Head title="Server Error" />

            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
                <AlertCircle className="mb-6 h-16 w-16 text-red-500" />
                <h1 className="mb-2 text-4xl font-bold text-gray-900">500</h1>
                <p className="mb-6 max-w-md text-center text-lg text-gray-600">
                    Something went wrong on our server. Please try again later
                    or contact support.
                </p>
                <Button asChild variant="default" size="lg">
                    <Link href={campaigns.index()}>Back to Campaigns</Link>
                </Button>
            </div>
        </>
    );
}
