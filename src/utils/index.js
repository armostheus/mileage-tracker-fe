import _ from 'lodash'
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const getMonth = (num) => {
  return MONTHS[num]
}
export const generateNewState = (state, payload) => {
  let stateClone = _.cloneDeep(state), dataFound = false
  const pushData = () => {
    stateClone.push({
      month: payload.date.getMonth(),
      year: payload.date.getFullYear(),
      data: [
        {
          remarks: 'Refueling',
          date: payload.date,
          odoReading: payload.odoReading,
          cost: payload.cost,
          gasFilled: payload.gasFilled,
          price: payload.price
        }
      ]
    })
  }
  if (stateClone.length === 0) pushData()
  else {
    stateClone.every(el => {
      if (el.month === payload.date.getMonth() && el.year === payload.date.getFullYear()) {
        el.data.push({
          remarks: 'Refueling',
          date: payload.date,
          odoReading: payload.odoReading,
          cost: payload.cost,
          gasFilled: payload.gasFilled,
          price: payload.price
        })
        el.data.sort((a, b) => b.date - a.date)
        dataFound = true
        return false
      }
      return true
    })
    if (!dataFound) pushData()
  }
  stateClone.sort((a, b) => {
    return new Date(b.year, b.month) - new Date(a.year, a.month)
  })
  return stateClone
}

export const getDayName = (num) => DAY[num]