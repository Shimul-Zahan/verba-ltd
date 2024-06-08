import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Pricing from "../Pages/Pricing";
import FAQs from "../Pages/FAQs";
import Main from "../Layout/Main/Main";
import DashboardHome from "../Layout/Dashboard/Pages/DashboardHome";
import AllUsersTable from "../Layout/Dashboard/Pages/AllUsersTable";
import Profile from "../Layout/Dashboard/Pages/Profile";
import BillingHistory from "../Layout/Dashboard/Pages/BillingHistory";
import Registration from "../Pages/Registration";
import Login from "../Pages/Login";
import TestHome from "../Components/Test/TestHome";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/faqs',
        element: <FAQs />
      },
      {
        path: '/pricing',
        element: <Pricing />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/regi',
        element: <Registration />
      },
      {
        path: '/test',
        element: <TestHome />
      },
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardHome />,
    children: [
      {
        path: '/dashboard',
        element: <AllUsersTable />
      },
      {
        path: '/dashboard/profile',
        element: <Profile />
      },
      {
        path: '/dashboard/billing',
        element: <BillingHistory />
      },
    ]
  },
])

export default router