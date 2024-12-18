import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../components/pages/HomePage";
import AboutPage from "../components/pages/AboutPage";
import ContactPage, {
  loader as contactUsPageLoader,
} from "../components/pages/ContactPage";
import Runners from "../components/pages/RunningCommunity/RunningCommunity";
import RunnersDetail from "../components/pages/RunningCommunity/RunningCommunityDetails";
import Layout from "../components/Layout";
import DashboardPage, {
  loader as dashboardLoader,
} from "../components/pages/Events/DashboardPage";
import ReviewsPages, {
  loader as reviewsLoader,
} from "../components/pages/Events/ReviewsPage";
import UpcomingEventsList from "../components/pages/Events/UpcomingEventsList";
import UpcomingDetails from "../components/pages/Events/UpcomingEventsCard";
import EventLayout from "../components/EventLayout";
import UpcomingEventDetailsPhotos from "../components/pages/Events/UpcomingEventsPhotos";
import UpcomingEventDetails from "../components/pages/Events/UpcomingEventsDetails";
import NotFound from "../components/NotFound";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Error from "../components/atoms/Error/RouterError/ErrorRouter";
import LoginPage, {
  loader as loginPageLoader,
} from "../components/pages/LoginPage";
import SignUpPage from "../components/pages/ResgisterPage";
import EventSearchPage from "../components/pages/Events/EventSearchPage";
import { FilterProvider } from "../context/FilterContext";
import { AuthProvider } from "../context/AuthContext";
import CreateAnEvent from "../components/pages/CreateAnEvent/CreateAnEvent";
import ProtectedRoute from "../components/protected/ProtectedRoute";
import AccountPage from "../components/pages/UserPage/AccountPage";
import CommentPage from "../components/pages/CommentPage";

const onSubmit = (form: { name: string; email: string; message: string }) => {
  console.log(form);
  return form;
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<AboutPage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="homepage" element={<HomePage images={[]} />} />
      <Route
        path="contact"
        element={<ContactPage onSubmit={onSubmit} />}
        loader={contactUsPageLoader}
      />
      <Route path="/login" element={<LoginPage />} loader={loginPageLoader} />
      <Route
        path="/register"
        element={<SignUpPage />}
        errorElement={<Error />}
      />
      {/* Public routes */}
      <Route path="runner">
        <Route index element={<Runners />} errorElement={<Error />} />
        <Route
          path="/runner/:id"
          element={<RunnersDetail />}
          errorElement={<Error />}
        />
      </Route>
      <Route path="events" element={<EventLayout />}>
        <Route
          index
          element={
            <FilterProvider>
              <EventSearchPage />
            </FilterProvider>
          }
        />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route
          path="review"
          element={<CommentPage eventId={1} />}
          loader={reviewsLoader}
        />
        <Route
          path="upcoming"
          element={
            <FilterProvider>
              <UpcomingEventsList />
            </FilterProvider>
          }
        />
        <Route path="upcoming/:id" element={<UpcomingDetails />}>
          <Route index element={<UpcomingEventDetails />} />
          <Route path="photos" element={<UpcomingEventDetailsPhotos />} />
        </Route>
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/createEvent" element={<CreateAnEvent />} />
        <Route path="/myPage" element={<AccountPage />} />
      </Route>
    </Route>
  )
);

export default function AppRoutes() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<Layout />}>
//       <Route path="/" element={<AboutPage />} />
//       <Route path="*" element={<NotFound />} />
//       <Route path="homepage" element={<HomePage images={[]} />} />
//       {/*  */}
//       <Route
//         path="contact"
//         element={<ContactPage onSubmit={onSubmit} />}
//         loader={contactUsPageLoader}
//       />
//       <Route path="/createEvent" element={<CreateAnEvent />} />
//       <Route path="/login" element={<LoginPage />} loader={loginPageLoader} />
//       <Route
//         path="/register"
//         element={<SignUpPage />}
//         errorElement={<Error />}
//       />

//       <Route path="runner">
//         <Route index element={<Runners />} errorElement={<Error />} />
//         <Route
//           path="/runner/:id"
//           element={<RunnersDetail />}
//           errorElement={<Error />}
//         />
//       </Route>

//       <Route path="events" element={<EventLayout />}>
//         <Route
//           index
//           element={
//             <FilterProvider>
//               <EventSearchPage />
//             </FilterProvider>
//           }
//           // element={<EventsPage />}
//           loader={async () => {
//             return requireAuth();
//           }}
//         />

//         <Route
//           path="dashboard"
//           element={<DashboardPage />}
//           // loader={dashboardLoader}
//         />
//         <Route
//           path="review"
//           element={<ReviewsPages />}
//           loader={reviewsLoader}
//         />
//         <Route
//           path="upcoming"
//           element={<UpcomingEventsList />}
//           // loader={upcomingEventLoader}
//           // errorElement={<Error />}
//         />
//         <Route
//           path="upcoming/:id"
//           element={<UpcomingDetails />}

//           // loader={async () => {
//           //   return requireAuth();
//           // }}
//         >
//           <Route
//             index
//             element={<UpcomingEventDetails />}
//             // loader={async () => {
//             //   return requireAuth();
//             // }}
//           />
//           <Route
//             path="photos"
//             element={<UpcomingEventDetailsPhotos />}
//             // loader={async () => {
//             //   return requireAuth();
//             // }}
//           />
//         </Route>
//       </Route>
//     </Route>
//   )
// );

// export default function AppRoutes() {
//   return (
//     <>
//       <AuthProvider>
//         {" "}
//         <RouterProvider router={router} />
//       </AuthProvider>
//     </>
//   );
// }
