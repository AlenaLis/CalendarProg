import BigCalendar from "../components/Calendar/Calendar";
import Register from "../components/Register/Register";
import LogIn from "../components/LogIn/LogIn";

export const routes = [
  {
    path: '/',
    component: BigCalendar,
    exact: true,
  },
  {
    path: '/register/',
    component: Register,
    exact: true,
  },
  {
    path: '/login/',
    component: LogIn,
    exact: true,
  },
]
