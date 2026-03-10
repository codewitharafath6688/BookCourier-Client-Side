import React from "react";
import { Link, useNavigate } from "react-router";
import useRole from "../Hooks/useRole";

const Forbidden = () => {
    const navigate = useNavigate();
    const { role } = useRole();

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="text-center max-w-md px-6">
                {/* Icon */}
                <div className="text-9xl font-black text-error opacity-20 select-none leading-none">
                    403
                </div>
                <div className="mt-4 mb-2 text-5xl">🚫</div>
                <h1 className="text-3xl font-bold text-base-content mt-4">
                    Access Denied
                </h1>
                <p className="text-base-content/60 mt-3 text-lg">
                    You don&apos;t have permission to view this page.
                    {role && (
                        <span>
                            {" "}
                            Your current role is{" "}
                            <span className="badge badge-warning font-semibold capitalize">
                                {role}
                            </span>
                            .
                        </span>
                    )}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline btn-wide"
                    >
                        ← Go Back
                    </button>
                    <Link to="/" className="btn btn-primary btn-wide">
                        Back to Home
                    </Link>
                </div>

                {/* Role hint */}
                <p className="text-sm text-base-content/40 mt-6">
                    If you believe this is a mistake, contact your administrator.
                </p>
            </div>
        </div>
    );
};

export default Forbidden;