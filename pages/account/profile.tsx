import React, { useState } from "react";
import withAuth from "../../HOCs/withAuth";

// import styles from "./account.module.scss";
import { Field, Form, Formik, FormikValues } from "formik";
import InputField from "components/InputField";
import authServices from "../../services/authServices";
import AccountLayout from "layout/AccountLayout";

const fieldArray = [
  { name: "first_name", label: "Họ" },
  { name: "last_name", label: "Tên" },
  { name: "email", label: "Email" },
  { name: "phone", label: "Số điện thoại" },
  { name: "role", label: "Role" },
];

const Profile = (props: any) => {
  const user = authServices.getUserInStorage();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  console.log(user, "user");

  return (
    <AccountLayout title="Tài khoản">
      <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
        <h1>Tài khoản</h1>
        <Formik
          validateOnBlur={true}
          validateOnChange={true}
          initialValues={user}
          onSubmit={() => {}}
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
                    !isEdit && setIsEdit(true);
                  }}
                  type={isEdit ? "submit" : "button"}
                >
                  Edit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </AccountLayout>
  );
};

export default withAuth(Profile);
