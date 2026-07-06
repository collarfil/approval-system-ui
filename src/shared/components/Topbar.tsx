import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/store/authSlice";

export default function Topbar() {

    const dispatch = useDispatch();

    return (

        <header className="flex h-16 items-center justify-between border-b bg-white px-6">

            <h2 className="text-lg font-semibold">

                Approval Workflow System

            </h2>

            <button

                onClick={() => dispatch(logout())}

                className="rounded bg-red-600 px-4 py-2 text-white"

            >

                Logout

            </button>

        </header>

    );

}