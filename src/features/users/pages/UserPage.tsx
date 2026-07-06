import UserTable from "../components/UserTable";

export default function UserPage() {

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">

                    Users

                </h1>

                <p className="mt-1 text-gray-500">

                    Manage system users.

                </p>

            </div>

            <UserTable />

        </div>

    );

}