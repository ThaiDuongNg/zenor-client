import { faCirclePlus, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Text } from "@nextui-org/react";
import InputField from "components/InputField";
import Select from "components/Select";
import { Field, FieldArray, Form, Formik, FormikValues } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { validationSchema } from "validation/index";
import { ISelect, ITrack } from "../../../interfaces";
import musicServices from "../../../services/musicServices";
import InputArtist from "../../InputWithSelect";

interface Props {
  bindings: any;
  version: ISelect[];
  setVisible: (visible: boolean) => void;
  data?: ITrack;
  handleSaveDraft: (item: any) => void;
  isSingle: boolean;
  defaultTitle?: string;
}

const initValues: ITrack = {
  album_id: "3mHPUNeuNdTzw2",
  title: "",
  download_link: "https://www.facebook.com/",
  irsc: "",
  version_id: "",
  artists: [
    {
      link: "",
      name: "",
    },
  ],
  producers: [
    {
      link: "",
      name: "",
    },
  ],
  composers: [
    {
      link: "",
      name: "",
    },
  ],
  lyricists: [
    {
      link: "",
      name: "",
    },
  ],
};

const fieldArrays = [
  {
    name: "download_link",
    label: "Điền Liên kết có thể tải xuống Bản ghi",
    type: "input",
    content:
      "Link có thể tải xuống sau khi upload (Google Drive, Mega, Dropbox,...)",
  },
  {
    name: "title",
    label: "Tên Bản ghi",
    type: "input",
    content: "Không chứa ký tự đặc biệt",
  },
  {
    name: "version_id",
    label: "Tên Version",
    type: "select",
    // content: "tooltip",
  },
  {
    name: "irsc",
    label: "Mã ISRC (Nếu có)",
    type: "input",
    // content: "tooltip",
  },
  {
    name: "producers",
    label: "Tên (các) Producer/Mixer",
    type: "array",
    content: "Không chứa điền ký tự đặc biệt.",
  },
  {
    name: "composers",
    label: "Tên (các) Người soạn nhạc",
    type: "array",
    content: "Không chứa điền ký tự đặc biệt.",
  },
  {
    name: "lyricists",
    label: "Tên (các) Người viết lời",
    type: "array",
    content: "Không chứa điền ký tự đặc biệt.",
  },
];

const index = ({
  bindings,
  handleSaveDraft,
  data,
  version,
  isSingle,
  defaultTitle,
  setVisible,
}: Props) => {
  const refFormik = useRef(null);
  const { validateTrack } = validationSchema();

  const renderAddingInput = useCallback(
    (label: string, values: FormikValues, name: string, fieldFunction: any) => {
      return (
        <div>
          <label className="form-label">{label}</label>
          {values[name].length > 0 &&
            values[name]?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="d-flex justify-content-end align-item-end"
                >
                  <div style={{ flex: 1 }}>
                    <Field
                      component={InputField}
                      name={`${name}[${index}].name`}
                    />
                  </div>
                  <div
                    className="d-flex"
                    style={{
                      alignItems: "center",
                      margin: 10,
                      cursor: "pointer",
                    }}
                  >
                    <div
                      onClick={() => {
                        if (values[name]?.length === 1) return;
                        fieldFunction?.remove(index);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faRemove}
                        style={{ fontSize: 20, cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

          <button
            type="button"
            className="btn btn-primary mb-3 d-flex"
            style={{ gap: 5 }}
            onClick={() => {
              fieldFunction?.push({
                link: "",
                name: "",
              });
            }}
          >
            <FontAwesomeIcon
              icon={faCirclePlus}
              style={{ fontSize: 20, cursor: "pointer" }}
            />
          </button>
        </div>
      );
    },
    []
  );

  return (
    <Formik
      innerRef={refFormik}
      validateOnBlur={true}
      validateOnChange={true}
      validationSchema={validateTrack}
      initialValues={{
        ...initValues,
        title: isSingle ? defaultTitle : "",
      }}
      onSubmit={(values: FormikValues) => {
        handleSaveDraft(values);
      }}
    >
      {({ values, submitForm }) => {
        return (
          <Form>
            <Modal
              scroll
              // blur
              width="600px"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              {...bindings}
            >
              <Modal.Header>
                <Text id="modal-title" size={20}>
                  Thêm bản ghi
                </Text>
              </Modal.Header>
              <Modal.Body>
                {fieldArrays.map((item, idx) => {
                  if (item.type === "select") {
                    return (
                      <Field
                        key={idx}
                        contentTooltip={item.content}
                        component={Select}
                        options={version}
                        name={item.name}
                        label={item.label}
                      />
                    );
                  }
                  if (item.type === "array") {
                    return (
                      <FieldArray
                        key={idx}
                        name={item.name}
                        render={(functions) =>
                          renderAddingInput(
                            item.label,
                            values,
                            item.name,
                            functions
                          )
                        }
                      />
                    );
                  }
                  return (
                    <Field
                      key={idx}
                      contentTooltip={item.content}
                      component={InputField}
                      name={item.name}
                      label={item.label}
                      disabled={item.name === "title" && isSingle}
                    />
                  );
                })}
                <FieldArray name="artists">
                  {({ insert, remove, push }) => (
                    <div>
                      <label className="form-label">
                        Tên (các) Nghệ sĩ/Nhóm
                      </label>
                      {values.artists.length > 0 &&
                        values.artists.map((artist, index) => {
                          return (
                            <div
                              key={index}
                              className="d-flex justify-content-end align-item-end"
                            >
                              <div style={{ flex: 1 }}>
                                <Field
                                  component={InputArtist}
                                  name={`artists[${index}].name`}
                                  selectName={`artists[${index}].link`}
                                  label="Tên Nghệ sĩ/Nhóm hiển thị tại tác phẩm"
                                  arrrayName="artists"
                                  index={index}
                                  isActiveSelect={
                                    values.artists.length - 1 === index
                                  }
                                />
                              </div>
                              <div
                                className="d-flex"
                                style={{
                                  alignItems: "center",
                                  margin: 10,
                                  cursor: "pointer",
                                }}
                              >
                                <div
                                  onClick={() => {
                                    if (values.artists.length === 1) return;
                                    remove(index);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faRemove}
                                    style={{ fontSize: 20, cursor: "pointer" }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      <button
                        type="button"
                        className="btn btn-primary shadow mb-3 d-flex"
                        style={{ gap: 5 }}
                        onClick={() => push({ name: "", link: "" })}
                      >
                        <FontAwesomeIcon
                          icon={faCirclePlus}
                          style={{ fontSize: 20, cursor: "pointer" }}
                        />
                      </button>
                    </div>
                  )}
                </FieldArray>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    submitForm();
                  }}
                >
                  Tạo bản ghi
                </button>
                <Button
                  auto
                  flat
                  color="error"
                  onClick={() => {
                    bindings.onClose();
                    setVisible(false);
                  }}
                >
                  Đóng
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        );
      }}
    </Formik>
  );
};

export default index;
