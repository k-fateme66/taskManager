import { Button, Modal, Offcanvas } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { changeShow } from "../../features/formShow/formShowSlice";
import From from "./From";

const TemplatesForm = () => {
  const { isFormShow } = useSelector((state) => state.formShow);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleFormShow = () => {
    dispatch(changeShow());
  };

  const handleFormClose = (e) => {
    dispatch(changeShow());
    if (searchParams.has("id")) {
      searchParams.delete("id");
      setSearchParams(searchParams);
    }
  };
  return (
    <>
      <Button
        variant="light"
        className="d-flex align-items-center"
        onClick={handleFormShow}
      >
        <BsPlusLg className="w-5 h-5 me-1" />
        Add
      </Button>
      {isMobile ? (
        <Offcanvas
          show={isFormShow}
          onHide={handleFormClose}
          placement="bottom"
          scroll="true"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="h5">Add New Task</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <From
              onHideForm={(e) => handleFormClose(e)}
              onAddTodo={(data) => addTodosHandler(data)}
            />
          </Offcanvas.Body>
        </Offcanvas>
      ) : (
        <Modal show={isFormShow} onHide={handleFormClose} centered>
          <Modal.Header closeButton className="border-0 text-center">
            <Modal.Title className="h5">Add New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <From
              onHideForm={(e) => handleFormClose(e)}
              onAddTodo={(data) => addTodosHandler(data)}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default TemplatesForm;
