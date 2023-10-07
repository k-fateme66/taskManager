import { Card, Container, Image, Row } from "react-bootstrap";
import logo from "../assets/img/default-6.png";
import { NavLink, useLocation } from "react-router-dom";
import TemplateFormRegistration from "../components/TemplateFormRegistration/TemplateFormRegistration";
const Registration = () => {
  const location = useLocation().pathname.substring(1);
  return (
    <Container className="vh-100 py-5">
      <Row className="justify-content-center align-items-center h-100">
        <div className="col-md-4 ">
          <Card className="text-center border border-4 rounded-4">
            <Card.Body className="p-md-5">
              <div
                className="mx-auto mb-4"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              >
                <Image src={logo} alt="task manager" className="w-100" />
              </div>
              <h4 className="fw-bold mb-3">
                {location === "signup" ? "Sign up" : "Login"} to Task Manager
              </h4>
              <p className="text-muted mb-4">Please enter your email address</p>
              <TemplateFormRegistration />
              {location === "signup" ? (
                <>
                  <span>
                    Already have an account?
                    <NavLink
                      to="/login"
                      className="text-black-50 text-decoration-none m-1 fw-bold"
                    >
                      Customer log in
                    </NavLink>
                  </span>
                </>
              ) : (
                <span>
                  Don't have an account yet?
                  <NavLink
                    to="/signup"
                    className="text-black-50 text-decoration-none m-1 fw-bold"
                  >
                    Sign Up
                  </NavLink>
                </span>
              )}
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default Registration;
