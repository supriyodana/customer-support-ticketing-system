
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TicketCard from '../components/layouts/TicketCard'
import TicketTable from '../components/layouts/TicketTable'
import { getTickets, saveTickets, updateTicket, deleteTicket } from '../utils/storage'
import ThemeToggle from '../components/common/ThemeToggle'

import seedTicketIfEmpty from '../utils/seedTicket'

import { PlusOutlined } from '@ant-design/icons'
import { IoFilterOutline } from "react-icons/io5";
import { BsListTask, BsGrid } from "react-icons/bs";
import { Empty } from 'antd';

import FilterMenu from '../components/modals/FilterMenu';




export default function Dashboard() {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState([])
  const [query, setQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  const [ticketsLayout, setTicketsLayout] = useState("CARD");

  useEffect(() => {
    seedTicketIfEmpty()
    setTickets(getTickets())
  }, [])


  useEffect(() => {
    const onStorage = () => setTickets(getTickets())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  function refresh() {
    setTickets(getTickets())
  }

  function handleDelete(id) {
    deleteTicket(id)
    refresh()
  }

  function handleStatusChange(id, newStatus) {
    updateTicket(id, { status: newStatus })
    refresh()
  }

  function handleClearFilters() {
    setQuery('')
    setFilterStatus('all')
    setFilterPriority('all')
  }

  const counts = useMemo(() => {
    const open = tickets.filter(t => t.status === 'open').length
    const inProgress = tickets.filter(t => t.status === 'in progress').length
    const resolved = tickets.filter(t => t.status === 'resolved').length
    const high = tickets.filter(t => t.priority === 'high').length
    return { open, inProgress, resolved, high }
  }, [tickets])

  const filtered = useMemo(() => {
    return tickets
      .filter(t => (filterStatus === 'all' ? true : t.status === filterStatus))
      .filter(t => (filterPriority === 'all' ? true : t.priority === filterPriority))
      .filter(t => (query.trim() === '' ? true : t.title.toLowerCase().includes(query.trim().toLowerCase())))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [tickets, filterStatus, filterPriority, query])

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      {/*============================== welcome & add ======================== START ====================== DIV-1 ====================== */}

      <div className="flex items-start  justify-between mt-2 mb-8">
        <div>
          <h1 className="text-h1-custom">Hello,</h1>
          <p className="text-body-small">Welcome to the customer ticket system</p>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle/>
          <button
            onClick={() => navigate('/add')}
            className="min-w-29 px-4 py-2  bg-blue-600 hover:bg-blue-700 text-button-custom rounded shadow cursor-pointer "
          >
            <PlusOutlined className='mr-2' />
            <span className="inline sm:hidden">Add Ticket</span>
            <span className="hidden sm:inline">Add New Ticket</span>
          </button>
        </div>
      </div>

      {/*=============================== welcome & add ====================== END ======================= DIV-1 ======================== */}


      {/*================================== stats cards========================START====================== DIV-2 ===================== */}


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-amber-100 dark:bg-gray-800 border border-amber-200 dark:border-amber-800  shadow-sm shadow-amber-100 rounded-lg p-4">
          <div className="stat-txt text-amber-700 dark:text-amber-400">Open Tickets</div>
          <div className="stat-num text-amber-800 dark:text-amber-300">{counts.open}</div>
        </div>


        <div className="bg-lime-100 dark:bg-gray-800 border border-lime-400 dark:border-lime-800 shadow-sm shadow-lime-100 rounded-lg p-4">
          <div className="stat-txt text-lime-700 dark:text-lime-400">In Progress</div>
          <div className="stat-num text-lime-800 dark:text-lime-300">{counts.inProgress}</div>
        </div>


        <div className="bg-blue-100 dark:bg-gray-800 border border-blue-300 dark:border-blue-800 shadow-sm shadow-blue-100 rounded-lg p-4">
          <div className="stat-txt text-blue-700 dark:text-blue-400">Resolved</div>
          <div className="stat-num text-blue-800 dark:text-blue-300">{counts.resolved}</div>
        </div>


        <div className="bg-rose-100 dark:bg-gray-800 border border-rose-200 dark:border-rose-900 shadow-sm shadow-rose-100 rounded-lg p-4">
          <div className="stat-txt text-rose-700 dark:text-rose-400">High Priority</div>
          <div className="stat-num text-rose-800 dark:text-rose-300">{counts.high}</div>
        </div>
      </div>

      {/*================================== stats cards========================END====================== DIV-2 ==================== */}



      {/*======================== text & search & filter ========================START==================== DIV-3 ======================= */}

      <div className="flex flex-wrap items-center gap-3 justify-between mb-4">

        <div className="flex items-center gap-3     justify-between w-full xs:justify-normal xs:w-auto">
          <h2 className="text-h4-custom">Recent Tickets</h2>

          <div className="flex items-center gap-1 border rounded overflow-hidden">
            <button
              onClick={() => setTicketsLayout("CARD")}
              className={`toggle-btn-ico ${ticketsLayout === "CARD"
                ? "toggle-selected"
                : "toggle-deafult"
                }`}
            >
              <BsGrid />
            </button>

            <button
              onClick={() => setTicketsLayout("TABLE")}
              className={`toggle-btn-ico ${ticketsLayout === "TABLE"
                ? "toggle-selected"
                : "toggle-deafult"
                }`}
            >
              <BsListTask />
            </button>
          </div>
        </div>



        <div className="flex flex-row items-center gap-3     justify-between w-full xs:justify-normal xs:w-auto">

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ticket"
            className="search-tkt"
          />

          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(s => !s)}
              className="filter-btn"
            >
              <IoFilterOutline />
            </button>


            {showFilterMenu && (
              <FilterMenu
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
                onClearFilters={handleClearFilters}
                onApply={refresh}
                onClose={() => setShowFilterMenu(false)}
              />
            )}

            {/*
            {showFilterMenu && (
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
                      setShowFilterMenu(false)
                      refresh()
                    }}
                    className="cursor-pointer px-3 py-2 text-sm"
                  >
                    Apply
                  </button>

                  <button
                    onClick={() => {
                      handleClearFilters()
                      setShowFilterMenu(false)
                    }}
                    className="cursor-pointer px-3 py-2 text-sm text-gray-500"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
            */}



          </div>

        </div>
      </div>

      {/*======================== text & search & filter ========================END============================= DIV-3 ============ */}


      {/*=========================== tickets (cards /or/ table) ========================START=============================================== */}

      {ticketsLayout === "CARD" &&
        <div className="flex  flex-wrap  gap-4">
          {filtered.length === 0 ? (
            <div className="text-center px-22 py-18 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<p className='text-xl text-gray-500 dark:text-gray-100'>No ticket found</p>} />
            </div>
          ) : (
            filtered.map(ticket => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>

      }

      {ticketsLayout === "TABLE" &&

        <div className="flex flex-col gap-4 overflow-x-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<p className='text-xl text-gray-500 dark:text-gray-100'>No ticket found</p>} />
            </div>
          ) : (

            <div className='min-w-230 overflow-x-auto mb-4'>

              <div className="grid grid-cols-15 gap-3 bg-gray-100 dark:bg-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 px-4 py-2 rounded-t-lg">

                <div className='col-span-5'>Ticket</div>
                <div className='col-span-2'>Status</div>
                <div className='col-span-2'>Priority</div>
                <div className='col-span-3'>Created</div>
                <div className='col-span-2'>Manage</div>
                <div className='col-span-1'>Details</div>
              </div>
              {
                filtered.map(ticket => (
                  <TicketTable
                    key={ticket.id}
                    ticket={ticket}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                  />
                ))
              }
            </div>
          )}
        </div>
      }

      {/*=========================== tickets (cards /or/ table) ========================END=============================================== */}


    </div>
  )
}


