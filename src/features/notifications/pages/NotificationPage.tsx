import NotificationTable from "../components/NotificationTable";

export default function NotificationPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Notifications</h1>
                <p className="mt-1 text-gray-500">Manage system notifications.</p>
            </div>
            <NotificationTable />
        </div>
    );
}