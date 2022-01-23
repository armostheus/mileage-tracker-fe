import AddExpenseForm from "../pages/AddExpenseForm/AddExpenseForm";
import ExpenseTimeline from "../pages/ExpenseTimeline/ExpenseTimeline";
import Homepage from "../pages/Homepage/Homepage";

export const MAIN_ROUTES = [
  {
    index: true,
    path: "/",
    element: <Homepage />
  },
  {
    path: "/homepage",
    element: <Homepage />
  },
  {
    path: "/timeline",
    element: <ExpenseTimeline />
  },
  {
    path: "/add-expense",
    element: <AddExpenseForm />
  }
]