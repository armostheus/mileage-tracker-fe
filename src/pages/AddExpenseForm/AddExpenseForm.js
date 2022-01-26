import { useEffect, useState } from 'react'
import Styles from './AddExpenseForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { HOMEPAGE } from '../../constants';
import _ from 'lodash';
import { validateNumber } from '../../utils';

const AddExpenseForm = () => {
  const [formData, setFormData] = useState({});
  const [errList, setErrList] = useState([])
  const expenseData = useSelector(state => state.expenseReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
        currDate.setHours(prevDate.getHours())
        currDate.setMinutes(prevDate.getMinutes())
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
  const getOtherEntries = (date) => {
    let month = date.getMonth(), year = date.getFullYear()
    let prev = null, next = null, dupe = false
    expenseData.every((el, i) => {
      if (el.year === year && el.month === month) {
        el.data.every((elem, idx)=> {
          let currDate = new Date(elem.date), prevDate = new Date(_.get(el, `[${idx+1}].date`, 0))
          if (currDate.getTime() > date.getTime()) {
            if (el[idx+1] && prevDate > date) {
              return true
            } else if (!el[idx+1]) {
              prev = null
              next = elem
              return false
            } else if (prevDate === date){
              dupe = true
              return false
            } else {
              prev = el[idx+1]
              next = elem
              return false
            }
          } else if (currDate.getTime() === date.getTime()) {
            dupe = true
            return false
          } else {
            let prevData = _.get(expenseData, `[${i-1}].data`, null)
            prev = elem
            next = i === 0 ? null : prevData[prevData.length-1]
            return false
          }
        })
      } 
      return !prev || !dupe
    })
    return [prev, next, dupe]
  }
  const validateForm = () => {
    if (!expenseData.length) return true
    let dateInForm = formData.date
    let [previousEntry, nextEntry, duplicate] = getOtherEntries(dateInForm)
    if (duplicate) {
      setErrList([...errList, 'Entry already exists for that interval'])
      return false
    }
    if (previousEntry && !duplicate && previousEntry.odoReading <= formData.odoReading) {
      if (!nextEntry || (nextEntry && formData.odoReading <= nextEntry.odoReading)) {
        return true
      } else {
        setErrList([...errList, `Odometer reading mismatch with previous entries`])
        return false
      }
    } else {
      setErrList([...errList, `Odometer reading mismatch with previous entries`])
      return false
    }
  }
  const submitForm = () => {
    setErrList([])
  //  if (validateForm()) {
      if (expenseData.length === 0) {
        dispatch({
          type: 'ADD_FIRST_ODO_READING',
          payload: {
            firstReading: formData.odoReading
          }
        })
      }
      dispatch({
        type: 'ADD_EXPENSE',
        payload: {
          ...formData,
          cost: +(formData.price * formData.gasFilled).toFixed(2)
        }
      })
      navigate(HOMEPAGE)
//    }     
  }
    return (
      <>
        <div className={Styles['wrapper']}>
          <div className={Styles['input-container']}>
            <label htmlFor="odometer-reading" className={Styles['label']}>Odometer reading</label>
            <input 
              type="number" 
              id="odometer-reading" 
              name="odoReading"
              className={Styles['input']}
              value={formData.odoReading}
              onChange={(e) => addToFormData(e)}
            />
            <p className={Styles['input-helper-text']}>Previous Odometer reading : {_.get(expenseData, '[0].data[0].odoReading', 0)}</p>
          </div>
          <div className={Styles['input-container']}>
            <label htmlFor="gas-filled" className={Styles['label']}>Gas (liter)</label>
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
            <label htmlFor="price" className={Styles['label']}>Price per liter</label>
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
            <label htmlFor="total-cost" className={Styles['label']}>Total cost</label>
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
            <label htmlFor="refueling-date" className={Styles['label']}>Date</label>
            <input 
              type="date" 
              id="refueling-date" 
              name="date"
              className={Styles['input']}
              onChange={(e) => addToFormData(e)}
            />
          </div>
          <div className={Styles['input-container']}>
            <label htmlFor="refueling-time" className={Styles['label']}>Time</label>
            <input 
              type="time" 
              id="refueling-time" 
              name="time"
              className={Styles['input']}
              onChange={(e) => addToFormData(e)}
            />
          </div>
        </div>
        {errList.length ? (
          errList.map(err => <p className={Styles['error-msg']}>{err}</p>)
        ) : ''}
        <div className={Styles['button-wrapper']}>
          <button className={Styles['button']} onClick={() => submitForm()}>Save</button>
        </div>
      </>
    )
  }
  
  export default AddExpenseForm