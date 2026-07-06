import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function AuthLayout() {

    return (

        <div className="flex min-h-screen flex-col bg-gray-100">

            <main className="flex flex-1 items-center justify-center">

                <Outlet />

            </main>

            <Footer />

        </div>

    );

}