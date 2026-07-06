interface Props {
    status: string;
}

export default function RequestStatusBadge({
    status,
}: Props) {

    const color = (() => {

        switch (status.toLowerCase()) {

            case "approved":
                return "bg-green-100 text-green-700";

            case "rejected":
                return "bg-red-100 text-red-700";

            case "pending":
                return "bg-yellow-100 text-yellow-700";

            case "escalated":
                return "bg-purple-100 text-purple-700";

            default:
                return "bg-gray-100 text-gray-700";
        }

    })();

    return (

        <span
            className={`rounded-full px-3 py-1 text-sm ${color}`}
        >
            {status}
        </span>

    );

}