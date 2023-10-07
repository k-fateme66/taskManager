import { Container } from "react-bootstrap";
import TemplatesForm from "../components/FromAddTask/TemplatesForm";
import TasksList from "../components/TasksList/TasksList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTasks } from "../features/tasks/tasksSlice";
const Tasks = () => {
  const { isLoading, data, error } = useSelector((state) => state.tasks);
  const tasks = data.filter((task) => !task.isArchive);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, []);
  return (
    <>
      <div className="bg-primary text-white py-3 header-page">
        <Container className="d-flex justify-content-between align-items-center">
          <h1 className="mb-0 fs-5">My Tasks</h1>
          {<TemplatesForm />}
        </Container>
      </div>
      <Container className="py-3">
        <div className="p-3 d-none d-md-flex row">
          <span className="fw-bold col-6">Tasks</span>
          <span className="fw-bold col-3">Date</span>
        </div>
        <TasksList tasks={tasks} isLoading={isLoading} error={error} />
      </Container>
    </>
  );
};

export default Tasks;
