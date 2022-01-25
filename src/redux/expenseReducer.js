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