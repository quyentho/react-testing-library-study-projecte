import { useState } from "react";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";

const SummaryForm = () => {
  const [isEnableButton, setEnableButton] = useState(false);
  const checkBoxLable = (
    <span>
      I agree to{" "}
      <OverlayTrigger
        overlay={<Tooltip>no ice cream will actually be delivered</Tooltip>}
        placement="right"
      >
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );
  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isEnableButton}
          onChange={() => setEnableButton((current) => !current)}
          label={checkBoxLable}
        ></Form.Check>
      </Form.Group>
      <Button disabled={!isEnableButton}>Confirm order</Button>
    </Form>
  );
};
export default SummaryForm;
