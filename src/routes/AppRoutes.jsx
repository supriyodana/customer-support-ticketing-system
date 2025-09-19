import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard'
import AddTicket from '../Pages/AddTicket';
import TicketDetails from '../Pages/TicketDetails';

export default function AppRoutes(){
  return (
    <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/add' element={<AddTicket/>} />
        <Route path='/ticket/:id' element={<TicketDetails/>} />
    </Routes>
  )
}
