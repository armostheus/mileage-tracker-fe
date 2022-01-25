import { useEffect, useState } from 'react'
import Styles from './AddExpenseForm.module.css'
import { useDispatch } from 'react-redux'

const AddExpenseForm = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch()
  const addToFormData = (e) => {
    if (e.target.name === 'date') {
      let prevDate = formData.date
      if (!prevDate) {
        setFormData({
          ...formData,
          date: new Date(e.target.value)
        })
      } else {
        let currDate = new Date(e.target.value)
        currDate.setTime(prevDate.getTime())
        setFormData({
          ...formData,
          date: currDate
        })
      }
    } else if (e.target.name === 'time') {
      let timeArr = e.target.value.split(':')
      let prevDate = formData.date
      if (!prevDate) {
        prevDate = new Date()
      }
      prevDate.setHours(timeArr[0])
      prevDate.setMinutes(timeArr[1])
      setFormData({
        ...formData,
        date: prevDate
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value ? +e.target.value : 0
      })
    }
  }
  const submitForm = () => {
    dispatch({
      type: 'ADD_EXPENSE',
      payload: {
        ...formData,
        cost: +(formData.price * formData.gasFilled).toFixed(2)
      }
    })
  }
    return (
      <>
        <div className={Styles['wrapper']}>
          <div className={Styles['input-container']}>
            <label for="odometer-reading" className={Styles['label']}>Odometer reading</label>
            <input 
              type="number" 
              id="odometer-reading" 
              name="odoReading"
              className={Styles['input']}
              value={formData.odoReading}
              onChange={(e) => addToFormData(e)}
            />
          </div>
          <div className={Styles['input-container']}>
            <label for="gas-filled" className={Styles['label']}>Gas (liter)</label>
            <input 
              type="number" 
              id="gas-filled" 
              name="gasFilled"
              className={Styles['input']}
              value={formData.gasFilled}
              onChange={(e) => addToFormData(e)}
            />
          </div>
          <div className={Styles['input-container']}>
            <label for="price" className={Styles['label']}>Price per liter</label>
            <input 
              type="number" 
              id="price" 
              name="price"
              className={Styles['input']}
              value={formData.price}
              onChange={(e) => addToFormData(e)}
            />
          </div>
          <div className={Styles['input-container']}>
            <label for="total-cost" className={Styles['label']}>Total cost</label>
            <input 
              type="number" 
              id="total-cost" 
              name="totalCost"
              className={Styles['input']}
              value={formData.price && formData.gasFilled ? (formData.price * formData.gasFilled).toFixed(2) : 0}
              onChange={(e) => addToFormData(e)}
              disabled
            />
          </div>
          <div className={Styles['input-container']}>
            <label for="refueling-date" className={Styles['label']}>Date</label>
            <input 
              type="date" 
              id="refueling-date" 
              name="date"
              className={Styles['input']}
              onChange={(e) => addToFormData(e)}
            />
          </div>
          <div className={Styles['input-container']}>
            <label for="refueling-time" className={Styles['label']}>Time</label>
            <input 
              type="time" 
              id="refueling-time" 
              name="time"
              className={Styles['input']}
              onChange={(e) => addToFormData(e)}
            />
          </div>
        </div>
        <div className={Styles['button-wrapper']}>
          <button className={Styles['button']} onClick={() => submitForm()}>Save</button>
        </div>
      </>
    )
  }
  
  export default AddExpenseForm