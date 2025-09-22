import React, { useState, useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";

import TicketActionMenu from "../modals/TicketActionMenu";

import { shortText, timeAgo, statusBadge, priorityBadge } from '../../utils/ticketHelpers';




export default function TicketCard({ ticket, onDelete, onStatusChange }) {
  const { id, title, description, priority, status, createdAt, comments = [] } = ticket;
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
  const shortDesc =shortText(description, 100);



  

  return (
    <div className="w-full sm:w-[48%] md:w-[48%] lg:w-[32%] xl:[23%] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col justify-between hover:shadow-md dark:hover:bg-gray-700 transition">

      {/*  -------------------Row-1 (id,time ago,actions)------------------------------------START----------------------------------------------------- */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          #{id}
        </div>
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="text-xs text-gray-400">{timeAgo(createdAt)}</div>

          <div className="relative">
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            >
              <HiDotsVertical />
            </button>


            {showMenu && (
              <div
                ref={menuRef}
                className="absolute top-4 right-5 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md z-20">
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

        </div>

      </div>

      {/*  -------------------Row-1 (id,time ago,actions)------------------------------------END----------------------------------------------------- */}
      {/* --------------------Row-2 (title,desc) ---------------------------------------------START--------------------------------------------------- */}

      <div>
        <div className="tkt-title ">
          {shortTitle}
        </div>
        <p className="mt-2 tkt-desc ">
          {shortDesc}
        </p>
      </div>

      {/* --------------------Row-2 (title,desc) ---------------------------------------------END--------------------------------------------------- */}
      {/* ----------------------Row-3 (date,time)--------------------------------------------------START--------------------------------------- */}

      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        {new Date(createdAt).toLocaleString()}
      </div>

      {/* --------------------Row-2 (title,desc) ---------------------------------------------END--------------------------------------------------- */}
      {/*---------------------Row-4 (comments,badges)-----------------------------------------START------------------------------------------------------*/}

      <div className="mt-4 flex gap-3 flex-wrap">

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
          <MessageSquare className="h-4 w-4 mr-1" />
          {comments.length}
        </div>

        <span
          className={`px-3 py-1 text-xs font-medium rounded-lg  ${statusBadge[status] || "bg-gray-100 text-gray-800 border-gray-200"}`}
        >
          {status}
        </span>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-lg  ${priorityBadge[priority] || "bg-gray-50 text-gray-700 border-gray-200"}`}
        >
          {priority}
        </span>
      </div>

      {/*---------------------Row-4 (comments,badges)-----------------------------------------END------------------------------------------------------*/}
      {/* --------------------Row-5 (details)--------------------------------------------------START----------------------------------------------- */}

      <Link
        to={`/ticket/${id}`}
        className="mt-4 text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        View Details
      </Link>
      {/* --------------------Row-5 (details)--------------------------------------------------END----------------------------------------------- */}

      

    </div>
  );
}
