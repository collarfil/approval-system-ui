import DepartmentTable from "../components/DepartmentTable";

export default function DepartmentPage() {
    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">
                    Departments
                </h1>

                <p className="mt-1 text-gray-500">
                    Manage departments within the approval system.
                </p>

            </div>

            <DepartmentTable />

        </div>
    );
}