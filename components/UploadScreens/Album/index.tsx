import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckBoxTrueFalse from "components/CheckBoxTrueFalse";
import DatePicker from "components/DatePicker";
import Dropzone from "components/Dropzone";
import InputField from "components/InputField";
import InputArtist from "components/InputWithSelect";
import Select from "components/Select";
import { optionFormat, optionPlatform } from "constants/common";
import { Field, FieldArray, Form, Formik, FormikValues } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { validationSchema } from "validation/index";
import { IAlbum } from "../../../interfaces";
import musicServices from "../../../services/musicServices";
import styles from "./Album.module.scss";
import { coverImages } from "constants/common";

interface Props {
  nextStep: () => void;
  setIdAlbum: (id: string) => void;
}

const initValues = {
  title: "",
  description: "",
  artists: [
    {
      name: "",
      link: "",
    },
  ],
  cover: "",
  release_time: new Date(),
  format: "",
  genre_id: "",
  has_explicit_content: false,
  label: "",
  distribution_platform: "",
  // isAlbumCover: true,
  coverOption: "",
};

const optionsCover = [
  {
    label: "Upload ảnh bìa",
    value: "0",
  },
  {
    label: "Mẫu ảnh bìa theme sáng",
    value: "1",
  },
  {
    label: "Mẫu ảnh bìa theme tối",
    value: "2",
  },
];

const index = ({ nextStep, setIdAlbum }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [optionGenre, setOptionGenre] = useState([]);
  const { validateAlbum } = validationSchema();
  const refFormik = useRef<any>();
  const router = useRouter();

  //! useEffect
  useEffect(() => {
    const getListGenre = async () => {
      try {
        const response = await musicServices.getListGenre();
        if (response.status === 200 && response.data) {
          const data = response.data.map((item: any) => ({
            label: item.title,
            value: item.id,
          }));

          setOptionGenre(data);
          return;
        }
        setOptionGenre([]);
      } catch (error) {
        setOptionGenre([]);
      }
    };

    getListGenre();
  }, []);

  //! functions
  const handleSubmit = async (values: FormikValues) => {
    setLoading(true);
    const reqBody = { ...values };
    // delete reqBody.isAlbumCover
    try {
      const res = await musicServices.createAlbum(reqBody as IAlbum);
      if (res?.status === 200 && res?.data) {
        router.push(`/upload/${res.data.id}`);
      }
    } catch (error: any) {
      if (error?.response?.data) {
        const { message } = error?.response?.data;
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const uploadURL = async (values: FormikValues) => {
    if (values.coverOption !== "0") {
      handleSubmit(values);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", values.cover);
      const response = await musicServices.uploadImage(formData);

      if (response.status === 200 && response.data) {
        handleSubmit({ ...values, cover: { url: response.data.url } });
        return;
      }
      alert("Có lỗi xảy ra!");
    } catch (error) {
      alert("Có lỗi xảy ra! (catch)");
    }
  };

  const renderImage = (coverOption: string) => {
    if (!coverOption) return null;

    const style = { height: 400, width: 500 };
    if (coverOption === "1") {
      return <img src={coverImages.white} style={style} />;
    }
    if (coverOption === "2") {
      return <img src={coverImages.black} style={style} />;
    }

    return <Field component={Dropzone} name="cover" />;
  };

  //! return
  return (
    <Formik
      innerRef={refFormik}
      validateOnBlur={true}
      validateOnChange={true}
      validationSchema={validateAlbum}
      initialValues={initValues}
      onSubmit={uploadURL}
    >
      {({ values, setFieldValue, touched, errors }) => {
        // useEffect(() => {
        //   console.log(errors, "errors");
        // }, [errors]);
        return (
          <Form>
            <div className={styles.album}>
              <Field
                component={Select}
                options={optionsCover}
                name="coverOption"
                label="Ảnh bìa tác phẩm"
                contentTooltip={
                  "Redo the last action you undid: Choose Edit > Redo, or press Command-Shift-Z."
                }
                onChange={(item: any) => {
                  setFieldValue("coverOption", item.value);

                  if (item.value !== "0") {
                    setFieldValue("cover", {
                      url:
                        item.value === "1"
                          ? coverImages.white
                          : coverImages.black,
                    });
                    return;
                  }
                  setFieldValue("cover", "");
                }}
              />

              <div className="my-3">{renderImage(values.coverOption)}</div>
              <Field
                component={InputField}
                name="title"
                label="Tên tác phẩm"
                contentTooltip={
                  "Redo the last action you undid: Choose Edit > Redo, or press Command-Shift-Z."
                }
              />
              <FieldArray name="artists">
                {({ insert, remove, push }) => (
                  <div>
                    <label className="form-label">
                      Tên Nghệ sĩ/Nhóm hiển thị tại tác phẩm
                    </label>
                    {values.artists.length > 0 &&
                      values.artists.map((artist, index) => {
                        // console.log(values, "values");
                        return (
                          <div
                            key={index}
                            className="d-flex justify-content-end align-item-end"
                          >
                            <div style={{ flex: 1 }}>
                              <Field
                                component={InputArtist}
                                name={`artists.[${index}].name`}
                                selectName={`artists.${index}.link`}
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
                                X
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
                      Thêm Nghệ sĩ/Nhóm
                    </button>
                  </div>
                )}
              </FieldArray>

              <Field
                component={DatePicker}
                min
                name="release_time"
                label="Ngày phát hành"
                minDate={new Date()}
                contentTooltip={
                  "Redo the last action you undid: Choose Edit > Redo, or press Command-Shift-Z."
                }
              />
              <Field
                component={Select}
                options={optionFormat}
                name="format"
                label="Định dạng phát hành"
                contentTooltip={
                  "Redo the last action you undid: Choose Edit > Redo, or press Command-Shift-Z."
                }
              />
              <Field
                component={Select}
                options={optionGenre}
                name="genre_id"
                label="	Thể loại"
                contentTooltip={
                  "Redo the last action you undid: Choose Edit > Redo, or press Command-Shift-Z."
                }
              />
              <Field
                component={Select}
                options={optionPlatform}
                name="distribution_platform"
                label="Nền tảng phân phối"
                contentTooltip={
                  "Redo the last action you undid: Choose Edit > Redo, or press Command-Shift-Z."
                }
              />
              <Field
                component={InputField}
                name="label"
                label="Label"
                placeholder="ZENOR Music"
                contentTooltip={
                  "Redo the last action you undid: Choose Edit > Redo, or press Command-Shift-Z."
                }
              />

              <div style={{ display: "flex" }} className="my-3">
                <label style={{ marginRight: 10 }}>Có Nội dung nhạy cảm?</label>
                <CheckBoxTrueFalse
                  refFormik={refFormik}
                  nameField={"has_explicit_content"}
                />
              </div>

              <button
                className="btn btn-primary w-100 mt-3"
                type="submit"
                data-toggle="tooltip"
                data-placement="right"
              >
                Tạo tác phẩm
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default index;
