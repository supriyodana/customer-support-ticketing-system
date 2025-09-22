import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { FullscreenOutlined } from '@ant-design/icons'

import TicketActionMenu from "../modals/TicketActionMenu";

import { shortText, timeAgo, statusBadge, priorityBadge } from "../../utils/ticketHelpers";





export default function TicketCard({ ticket, onDelete, onStatusChange }) {
    const { id, title, description, priority, status, createdAt } = ticket;
    const [showMenu, setShowMenu] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);


    const shortTitle = shortText(title, 30);
    const shortDesc = shortText(description, 100);





    return (

        <div className="grid grid-cols-15 items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 mt-2 text-sm hover:shadow-md dark:hover:bg-gray-700 transition">

            {/* -----------------------------1st column-------------------start--------------------------- */}
            <div className="col-span-5">
                <div className="tkt-title">
                    {shortTitle}
                </div>
                <div className="tkt-desc ">
                    {shortDesc}
                </div>
            </div>
            {/* -----------------------------1st column-------------------end--------------------------- */}


            {/* -----------------------------2nd column-------------------start--------------------------- */}
            <div className="col-span-2">
                <span
                    className={`px-3 py-1 rounded-lg  text-xs font-medium ${statusBadge[status] || "bg-gray-100 text-gray-800 border-gray-200"}`}
                >
                    {status}
                </span>
            </div>
            {/* -----------------------------2nd column-------------------end--------------------------- */}



            {/* -----------------------------3rd column-------------------start--------------------------- */}
            <div className="col-span-2">
                <span
                    className={`px-3 py-1 rounded-lg  text-xs font-medium ${priorityBadge[priority] || "bg-gray-50 text-gray-700 border-gray-200"}`}
                >
                    {priority}
                </span>
            </div>
            {/* -----------------------------3rd column-------------------end--------------------------- */}


            {/* -----------------------------4thcolumn-------------------start--------------------------- */}
            <div className="col-span-3 text-gray-600 dark:text-gray-300">
                <div className="table-timeago text-green-700 dark:text-green-200 py-1">{timeAgo(createdAt)}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(createdAt).toLocaleString()}</p>
            </div>
            {/* -----------------------------4thcolumn-------------------end------------------------------ */}


            {/* -----------------------------5th column-------------------start--------------------------------- */}
            <div className="relative col-span-2">
                <button
                    onClick={() => setShowMenu((prev) => !prev)}
                    className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                >
                    <HiDotsVertical />
                </button>

                {showMenu && (
                    <div ref={menuRef} className="absolute -top-12 -left-38 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md z-20">
                        <TicketActionMenu
                            id={id}
                            status={status}
                            onStatusChange={onStatusChange}
                            onDelete={onDelete}
                            closeMenu={() => setShowMenu(false)}
                        />
                    </div>
                )}
            </div>
            {/* -----------------------------5th column-------------------end--------------------------- */}


            {/* -----------------------------6th column-------------------start--------------------------- */}
            <div className="relative col-span-1">
                <Link
                    to={`/ticket/${id}`}
                    onClick={() => setShowMenu(false)}
                    className="block px-3 py-2 text-xl text-blue-500 hover:text-blue-800 "
                >
                    <FullscreenOutlined />
                </Link>
            </div>
            {/* -----------------------------6th column-------------------end--------------------------- */}
        </div>

    );
}
