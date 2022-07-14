import * as Yup from "yup";
import { TypeAccount } from "../interfaces";

export const validationSchema = () => {
  //! YUP COMMON
  const stringRequired = Yup.string()
    .nullable()
    .required(`Đây là trường bắt buộc`);
  const confirm_password = Yup.string()
    .nullable()
    .required(`Đây là trường bắt buộc`)
    .oneOf([Yup.ref("password"), null], `Mật khẩu không trùng`);
  const arrayRequired = Yup.array().min(1, "Nhập ít nhất một...");
  const dateRequired = Yup.date().required("Đây là trường bắt buộc");
  const objectRequired = Yup.object().required("Đây là trường bắt buộc");
  // const dateTooda

  //! YUP VALIDATE
  const validateLogin = Yup.object().shape({
    username: stringRequired,
    password: stringRequired,
  });

  const validateRegister = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email("Không đúng định dạng mail")
      .required(`Đây là trường bắt buộc`),
    password: stringRequired,
    re_password: confirm_password,
    last_name: stringRequired,
    first_name: stringRequired,
    organization_name: Yup.string()
      .trim()
      .when("userType", {
        is: (userType: string) =>
          userType === TypeAccount.Smes || userType === TypeAccount.Corporate,
        then: Yup.string().required("Đây là trường bắt buộc"),
        otherwise: Yup.string(),
      }),
    organization_id: Yup.string()
      .trim()
      .when("userType", {
        is: (userType: string) => userType === TypeAccount.Corporate,
        then: Yup.string().required("Đây là trường bắt buộc"),
        otherwise: Yup.string(),
      }),
  });

  const validateTrack = Yup.object().shape({
    title: stringRequired,
    version_id: stringRequired,
    download_link: stringRequired,
    artists: Yup.array().of(
      Yup.object().shape({
        name: stringRequired,
      })
    ),
    composers: Yup.array().of(
      Yup.object().shape({
        name: stringRequired,
      })
    ),
    lyricists: Yup.array().of(
      Yup.object().shape({
        name: stringRequired,
      })
    ),
    producers: Yup.array().of(
      Yup.object().shape({
        name: stringRequired,
      })
    ),
  });

  const validateAlbum = Yup.object().shape({
    title: stringRequired,
    artists: Yup.array().of(
      Yup.object().shape({
        name: stringRequired,
      })
    ),
    release_time: dateRequired,
    format: stringRequired,
    genre_id: stringRequired,
    distribution_platform: stringRequired,
    coverOption: stringRequired,
    cover: Yup.mixed()
      .nullable()
      .when("coverOption", {
        is: (coverOption: string) => coverOption === "0",
        then: stringRequired,
      }),
  });

  return {
    validateLogin,
    validateRegister,
    validateAlbum,
    validateTrack,
  };
};
