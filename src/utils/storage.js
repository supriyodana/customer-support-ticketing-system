
const KEY = 'tickets_v1'

export function getTickets() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function saveTickets(tickets) {
  localStorage.setItem(KEY, JSON.stringify(tickets))
}


export function createTicket({ id, title, description, priority }) {
  return {    
    id,
    title,
    description,
    priority, 
    status: 'open', 
    createdAt: new Date().toISOString(),
    comments: []
  }
}


export function updateTicket(id, patch) {
  const tickets = getTickets()
  const idx = tickets.findIndex(t => t.id === id)
  if (idx === -1) return false
  tickets[idx] = { ...tickets[idx], ...patch }
  saveTickets(tickets)
  return true
}


export function deleteTicket(id) {
  const tickets = getTickets().filter(t => t.id !== id)
  saveTickets(tickets)
}
