import { useState } from "react";

import { Plus } from "lucide-react";

import { useRequests } from "../hooks/useRequests";

import CreateRequestModal from "./CreateRequestModal";

import RequestStatusBadge from "./RequestStatusBadge";

export default function RequestTable() {

    const [open, setOpen] =
        useState(false);

    const {

        data,

        isLoading,

        isError,

    } = useRequests();

    if (isLoading)
        return <p>Loading...</p>;

    if (isError)
        return <p>Failed to load requests.</p>;

    return (

        <>

            <div className="rounded-lg bg-white shadow">

                <div className="flex items-center justify-between border-b p-6">

                    <h2 className="text-2xl font-semibold">

                        Requests

                    </h2>

                    <button
                        onClick={() =>
                            setOpen(true)
                        }
                        className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white"
                    >

                        <Plus size={18} />

                        New Request

                    </button>

                </div>

                <table className="w-full">

                    <thead>

                        <tr>

                            <th>Title</th>

                            <th>Amount</th>

                            <th>Status</th>

                            <th>Created</th>

                        </tr>

                    </thead>

                    <tbody>

                        {data?.map(r => (

                            <tr key={r.id}>

                                <td>{r.title}</td>

                                <td>

                                    ₦{r.amount.toLocaleString()}

                                </td>

                                <td>

                                    <RequestStatusBadge
                                        status={r.status}
                                    />

                                </td>

                                <td>

                                    {new Date(
                                        r.createdAt
                                    ).toLocaleDateString()}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <CreateRequestModal

                open={open}

                onClose={() =>
                    setOpen(false)
                }

            />

        </>

    );

}