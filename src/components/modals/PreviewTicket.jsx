import React from "react";



export default function PreviewTicket({ preview, onClose, onSubmit, priorityColors }) {
  if (!preview) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-xs">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-11/12 sm:w-2/3 max-w-lg border-1 border-blue-600">
        <h2 className="text-lg text-white mb-4 bg-blue-600 rounded-t-lg text-center p-1">
          Preview Ticket
        </h2>

        <div className="space-y-2 text-sm pt-2 pl-6 pr-6">
          <p>
            <strong>ID :</strong> {preview.id}
          </p>
          <p>
            <strong>Title :</strong> {preview.title}
          </p>
          <p>
            <strong>Description :</strong>{" "}
            <span className="block p-2 border-0 rounded max-h-32 overflow-y-auto bg-gray-100 dark:bg-gray-700">
              {preview.description}
            </span>
          </p>
          <p className="pt-4">
            <strong>Priority :</strong>{" "}
            <span className={`px-2 py-1 rounded ${priorityColors[preview.priority]}`}>
              {preview.priority}
            </span>
          </p>
        </div>

        <div className="mt-8 mb-6 flex justify-center gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer text-button-custom-2 px-4 py-2 text-blue-600 dark:text-blue-500 border rounded border-blue-600 dark:border-blue-500 hover:border-blue-700"
          >
            Update
          </button>
          <button
            onClick={onSubmit}
            className="cursor-pointer text-button-custom-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
