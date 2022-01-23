import { useNavigate } from 'react-router-dom'
import {TIMELINE, HOMEPAGE, ADD_EXPENSE} from '../../constants'
import Styles from './Navbar.module.css'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className={Styles['nav-wrapper']}>
      <div className={Styles['fab-button']}>
        <Fab color="primary" aria-label="add" onClick={(e) => navigate(ADD_EXPENSE)} className={Styles['fab-button']}>
          <AddIcon />
        </Fab>
      </div>
      <div className={Styles['navbar-container']}>
        <button
          onClick={() => navigate(HOMEPAGE)}
          className={Styles['navbar-button']}
        >
          Home
        </button>
        <button
          onClick={() => navigate(TIMELINE)}
          className={Styles['navbar-button']}
        >
          Timeline
        </button>
      </div>
    </div>
  )
}
export default Navbar