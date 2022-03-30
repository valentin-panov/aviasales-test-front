/* eslint-disable no-param-reassign */

// Core
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

// Interfaces
import {InTicket, InTickets} from '../interfaces/Interfaces'

// Server
import {serverURL} from '../App'

const initialState: InTickets = {
  status: 'idle',
  error: '',
  searchId: '',
  tickets: []
}

export const ticketsFetch = createAsyncThunk(
  'tickets/FetchingData',
  async () => {
    const reqURL = `${serverURL}`
    const response = await fetch(reqURL)
    if (!response.ok) {
      throw new Error(`request error: ${reqURL}`)
    }
    return response.json()
  }
)

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    pictureRemove: (state, action: PayloadAction<InTicket>) => {
      const { id } = action.payload
      state.tickets = state.tickets.filter((entry) => entry.id !== id)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(ticketsFetch.pending, (state) => {
      state.status = 'pending'
      state.error = ''
    })
    builder.addCase(
      ticketsFetch.fulfilled,
      (state, action: PayloadAction<InTicket[]>) => {
        state.tickets = [...action.payload]
        state.status = 'success'
      }
    )
    builder.addCase(ticketsFetch.rejected, (state, action) => {
      state.status = 'error'
      state.error = String(action.error.message)
    })
  }
})

export const { pictureRemove } = ticketsSlice.actions

export const tickets = ticketsSlice.reducer
