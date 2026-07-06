import RequestTable
from "../components/RequestTable";

export default function RequestPage() {

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">

                    Requests

                </h1>

                <p className="mt-1 text-gray-500">

                    Submit and monitor approval requests.

                </p>

            </div>

            <RequestTable />

        </div>

    );

}