export interface Status {
  status: 'idle' | 'pending' | 'success' | 'error'
  error: string
}

export interface InTicket {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export interface InTickets extends Status {
  searchId: string
  tickets: InTicket[]
}
