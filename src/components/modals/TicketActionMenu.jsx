import React from "react";
import { useState } from "react";
import DeleteConfirm from "./DeleteConfirm";



export default function TicketActionMenu({
    id,
    status,
    onStatusChange,
    onDelete,
    closeMenu
}) {

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    return (
        <>
            <div className="px-3 py-2 border-b dark:border-gray-700">
                <select
                    value={status}
                    onChange={(e) => {
                        onStatusChange(id, e.target.value);
                        closeMenu?.();
                    }}
                    className="w-full p-1 border rounded bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="open">Open</option>
                    <option value="in progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>


            <button
                onClick={() => {

                    setShowDeleteConfirm(true);
                }}
                className="cursor-pointer w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                Delete
            </button>


            {showDeleteConfirm && (
                <DeleteConfirm
                    show={showDeleteConfirm}
                    onCancel={() => setShowDeleteConfirm(false)}
                    onConfirm={() => {
                        onDelete(id);
                        setShowDeleteConfirm(false);
                        closeMenu?.();
                    }}
                    positionClass="-top-7 right-0 mt-2"
                />
            )}
        </>
    );
}
