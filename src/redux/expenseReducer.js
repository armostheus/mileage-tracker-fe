import { generateNewState } from "../utils"
export const expenseReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EXPENSE': {
      let newState = generateNewState(state, action.payload)
      return newState
    }
    default:
      return state
  }
}

export const firstOdoReading = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_FIRST_ODO_READING':
      return action.payload.firstReading
    default:
      return state
  }
}