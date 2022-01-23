import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import Styles from './GasDetails.module.css'
const GasDetails = (props) => {
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
          <p className={Styles['text-lead']}>
            {props.data.avgFuelConsumption} 
            <span className={Styles['text-desc']}> mi/l </span>
          </p>
          <p className={`${Styles['text-desc']} ${Styles['desc']}`}>Average fuel comsumption</p>
        </div>
        <div className={Styles['list']}>
          <p className={Styles['text-lead']}>
            {props.data.lastFuelConsumption}
            <span className={Styles['text-desc']}> mi/l </span>
          </p>
          <p className={`${Styles['text-desc']} ${Styles['desc']}`}>Last fuel comsumption</p>
        </div>
        <div className={Styles['list']}>
          <p className={Styles['text-lead']}>
            ${props.data.lastFuelPrice}
          </p>
          <p className={`${Styles['text-desc']} ${Styles['desc']}`}>Last fuel price</p>
        </div>
        <div className={Styles['list-bottom']}>
          <p className={Styles['sub-text']}>
            {props.data.lastEntryDate.toLocaleString()} . 7 days ago
          </p>
        </div>
      </div>
    </div>
  )
}

export default GasDetails