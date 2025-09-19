import React from "react";





export default function DeleteConfirm({ show, onCancel, onConfirm, positionClass = "" }) {
  if (!show) return null;

  return (
    <div
      className={`absolute ${positionClass} w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md z-30 p-3`}
    >
      <p className="text-sm mb-3">Are you sure you want to delete?</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="cursor-pointer px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="cursor-pointer px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
