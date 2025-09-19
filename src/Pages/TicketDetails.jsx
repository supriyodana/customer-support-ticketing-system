import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTickets, saveTickets, updateTicket, deleteTicket } from '../utils/storage'
import BackToDashboard from "../components/layouts/BackToDashboard";
import { SendOutlined } from '@ant-design/icons';
import DeleteConfirm from "../components/modals/DeleteConfirm";


export default function TicketDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);
    const [status, setStatus] = useState("");
    const [commentText, setCommentText] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        const t = getTickets().find((x) => x.id === id);
        if (!t) {
            navigate("/");
            return;
        }
        setTicket(t);
        setStatus(t.status);
    }, [id, navigate]);


    if (!ticket) return null;


    const timeAgo = (dateString) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffMs = now - past;
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMinutes < 1) return "just now";
        if (diffMinutes < 60) return `${diffMinutes} min ago`;
        if (diffHours < 24) return `${diffHours} hr ago`;
        return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    };


    function saveStatus(newStatus) {
        updateTicket(ticket.id, { status: newStatus });
        setStatus(newStatus);
        setTicket((prev) => ({ ...prev, status: newStatus }));
    }


    function addComment(e) {
        e.preventDefault();
        if (!commentText.trim()) return;
        const newComment = {
            text: commentText.trim(),
            timestamp: new Date().toISOString(),
        };
        const tickets = getTickets();
        const idx = tickets.findIndex((t) => t.id === ticket.id);
        if (idx === -1) return;
        tickets[idx] = {
            ...tickets[idx],
            comments: [...tickets[idx].comments, newComment],
        };
        saveTickets(tickets);
        setTicket(tickets[idx]);
        setCommentText("");
    }


    const statusBadge =
        {
            open: "bg-yellow-100 text-yellow-800",
            "in progress": "bg-blue-100 text-blue-800",
            resolved: "bg-green-50 text-green-800",
        }[status] || "bg-gray-100 text-gray-800";

    const priorityBadge =
        {
            low: "bg-green-100 text-green-700",
            medium: "bg-orange-50 text-orange-700",
            high: "bg-red-50 text-red-700",
        }[ticket.priority] || "bg-gray-50 text-gray-700";


    return (
        <div className="min-h-screen pb-10  bg-gray-100 dark:bg-gray-900">
            <BackToDashboard />


            <div className="mt-3   p-4 sm:p-6 md:p-8 lg:p-10 max-w-xl mx-auto border-0 md:border-1 rounded-xl bg-transparent md:bg-white dark:md:bg-gray-800 border-gray-200 dark:border-gray-700 md:shadow-md">  {/*flex items-center justify-center p-4 bg-transparent dark:bg-transparent text-gray-900 dark:text-gray-100*/}
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <div className="table-timeago text-green-700 dark:text-green-200">Created {timeAgo(ticket.createdAt)}</div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{new Date(ticket.createdAt).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(ticket.createdAt).toLocaleTimeString()}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div><span className='text-xs'>Status </span ><span className={`px-3 py-1 text-xs font-medium rounded-full ${statusBadge}`}>{ticket.status}</span></div>
                        <div><span className='text-xs'>Priority </span><span className={`px-3 py-1 text-xs font-medium rounded-full ${priorityBadge}`}>{ticket.priority}</span></div>
                    </div>
                </div>

                <hr className="my-6" />

                <div>
                    <div className='text-xs text-gray-500 dark:text-gray-400 font-medium'>Ticket id #{ticket.id}</div>
                    <div className=" mt-4 tkt-title" >{ticket.title}</div>
                    <div className=" mt-2 tkt-desc-2">{ticket.description}</div>

                    <div className='mt-10 text-xs text-gray-500 dark:text-gray-400 font-medium'>Add Comment on this this Ticket</div>
                    <form onSubmit={addComment} className="mt-2 flex flex-row sm:flex-row gap-2">
                        <input
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 text-sm md:test:base p-2 border rounded bg-white dark:bg-gray-800 focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-400"
                        />
                        <button
                            type="submit"
                            className="cursor-pointer text-sm sm:text-base px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            <SendOutlined />
                        </button>
                    </form>
                </div>



                <div className="mt-6">
                    <h3 className="text-xs text-gray-500 dark:text-gray-400 font-medium">Comments</h3>   {/*text-base md:text-lg font-semibold*/}

                    {ticket.comments.length === 0 ? (
                        <div className="text-sm text-gray-500 mt-2">No comments yet.</div>
                    ) : (
                        <ul className="mt-3 space-y-3">
                            {ticket.comments.map((c, i) => (
                                <li
                                    key={i}
                                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded border-l-2 border-l-blue-500"
                                >
                                    <div className="text-sm">{c.text}</div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {new Date(c.timestamp).toLocaleString()}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}


                </div>

                <hr className="my-6" />

                <div className="text-sm">
                    <span className="mr-4 text-xs">Update Status</span>
                    <select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            saveStatus(e.target.value);
                        }}
                        className="p-2 border rounded bg-white dark:bg-gray-700 focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-400"
                    >
                        <option value="open">open</option>
                        <option value="in progress">in progress</option>
                        <option value="resolved">resolved</option>
                    </select>
                </div>

                <div className="relative mt-4">
                    <span className="mr-7 text-xs">Delete Ticket</span>
                    <button
                        onClick={() => {
                            setShowDeleteConfirm(true);

                        }}
                        className="cursor-pointer text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-400"
                    >
                        Delete
                    </button>


                    {showDeleteConfirm && (
                        <DeleteConfirm
                            show={showDeleteConfirm}
                            onCancel={() => setShowDeleteConfirm(false)}
                            onConfirm={() => {
                                deleteTicket(id);
                                setShowDeleteConfirm(false);
                                navigate("/");
                            }}
                            positionClass="-top-16 left-24 mt-2" 
                        />
                    )}
                    


                </div>

            </div>


        </div>
    );
}
