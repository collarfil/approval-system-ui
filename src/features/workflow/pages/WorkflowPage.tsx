import WorkflowTable from "../components/WorkflowTable";

export default function WorkflowPage() {

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">

                    Workflow Definitions

                </h1>

                <p className="mt-1 text-gray-500">

                    Manage workflow definitions for approval processes.

                </p>

            </div>

            <WorkflowTable />

        </div>

    );

}