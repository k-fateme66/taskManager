import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../features/Auth/authSlice";
import { useNavigate } from "react-router-dom";

function TemplateFormRegistration({ type }) {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const { isAuthenticated, data, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setUser(data);
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [data]);
  const submitHandler = (e) => {
    e.preventDefault();
    let regex = /\S+@\S+\.\S+/;
    if (regex.test(input)) {
      setErrorShow(false);
      dispatch(Login({ email: input, id: `${new Date().toISOString()}` }));
    } else {
      setErrorShow(true);
    }
  };
  return (
    <Form id="form-signin" onSubmit={(e) => submitHandler(e)}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter your email"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <p
          className={`text-danger fs-6 text-start mt-1 ${
            errorShow ? "" : "d-none"
          }`}
        >
          Please enter the format Email correct
        </p>
      </Form.Group>

      <div className="d-grid mb-3">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={input === "" ? true : false}
        >
          Continue
        </button>
      </div>
    </Form>
  );
}

export default TemplateFormRegistration;
