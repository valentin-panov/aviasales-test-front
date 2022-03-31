/* eslint-disable no-param-reassign */

// Core
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

// Interfaces
import {InSearchId} from '../interfaces/Interfaces'

// Server
import {serverURL} from '../App'

const initialState: InSearchId = {
  status: 'idle',
  error: '',
  token: ''
}

export const tokenFetch = createAsyncThunk('searchToken', async () => {
  const reqURL = `${serverURL}/search`
  const response = await fetch(reqURL)
  if (!response.ok) {
    throw new Error(`request error: ${reqURL}`)
  }
  const result = await response.json()
  return result.searchId
})

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(tokenFetch.pending, (state) => {
      state.status = 'pending'
      state.error = ''
    })
    builder.addCase(
      tokenFetch.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.token = action.payload
        state.status = 'success'
      }
    )
    builder.addCase(tokenFetch.rejected, (state, action) => {
      state.status = 'error'
      state.error = String(action.error.message)
    })
  }
})

export const token = tokenSlice.reducer
