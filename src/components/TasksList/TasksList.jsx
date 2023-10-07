import { Alert, Spinner } from "react-bootstrap";
import Task from "./Task";

const TasksList = ({ isLoading, tasks, error }) => {
  if (isLoading) return <Spinner animation="grow" variant="primary" />;
  if (!tasks.length)
    return <Alert variant="info">You have no tasks to display.</Alert>;
  return tasks.map((task, index) => (
    <Task key={task.id} task={task} index={index} />
  ));
};

export default TasksList;
