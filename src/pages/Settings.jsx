import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Settings = () => {
    return (
        <Card className="bg-[#111111] border-[#2A2A2A]">
            <CardHeader>
                <CardTitle className="text-white">Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-gray-300">
                    Settings page content coming soon...
                </div>
            </CardContent>
        </Card>
    );
};

export default Settings;