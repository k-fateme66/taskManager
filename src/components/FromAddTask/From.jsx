import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { addTask, editTask } from "../../features/tasks/tasksSlice";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const From = ({ onHideForm }) => {
  const { data: tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [inputDate, setInputDate] = useState(new Date());
  const [textarea, setTextarea] = useState("");
  const [showError, setShowError] = useState(false);
  const [task, setTask] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const idTask = searchParams.get("id");

  useEffect(() => {
    const task = tasks.filter((task) => task.id === idTask);
    if (idTask) {
      setTextarea(task[0].title);
      setInputDate(new Date(task[0].creatAt));
      setTask(task[0]);
    }
  }, []);

  const onChangeTextarea = (e) => {
    setTextarea(e.target.value);
    setShowError(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (textarea !== "" && inputDate) {
      if (searchParams.has("id")) {
        dispatch(
          editTask({ ...task, title: textarea, creatAt: `${inputDate}` })
        );
      } else {
        dispatch(
          addTask({
            title: textarea,
            isNew: true,
            isProcess: false,
            isComplete: false,
            creatAt: `${inputDate}`,
            id: inputDate.toISOString(),
            isArchive: false,
          })
        );
      }

      onHideForm();
    } else {
      setShowError(true);
    }
  };
  return (
    <>
      <Form>
        <Form.Group className="mb-5" controlId="textarea">
          <Form.Label className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">Task</span>
            <span className={`fs-6 ${showError && "text-danger"}`}>
              Required
            </span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={textarea}
            onChange={onChangeTextarea}
            className={showError && "border-danger"}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="todo-Date">
          <Form.Label className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">Date</span>
            <span className="fs-6">Required</span>
          </Form.Label>
          <DatePicker
            showIcon
            selected={inputDate}
            onChange={(data) => setInputDate(data)}
            showTimeSelect
            startDate={inputDate}
            minDate={new Date()}
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </Form.Group>
        <div className="mt-5 border-top pt-3 d-flex justify-content-around justify-content-md-start">
          <Button variant="secondary" className="me-md-2" onClick={onHideForm}>
            Cancel
          </Button>
          <Button variant="primary" type="button" onClick={submitHandler}>
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default From;
