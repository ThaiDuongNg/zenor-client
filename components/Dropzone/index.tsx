import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDropzone } from "react-dropzone";
import { FormikHelpers, FormikState, ErrorMessage } from "formik";
import PopoverWrap from "components/PopoverWrap";

interface Props {
  name?: string;
  onChange?: () => void;
  defaultImage?: string;
  field?: any;
  form?: FormikHelpers<any> & FormikState<any>;
}

const Dropdown = ({ name, onChange, defaultImage, field, form }: Props) => {
  const [files, setFiles] = useState(null);
  const [imgBase64, setImgBase64] = useState<string>("");
  const { errors, touched, setFieldValue } = form ?? {};
  const nameField = name || field?.name;
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    console.log(isShow, "isShow");
  }, [isShow]);

  useEffect(() => {
    const handleHoverIn = () => {
      setIsShow(true);
    };

    const handleHoverOut = () => {
      setIsShow(false);
    };

    const dropzone = document.getElementById("dropzone");
    dropzone?.addEventListener("mouseenter", handleHoverIn);
    dropzone?.addEventListener("mouseleave", handleHoverOut);
    return () => {
      dropzone && dropzone.removeEventListener("mouseenter", handleHoverIn);
      dropzone && dropzone.removeEventListener("mouseleave", handleHoverOut);
    };
  }, []);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFieldValue && setFieldValue(nameField, acceptedFiles[0]);
    //! convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgBase64(reader.result as string);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".png", "jpg"],
    },
    maxFiles: 1,
  });

  return (
    <>
      <PopoverWrap
        isShow={isShow}
        label={"Ảnh cover tác phẩm"}
        content={"Click để chọn ảnh cover"}
      >
        <div
          id="dropzone"
          {...getRootProps({ className: "dropzone" })}
          className={
            styles.baseStyle +
            " mb-3 rounded " +
            `form-control ${
              touched?.[nameField] && errors?.[nameField] && "is-invalid"
            }`
          }
        >
          <input {...getInputProps()} />
          {imgBase64 || defaultImage ? (
            <img src={imgBase64 || defaultImage} className="w-full " />
          ) : (
            <p>Kéo thả hoặc chọn ảnh bìa</p>
          )}
        </div>
      </PopoverWrap>
      {touched?.[nameField] && errors?.[nameField] && (
        <div className="invalid-feedback mb-3">
          <ErrorMessage name={nameField || ""} />
        </div>
      )}
    </>
  );
};

export default Dropdown;
