import { Container } from "react-bootstrap";
import {
  BsBoxArrowInLeft,
  BsBoxArrowInRight,
  BsCalendar3,
  BsFillCalendar2WeekFill,
  BsPersonCircle,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Logout } from "../../features/Auth/authSlice";
import { getTasks } from "../../features/tasks/tasksSlice";
const Header = () => {
  const { isAuthenticated, data } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(Logout());
    dispatch(getTasks());
    navigate("/login");
  };
  return (
    <>
      <header className="py-3 ">
        <Container>
          <div className="row  align-items-center">
            <div className="col-md-3 col-6">
              <NavLink
                to="/"
                className="fw-bold text-dark text-decoration-none fs-5"
              >
                Task Manager
              </NavLink>
            </div>
            <div className="col-6 text-center d-none d-lg-flex justify-content-center">
              <NavLink
                to="tasks"
                className={({ isActive }) =>
                  isActive
                    ? "btn me-2 btn-outline-primary d-inline-flex align-items-center justify-content-center"
                    : " d-inline-flex align-items-center justify-content-center btn me-2"
                }
              >
                <BsCalendar3 className="w-5 h-5 me-2" />
                Tasks
              </NavLink>
              <NavLink
                to="archives"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-outline-primary d-inline-flex align-items-center justify-content-center"
                    : "btn d-inline-flex align-items-center justify-content-center"
                }
              >
                <BsFillCalendar2WeekFill className="w-5 h-5 me-2" />
                My Archive
              </NavLink>
            </div>
            <div className="col-md-3 col-6 text-end d-flex justify-content-end">
              {isAuthenticated ? (
                <>
                  <NavLink
                    to={`profile?id=${data[0].id}`}
                    className={({ isActive }) =>
                      isActive ? "btn btn-lg btn-icon" : "btn btn-lg btn-icon"
                    }
                  >
                    <BsPersonCircle />
                    <span className="fs-6 text-muted ms-1 d-none d-md-inline-block">
                      {data[0].email}
                    </span>
                  </NavLink>
                  <button onClick={handleLogout} className="btn btn-lg p-1">
                    <BsBoxArrowInLeft />
                  </button>
                </>
              ) : (
                <NavLink to="login" className="btn btn-lg btn-icon px-0">
                  <BsBoxArrowInRight />
                </NavLink>
              )}
            </div>
          </div>
        </Container>
      </header>
      <nav className="d-md-none position-absolute bottom-0 w-100 py-2 border-top border-light">
        <Container className="container d-flex justify-content-around">
          <NavLink
            to="tasks"
            className={({ isActive }) =>
              isActive
                ? "btn text-primary d-flex flex-column justify-content-center align-items-center"
                : "btn  d-flex flex-column justify-content-center align-items-center"
            }
          >
            <BsCalendar3 className="w-5 h-5 d-block" />
            Task
          </NavLink>
          <NavLink
            to="archives"
            className={({ isActive }) =>
              isActive
                ? "btn text-primary  d-flex flex-column justify-content-center align-items-center"
                : "btn  d-flex flex-column justify-content-center align-items-center"
            }
          >
            <BsFillCalendar2WeekFill className="w-5 h-5 d-block" />
            My Archive
          </NavLink>
        </Container>
      </nav>
    </>
  );
};

export default Header;
