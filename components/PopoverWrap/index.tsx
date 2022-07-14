import React, { ReactElement } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

interface Props {
  isShow: boolean;
  label?: string;
  content?: string;
  children: ReactElement;
}

const Index: React.FC<Props> = (props) => {
  const { isShow, label, content, children } = props;

  const popover = (
    <Popover
      id="popover-basic"
      style={{ position: "relative", zIndex: 99999999 }}
    >
      <Popover.Header as="h3">{label}</Popover.Header>
      <Popover.Body>{content}</Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger placement="right" show={isShow} overlay={popover}>
      {children}
    </OverlayTrigger>
  );
};

export default Index;
