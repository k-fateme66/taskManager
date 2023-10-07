import { CreateFormatDate } from "../../utils/CreateFormatDate";
import {
  BsCheckCircleFill,
  BsFillStarFill,
  BsStopwatch,
  BsThreeDots,
} from "react-icons/bs";
import { Card, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addArchiveTask,
  changeStatusTask,
  deleteTask,
} from "../../features/tasks/tasksSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateFormatTime } from "../../utils/CreateFormatTime";
import { changeShow } from "../../features/formShow/formShowSlice";

const Task = ({ task, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname.substring(1);

  const renderTemplateStatus = (_task) => {
    return (
      <div className="p-1 bg-white d-flex justify-content-center align-items-center rounded">
        {_task.isNew ? (
          <BsFillStarFill className="text-info" />
        ) : _task.isProcess ? (
          <BsStopwatch className="text-warning" />
        ) : _task.isComplete ? (
          <BsCheckCircleFill className="text-success" />
        ) : (
          ""
        )}
      </div>
    );
  };

  const getChangedStatus = (_task) => {
    if (_task.isNew) return "Move to In Process";
    if (_task.isProcess) return "Move to Complete";
    if (_task.isComplete && _task.isArchive) return "Revert to In Complete";
    if (_task.isComplete) return "Revert to In Process";
  };

  const changeStatusHandler = () => {
    dispatch(changeStatusTask({ id: task.id }));
  };

  const deleteTaskHandler = () => {
    dispatch(deleteTask({ id: task.id }));
  };

  const handleFormShow = () => {
    navigate({
      search: `id=${task.id}`,
    });
    dispatch(changeShow());
  };

  const addArchiveTaskHandler = () => {
    dispatch(
      addArchiveTask({
        id: task.id,
        dateArchive: `${new Date()}`,
      })
    );
  };

  return (
    <Card className={`border-0 card-task  ${index % 2 == 0 ? "bg-light" : ""}`}>
      <Card.Body className="row align-items-center">
        <div className="col-6 d-flex align-items-center">
          {renderTemplateStatus(task)}
          <p
            className="fw-bold mb-0 mx-2"
            role="button"
            onClick={handleFormShow}
          >
            {task.title}
          </p>
        </div>
        <span className="fs-6 text-black-50 fw-bold col-md-3 col-5">
          <span className="d-block d-md-inline">
            {CreateFormatDate(
              `${
                location === "tasks" || location === "profile"
                  ? task.creatAt
                  : task.dateArchive
              }`
            )}
          </span>
          <span className="d-none d-md-inline mx-1">|</span>
          {CreateFormatTime(
            `${
              location === "tasks" || location === "profile"
                ? task.creatAt
                : task.dateArchive
            }`
          )}
        </span>
        <span className="fw-bold col-md-3 col-1 text-end d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary opacity-0 btn-change-status d-none d-md-block"
            onClick={() => changeStatusHandler()}
          >
            {getChangedStatus(task)}
          </button>
          <Dropdown drop="end">
            <Dropdown.Toggle
              id="dropdown-autoclose-true"
              className={`bg-transparent border-0 text-black-50 ${
                location === "archives" ? "d-md-none" : ""
              }`}
            >
              <BsThreeDots />
            </Dropdown.Toggle>
            <Dropdown.Menu className="px-1">
              {(location === "tasks" || location === "profile") && (
                <>
                  <Dropdown.Item onClick={() => deleteTaskHandler()}>
                    Delete
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => addArchiveTaskHandler()}>
                    Move to Archive
                  </Dropdown.Item>
                </>
              )}
              <Dropdown.Item
                className="d-md-none"
                onClick={() => changeStatusHandler()}
              >
                {getChangedStatus(task)}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </span>
      </Card.Body>
    </Card>
  );
};

export default Task;
