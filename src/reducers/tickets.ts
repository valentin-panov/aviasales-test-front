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
    return getTickets(reqURL)
  }
  if (response.status === 404) {
    throw new Error(`${response.status}`) // Если нужно показывать ошибку получения данных - нужно выбрасывать ошибку
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
  async () => {
    const tokenURL = `${serverURL}/search`
    const tokenResponse = await fetch(tokenURL)
    if (!tokenResponse.ok) {
      throw new Error(`request error: ${tokenURL}`)
    }
    const tokenResult = await tokenResponse.json()
    const token = tokenResult.searchId

    const ticketsURL = `${serverURL}/tickets?searchId=${token}`
    return await getTickets(ticketsURL)
  }
)

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    ticketsErrorRemove: (state) => {
      state.error = ''
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

export const { ticketsErrorRemove } = ticketsSlice.actions

export const tickets = ticketsSlice.reducer
