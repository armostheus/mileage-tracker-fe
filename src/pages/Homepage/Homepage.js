import GasDetails from "../GasDetails/GasDetails"
import ExpenseDetails from "../ExpenseDetails/ExpenseDetails"
import LastEntries from "../LastEntries/LastEntries"
import Styles from './Homepage.module.css'
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getLastEntries, getExpenseData, getGasData } from "../../utils";

const gasData = {
  avgFuelConsumption: 6.568,
  lastFuelConsumption: 7.556,
  lastFuelPrice: 1.65,
  lastEntryDate: new Date(2022, 0, 12)
}
const expenseData = {
  thisMonth: {
      gas: 23.56,
      other: 122.43
  },
  previousMonth: {
    gas: 23.56,
    other: 122.43
  }
}
const lastEntries = [
  {
    month: 0,
    year: 2022,
    data: [
      {
        remarks: 'Refueling',
        date: new Date(2022, 0, 12),
        odoReading: 44554,
        cost: 57
      }
    ]
  },
  {
    month: 11,
    year: 2021,
    data: [
      {
        remarks: 'Refueling',
        date: new Date(2021, 11, 29),
        odoReading: 42700,
        cost: 55
      },
      {
        remarks: 'Refueling',
        date: new Date(2021, 11, 9),
        odoReading: 42700,
        cost: 54
      },
      {
        remarks: 'Refueling',
        date: new Date(2021, 11, 9),
        odoReading: 42700,
        cost: 50
      }
    ]
  },
]

const Homepage = () => {
  const expense = useSelector(state => state.expenseReducer)
  const lastOdoReading = useSelector(state => state.firstOdoReading)
  const [lastEntries, setLastEntries] = useState(null)
  const [expenseData, setExpenseData] = useState(null)
  const [gasData, setGasData] = useState(null)

  useEffect(() => {
    setLastEntries(getLastEntries(expense))
    setExpenseData(getExpenseData(expense))
    setGasData(getGasData(expense, lastOdoReading))
  }, [expense])

  return (
    <>
      <GasDetails data={gasData}/>
      <ExpenseDetails data={expenseData}/>
      <LastEntries data={lastEntries}/>
      <Navbar />
    </>
  )
}

export default Homepage