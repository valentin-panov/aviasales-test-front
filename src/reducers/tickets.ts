/* eslint-disable no-param-reassign */

// Core
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

// Interfaces
import {InTickets} from '../interfaces/Interfaces'

// Server
import {serverURL} from '../App'

const initialState: InTickets = {
  status: 'idle',
  error: '',
  tickets: [],
  stop: false
}

export const ticketsFetch = createAsyncThunk(
  'tickets/FetchingData',
  async (token: string) => {
    const reqURL = `${serverURL}/tickets?token=${token}`
    const response = await fetch(reqURL)
    if (!response.ok) {
      throw new Error(`request error. request url: ${reqURL}`)
    }
    return response.json()
  }
)

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    // pictureRemove: (state, action: PayloadAction<InTicket>) => {
    //   const { id } = action.payload
    //   state.tickets = state.tickets.filter((entry) => entry.id !== id)
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(ticketsFetch.pending, (state) => {
      state.status = 'pending'
      state.error = ''
    })
    builder.addCase(
      ticketsFetch.fulfilled,
      (state, action: PayloadAction<InTickets>) => {
        state.tickets = [...action.payload.tickets]
        state.stop = action.payload.stop
        state.status = 'success'
      }
    )
    builder.addCase(ticketsFetch.rejected, (state, action) => {
      state.status = 'error'
      state.error = String(action.error.message)
    })
  }
})

// export const { pictureRemove } = ticketsSlice.actions

export const tickets = ticketsSlice.reducer
