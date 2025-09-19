import { getTickets , saveTickets } from "./storage"
import generateId from "./idGenerator"



export default function seedTicketIfEmpty() {
  const existing = getTickets()
  if (existing.length > 0) return

  const sample = [
    {
      id: generateId(),
      title: 'Cannot login to account',
      description: 'User reports that login fails with "invalid credentials" though password is correct.',
      priority: 'high',
      status: 'open',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      comments: [
        { text: 'Asked user to reset password', timestamp: new Date().toISOString() }
      ]
    },
    {
      id: generateId(),
      title: 'Feature request: export tickets',
      description: 'Request to export tickets as CSV from dashboard.',
      priority: 'low',
      status: 'in progress',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
      comments: []
    },
    {
      id: generateId(),
      title: 'Payment processing timeout',
      description: 'Payments sometimes time out during peak hours — investigate queueing.',
      priority: 'high',
      status: 'open',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      comments: [
        { text: 'Assigned to backend team', timestamp: new Date().toISOString() }
      ]
    },
    {
      id: generateId(),
      title: 'Typo on help page',
      description: 'Small typo in the installation section (s/instalation/installation/).',
      priority: 'low',
      status: 'resolved',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(), // 14 days ago
      comments: []
    },
    {
      id: generateId(),
      title: 'Mobile layout broken on iPhone X',
      description: 'Layout overlaps header on small viewport heights.',
      priority: 'medium',
      status: 'in progress',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
      comments: []
    },

    {
      id: generateId(),
      title: 'Cannot login to account',
      description: 'User reports that login fails with "invalid credentials" though password is correct.User reports that login fails with "invalid credentials" though password is correct.',
      priority: 'high',
      status: 'open',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
      comments: [
        { text: 'Asked user to reset password', timestamp: new Date().toISOString() }
      ]
    },
    {
      id: generateId(),
      title: 'Request : export tickets',
      description: 'CSV from dashboard.Request to export tickets as CSV from dashboard.export tickets as CSV fromexport tickets as CSV fromexport tickets as CSV fromexport tickets as CSV from',
      priority: 'low',
      status: 'in progress',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(), // 9 days ago
      comments: []
    },
    {
      id: generateId(),
      title: 'Payment processing timeout',
      description: 'Payments sometimes time out during peak hours — investigate queueing.during peak hours — investigate queueing.during peak hours — investigate queueing.during peak hours — investigate queueing.during peak hours — investigate queueing.',
      priority: 'high',
      status: 'open',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(), // 9 hours ago
      comments: [
        { text: 'Assigned to backend team', timestamp: new Date().toISOString() }
      ]
    },
    {
      id: generateId(),
      title: 'Typo on help page',
      description: 'Small typo in the installation section (s/instalation/installation/).',
      priority: 'low',
      status: 'resolved',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(), // 14 days ago
      comments: []
    },
    {
      id: generateId(),
      title: 'Layout overlaps header mobile layout broken on iPhone X',
      description: 'Layout overlaps header on sLayout overlaps header on small viewport heights.mall viewport heights.LayLayout overlaps header on small viewport heights.out overlaps header on small viewport heights.',
      priority: 'medium',
      status: 'in progress',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 22).toISOString(), // 1 day ago
      comments: []
    }
  ]

  saveTickets(sample)
}
