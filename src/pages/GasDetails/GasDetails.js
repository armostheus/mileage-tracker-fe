import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import Styles from './GasDetails.module.css'
const GasDetails = (props) => {
  const getLastRefuelingDate = () => {
    let dateLocaleString = '', days = 0, today = new Date()
    if (props.data && props.data.lastEntryDate) {
      dateLocaleString = props.data.lastEntryDate.toLocaleString()
      days = Math.floor((today.getTime() - props.data.lastEntryDate.getTime()) / (1000 * 3600 * 24))
      return `${dateLocaleString} . ${days} days ago`
    }
    return ''
  }
  return (
    <div className={Styles['container']}>
      <div className={Styles['header']}>
        <h2>
          <LocalGasStationIcon />
          <span className={Styles['header-text']}>Gas</span>
        </h2>
      </div>
      <div className={Styles['list-container']}>
        <div className={Styles['list']}>
          {
            !props.data ? (
              <p className={Styles['text-lead']}>
                No Data found
              </p>
            ) : (
              <>
                <p className={Styles['text-lead']}>
                  {+props.data.avgFuelConsumption.toFixed(2)} 
                  <span className={Styles['text-desc']}> mi/l </span>
                </p>
                <p className={`${Styles['text-desc']} ${Styles['desc']}`}>Average fuel comsumption</p>              
              </>
            )
          }
        </div>
        <div className={Styles['list']}>
          {
            !props.data ? (
              <p className={Styles['text-lead']}>
                No Data found
              </p>
            ) : (
              <>
                <p className={Styles['text-lead']}>
                  {+props.data.lastFuelConsumption.toFixed(2)}
                  <span className={Styles['text-desc']}> mi/l </span>
                </p>
                <p className={`${Styles['text-desc']} ${Styles['desc']}`}>Last fuel comsumption</p>            
              </>
            )
          }
        </div>
        <div className={Styles['list']}>
          {
            !props.data ? (
              <p className={Styles['text-lead']}>
                No Data found
              </p>
            ) : (
              <>
                <p className={Styles['text-lead']}>
                  ${props.data.lastFuelPrice}
                </p>
                <p className={`${Styles['text-desc']} ${Styles['desc']}`}>Last fuel price</p>          
              </>
            )
          }
        </div>
        <div className={Styles['list-bottom']}>
          <p className={Styles['sub-text']}>
            {getLastRefuelingDate()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default GasDetails