import { useSelector } from 'react-redux'
import { getMonth, getDayName } from '../../utils'
import Navbar from '../Navbar/Navbar'
import Styles from  './ExpenseTimeline.module.css'

const expenseTimeline = [
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
        date: new Date(2021, 11, 9),
        odoReading: 42700,
        cost: 54
      }
    ]
  },
  {
    month: 10,
    year: 2021,
    data: [
      {
        remarks: 'Refueling',
        date: new Date(2021, 10, 29),
        odoReading: 40543,
        cost: 67
      },
      {
        remarks: 'Refueling',
        date: new Date(2021, 10, 2),
        odoReading: 39746,
        cost: 58.66
      }
    ]
  },
  {
    month: 9,
    year: 2021,
    data: [
      {
        remarks: 'Refueling',
        date: new Date(2021, 9, 23),
        odoReading: 39000,
        cost: 36.56
      }
    ]
  }
]
const ExpenseTimeline = () => {
  const expenseTimeline = useSelector(state => state.expenseReducer)
  const generateExpenseList = (expList) => {
    return(
      <ul style={{listStyleType: 'none', borderBottom: '1px solid #72727240'}}>
        {
          expList.map(exp => {
            return (
              <li className={Styles['entry']}>
                <section style={{flex: '1 1 auto'}}>
                  <h2 className={Styles['sub-header']}>
                    {exp.remarks}
                  </h2>
                  <p className={Styles['text-dull']}>{getDayName(new Date(exp.date).getDay())}, {new Date(exp.date).getDate()}</p>
                  <p className={Styles['text-dull']}>{exp.odoReading.toLocaleString()} mi</p>
                </section>
                <p className={Styles['text-normal']}>${exp.cost}</p>
              </li>
            )
          })
        }
      </ul>
    ) 
  }
  const generateTimeline = () => {
    if (!expenseTimeline.length) {
      return (
        <>
          <div className={Styles['container']}>
            <h5 className={Styles['header']}>No Data</h5>
          </div>
        </>
      )
    }
    return expenseTimeline.map((el) => {
      return (
        <>
          <div className={Styles['container']}>
            <h5 className={Styles['header']}>{`${getMonth(el.month)} ${el.year}`}</h5>
            { generateExpenseList(el.data) }
          </div>
        </>
      )
    })
  }
  return (
    <>
      <div className={Styles["timeline"]}>
        {generateTimeline()}
      </div>
      <Navbar />
    </>
  )
}

export default ExpenseTimeline