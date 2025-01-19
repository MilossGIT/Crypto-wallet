import { Loader2 } from 'lucide-react';

const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
                <p className="text-gray-400">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingOverlay;