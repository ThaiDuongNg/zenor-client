import React, { useCallback, useEffect, useState } from "react";

// import styles from "./account.module.scss";
import { Field, Form, Formik, FormikValues } from "formik";
import InputField from "components/InputField";
import authServices from "../../services/authServices";
import AccountLayout from "layout/AccountLayout";
import GetUserSelector from "redux/selector/authSelector";
import { authActions } from "redux/creators/modules/auth";
import useSagaCreators from "hooks/useSagaCreators";
import { validationSchema } from "validation";
import Loading from "components/Loading";
import toast from "react-hot-toast";

import _ from "lodash";

const fieldArray = [
  { name: "first_name", label: "Họ" },
  { name: "last_name", label: "Tên" },
  { name: "address", label: "Địa chỉ" },
  { name: "phone", label: "Số điện thoại" },
  { name: "bio", label: "Bio" },
];

const Profile = (props: any) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { validateFormUpdateAccount } = validationSchema();

  const { dispatch } = useSagaCreators();

  const [updateProfileStatus, setUpdateProfileStatus] = useState({
    isLoading: false,
    status: "",
  });

  const userSelector = GetUserSelector();

  const updateProfile = async (values: any) => {
    const { first_name, last_name, address, phone, bio } = values;
    console.log("data: ", { first_name, last_name, address, phone, bio });

    try {
      setUpdateProfileStatus({ ...updateProfileStatus, isLoading: true });
      await authServices.updateProfile({
        first_name,
        last_name,
        address,
        phone,
        bio,
      });

      dispatch(authActions.getProfile);

      toast.success("Cập nhật thành công!");

      // const res = await authServices.getProfile();
      // setProfile(res.data);

      setUpdateProfileStatus({
        status: "success",
        isLoading: false,
      });
    } catch (err: any) {
      toast.error("Đã xảy ra lỗi!");
      setUpdateProfileStatus({
        status: "failed",
        isLoading: false,
      });
    }
  };

  return (
    <AccountLayout title="Tài khoản">
      {updateProfileStatus.isLoading ? <Loading /> : null}
      <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
        <h1>Tài khoản</h1>
        <Formik
          validateOnBlur={true}
          validateOnChange={true}
          validationSchema={validateFormUpdateAccount}
          initialValues={userSelector.user}
          onSubmit={(values) => {
            updateProfile(values);
          }}
          // onSubmit={(values: FormikValues) => {
          //   updateProfile(values);
          // }}
        >
          {({ values }) => {
            return (
              <Form style={{ minWidth: 300 }}>
                {fieldArray.map((item) => (
                  <Field
                    component={InputField}
                    name={item.name}
                    label={item.label}
                    disabled={!isEdit}
                  />
                ))}
                <button
                  className="btn btn-primary w-100 "
                  onClick={() => {
                    !isEdit ? setIsEdit(true) : null;
                  }}
                  type={isEdit ? "submit" : "button"}
                >
                  {isEdit ? "Save" : "Edit"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </AccountLayout>
  );
};

export default Profile;
