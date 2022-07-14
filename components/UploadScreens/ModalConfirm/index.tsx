import { Button, Checkbox, Modal, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface Props {
  // bindings: any;
  submit: (item: any) => void;
  setVisible: (item: boolean) => void;
}

const index = ({ setVisible, submit }: Props) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [key, setKey] = useState<boolean>(false);

  return (
    <Modal
      scroll
      blur
      width="600px"
      open={true}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      // {...bindings}
    >
      <Modal.Header>
        <Text id="modal-title" size={20}>
          Xác nhận
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-title" size={16}>
          Hãy kiểm tra kỹ các thông tin trước khi gửi yêu cầu phát hành. Việc
          chỉnh sửa/gỡ bỏ Tác phẩm (NDST) sau khi gửi yêu cầu phát hành thành
          công có thể lên tới 02 tháng, và sẽ gây chậm trễ trong việc gửi các
          NDST của bạn trong tương lai.
        </Text>
        <div className="my-3">
          <Checkbox
            isSelected={checked}
            color="primary"
            size="sm"
            onChange={() => {
              !checked && setChecked(true);
            }}
          >
            Tôi xác nhận có đủ các Quyền, Điều kiện & Đồng ý phân phối Nội dung
            sáng tạo này theo Thoả thuận.
          </Checkbox>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {checked && (
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={(e: any) => {
                setKey(!!e);
              }}
            />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-primary"
          type="button"
          disabled={!key}
          onClick={submit}
        >
          Đồng ý
        </button>
        <Button auto flat color="error" onClick={() => setVisible(false)}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
// anh huy hoang la con ga`
export default index;
