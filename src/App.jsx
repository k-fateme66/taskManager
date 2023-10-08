import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import store from "./features/store";
import Archive from "./pages/Archive";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import Tasks from "./pages/Tasks";
import PrivateRoutes from "./routers/PrivateRoutes";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/tasks" />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/archives" element={<Archive />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/login" element={<Registration />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Provider>
  );
}

export default App;
