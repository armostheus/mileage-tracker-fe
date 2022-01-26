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
        console.log(el.data)
        el.data.sort((a, b) => new Date(b.date) - new Date(a.date))
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
export const getLastEntries = (expense) => {
  let lastEntries = [], entryCount = 0
  if (expense.length === 0) {
    return []
  } else {
    expense.every(el => {
      let tempEl = {}
      tempEl.month = el.month
      tempEl.year = el.year
      tempEl.data = []
      el.data.every(elem => {
        entryCount++
        tempEl.data.push({
          remarks: elem.remarks,
          data: new Date(elem.date),
          odoReading: elem.odoReading,
          cost: elem.cost,
          gasFilled: elem.gasFilled,
          price: elem.price
        })
        if (entryCount >= 2) return false
        else return true
      })
      lastEntries.push(tempEl)
      if (entryCount >= 2) return false
      else return true
    })
  }
  return lastEntries
}
export const getExpenseData = (expense) => {
  const expenseData = {
    thisMonth: {
        gas: 0,
        other: 0
    },
    previousMonth: {
      gas: 0,
      other: 0
    }
  }
  let today = new Date()
  let lastDay = new Date(today.getFullYear(), today.getMonth()-1)
  let gasThisMonth = 0, gasPrevMonth = 0
  if (expense[0]) {
    if (expense[0].year === today.getFullYear() && expense[0].month === today.getMonth()) {
      gasThisMonth = expense[0].data.reduce((prev, curr) => {
        return prev += curr.cost
      }, 0)
    }
  }
  if (expense[1]) {
    if (gasThisMonth && expense[1].year === lastDay.getFullYear() && expense[1].month === lastDay.getMonth()) {
      gasPrevMonth = expense[1].data.reduce((prev, curr) => {
        return prev += curr.cost
      }, 0)
    } else if (expense[0].year === lastDay.getFullYear() && expense[0].month === lastDay.getMonth()) {
      gasPrevMonth = expense[0].data.reduce((prev, curr) => {
        return prev += curr.cost
      }, 0)
    }
  }
  expenseData.thisMonth.gas = gasThisMonth
  expenseData.previousMonth.gas = gasPrevMonth
  return expenseData
}
export const getGasData = (expense, lastOdoReading) => {
  console.log(expense, lastOdoReading)
  let avgFuel = 0, lastFuel = 0
  let dataArr = [], totalFuel = 0
  expense.forEach(el => {
    dataArr = [...dataArr, ...el.data]
  })
  dataArr.forEach((el, idx) => {
    if (idx !== 0) totalFuel += el.gasFilled
  })
  avgFuel = (_.get(dataArr, '[0].odoReading', 0)-_.get(dataArr, `[${dataArr.length-1}].odoReading`, 0)) / totalFuel
  lastFuel = (_.get(dataArr, '[0].odoReading', 0) - _.get(dataArr, '[1].odoReading', 0)-lastOdoReading) / _.get(dataArr, '[1].gasFilled', 1)
  console.log(avgFuel, lastFuel, totalFuel, dataArr)
  const gasData = {
    avgFuelConsumption: isNaN(avgFuel) ? 0 : avgFuel,
    lastFuelConsumption: lastFuel,
    lastFuelPrice: _.get(dataArr, '[0].price', 0),
    lastEntryDate: _.get(dataArr, '[0].date') ? new Date(_.get(dataArr, '[0].date')) : null
  }
  console.log(gasData)
  return gasData
}
export const getDayName = (num) => DAY[num]
export const validateNumber = (number) => {
  if (number < 0) return false
  if ((''+number).includes('e')) return false
  return true
}