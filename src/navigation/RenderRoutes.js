import { Route, Routes } from 'react-router-dom'

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

const RenderRoutes = (props) => {
  return (
    <Routes>
      {props.routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Routes>
  )
}

export default RenderRoutes