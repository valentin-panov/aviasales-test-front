/* eslint-disable no-param-reassign */

// Core
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit' // Interfaces
import {InTicket, InTickets} from '../interfaces/Interfaces' // Server
import {serverURL} from '../App'

const initialState: InTickets = {
  status: 'idle',
  error: '',
  tickets: []
}

const getTickets = async (reqURL: string): Promise<InTicket[]> => {
  const response = await fetch(reqURL)
  if (!response.ok) {
    // throw new Error(`request error. request url: ${reqURL}`) // Если нужно показывать ошибку получения данных - нужно выбрасывать ошибку
    return getTickets(reqURL)
  }
  const result = await response.json()
  if (result.stop === false) {
    return getTickets(reqURL)
  } else {
    return result.tickets
  }
}

export const ticketsFetch = createAsyncThunk(
  'tickets/FetchingData',
  async (token: string) => {
    const reqURL = `${serverURL}/tickets?searchId=${token}`
    return await getTickets(reqURL)
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

// export const { pictureRemove } = ticketsSlice.actions

export const tickets = ticketsSlice.reducer
