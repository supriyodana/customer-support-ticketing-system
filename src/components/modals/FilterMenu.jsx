import React from "react";



export default function FilterMenu({
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  onClearFilters,
  onApply,
  onClose
}) {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow z-10 p-3">
      <div className="mb-3">
        <div className="text-xs text-gray-500 mb-1">Status</div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-sm"
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="mb-3">
        <div className="text-xs text-gray-500 mb-1">Priority</div>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-sm"
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => {
            onApply();
            onClose();
          }}
          className="cursor-pointer px-3 py-2 text-sm"
        >
          Apply
        </button>

        <button
          onClick={() => {
            onClearFilters();
            onClose();
          }}
          className="cursor-pointer px-3 py-2 text-sm text-gray-500"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
