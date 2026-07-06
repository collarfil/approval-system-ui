import RoleTable from "../components/RoleTable";

export default function RolePage() {

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">
                    Roles
                </h1>

                <p className="mt-1 text-gray-500">
                    Manage system roles.
                </p>

            </div>

            <RoleTable />

        </div>

    );
}