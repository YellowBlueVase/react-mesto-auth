import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    <Route>
      {
        () => props.loggedIn ? <Component {...props} /> : <Redirect to="/signin" />
      }
    </Route>
)}
