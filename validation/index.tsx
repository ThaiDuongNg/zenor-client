import * as Yup from "yup";
import { TypeAccount } from "../interfaces";

export const validationSchema = () => {
  //! YUP COMMON
  const stringRequired = Yup.string()
    .nullable()
    .required(`Đây là trường bắt buộc`);

  const specialCharIgnore = Yup.string()
    .required(`Đây là trường bắt buộc`)
    .matches(
      /^[^*|\":<>[\]{}`\\()';@&$\+\-\=\#\!\%\^\~]+$/,
      `Không được chứa kí tự đặc biệt`
    );

  const validatePhone = Yup.string().matches(
    /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    `Vui lòng nhập số điện đúng định dạng`
  );
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
    title: specialCharIgnore,
    artists: Yup.array().of(
      Yup.object().shape({
        name: stringRequired,
      })
    ),
    release_time: dateRequired,
    label: specialCharIgnore,
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

  const validateFormUpdateAccount = Yup.object().shape({
    phone: validatePhone,
  });

  const validateChangePassword = Yup.object().shape({
    old_password: stringRequired,
    new_password: stringRequired,
    confirm_new_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Mật khẩu không khớp")
      .required("Đây là trường bắt buộc"),
  });

  return {
    validateLogin,
    validateRegister,
    validateAlbum,
    validateTrack,
    validateFormUpdateAccount,
    validateChangePassword,
  };
};
