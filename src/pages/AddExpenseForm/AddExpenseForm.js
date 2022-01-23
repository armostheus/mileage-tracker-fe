import { useEffect, useState } from 'react'
import Styles from './AddExpenseForm.module.css'

const AddExpenseForm = () => {
  const [date, setDate] = useState(new Date());
    return (
      <div className={Styles['wrapper']}>
        <div className={Styles['input-container']}>
          <label for="odometer-reading" className={Styles['label']}>Odometer reading</label>
          <input 
            type="number" 
            id="odometer-reading" 
            name="odometer-reading"
            className={Styles['input']}
          />
        </div>
        <div className={Styles['input-container']}>
          <label for="gas-filled" className={Styles['label']}>Gas (liter)</label>
          <input 
            type="number" 
            id="gas-filled" 
            name="gas-filled"
            className={Styles['input']}
          />
        </div>
        <div className={Styles['input-container']}>
          <label for="gas-filled" className={Styles['label']}>Price per liter</label>
          <input 
            type="number" 
            id="gas-filled" 
            name="gas-filled"
            className={Styles['input']}
          />
        </div>
        <div className={Styles['input-container']}>
          <label for="gas-filled" className={Styles['label']}>Total cost</label>
          <input 
            type="number" 
            id="gas-filled" 
            name="gas-filled"
            className={Styles['input']}
          />
        </div>
        <div className={Styles['input-container']}>
          <label for="refueling-date" className={Styles['label']}>Date</label>
          <input 
            type="date" 
            id="refueling-date" 
            name="refueling-date"
            className={Styles['input']}
          />
        </div>
        <div className={Styles['input-container']}>
          <label for="refueling-time" className={Styles['label']}>Time</label>
          <input 
            type="time" 
            id="refueling-time" 
            name="refueling-time"
            className={Styles['input']}
          />
        </div>
      </div>
    )
  }
  
  export default AddExpenseForm