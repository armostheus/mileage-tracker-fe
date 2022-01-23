import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { getMonth } from '../../utils';
import StylesA from '../GasDetails/GasDetails.module.css'

const LastEntries = (props) => {
    const renderEntry = (entry) => {
      return (
        <div className={StylesA['list']}>
          <p className={StylesA['text-lead']}>
            ${entry.cost} 
          </p>
          <p className={`${StylesA['text-desc']} ${StylesA['desc']}`}>
            {entry.remarks}
          </p>
        </div>
      )
    }

    const renderLastEntries = () => {
      return props.data.map(el => {
        return (
          <div className={`${StylesA['list-wrapper']}`}>
            <p className={`${StylesA['text-desc']} ${StylesA['desc']} ${StylesA['top-text']}`}>
              {getMonth(el.month).toUpperCase()} {el.year}
            </p>
            {el.data.map(entry => renderEntry(entry))}
          </div>
        )
      })
    }

    return (
      <div className={StylesA['container']}>
        <div className={StylesA['header']}>
          <h2>
            <TrendingUpIcon />
            <span className={StylesA['header-text']}>Last entries</span>
          </h2>
        </div>
        <div className={StylesA['list-container']}>
          {renderLastEntries()}
        </div>
      </div>
    )
}

export default LastEntries