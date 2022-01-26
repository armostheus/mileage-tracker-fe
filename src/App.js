import Styles from './App.module.css';
import { MAIN_ROUTES } from './navigation/Routes';
import { useRoutes } from "react-router-dom";

function App() {
  let element = useRoutes(MAIN_ROUTES);
  return (
    <>
      <div className={Styles['header']}>Mileage Tracker</div>
      <div className={Styles['app']}>
        <div className={Styles['content']}>
          {element}
        </div>
      </div>
    </>
  );
}

export default App;
