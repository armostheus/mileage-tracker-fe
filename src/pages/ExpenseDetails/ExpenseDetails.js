import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StylesA from '../GasDetails/GasDetails.module.css'

const ExpenseDetails = (props) => {
  return (
      <>
        <div className={StylesA['container']}>
          <div className={StylesA['header']}>
            <h2>
              <CurrencyRupeeIcon />
              <span className={StylesA['header-text']}>Costs</span>
            </h2>
          </div>
          <div className={StylesA['list-container']}>
            <div className={`${StylesA['list-wrapper']}`}>
              <p className={`${StylesA['text-desc']} ${StylesA['desc']} ${StylesA['top-text']}`}>This Month</p>
              <div className={StylesA['list']}>
                <p className={StylesA['text-lead']}>
                  ${!props.data ? 0 : props.data.thisMonth.gas} 
                </p>
                <p className={`${StylesA['text-desc']} ${StylesA['desc']}`}>
                  Gas
                </p>
              </div>
              <div className={StylesA['list']}>
                <p className={StylesA['text-lead']}>
                  ${!props.data ? 0 : props.data.thisMonth.other} 
                </p>
                <p className={`${StylesA['text-desc']} ${StylesA['desc']}`}>
                  Other costs
                </p>
              </div>
            </div>
            <div className={`${StylesA['list-wrapper']}`}>
              <p className={`${StylesA['text-desc']} ${StylesA['desc']} ${StylesA['top-text']}`}>Previous Month</p>
              <div className={StylesA['list']}>
                <p className={StylesA['text-lead']}>
                  ${!props.data ? 0 : props.data.previousMonth.gas} 
                </p>
                <p className={`${StylesA['text-desc']} ${StylesA['desc']}`}>
                  Gas
                </p>
              </div>
              <div className={StylesA['list']}>
                <p className={StylesA['text-lead']}>
                  ${!props.data ? 0 : props.data.previousMonth.other} 
                </p>
                <p className={`${StylesA['text-desc']} ${StylesA['desc']}`}>
                  Other costs
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default ExpenseDetails