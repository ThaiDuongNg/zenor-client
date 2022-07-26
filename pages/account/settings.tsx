import InputField from "components/InputField";
import { Field, Form, Formik } from "formik";
import { TypeInput } from "interfaces";
import AccountLayout from "layout/AccountLayout";
import toast from "react-hot-toast";
import authServices from "services/authServices";
import { validationSchema } from "validation";

const fieldArray = [
  { name: "old_password", label: "Mật khẩu cũ" },
  { name: "new_password", label: "Mật khẩu mới" },
  { name: "confirm_new_password", label: "Xác nhận mật khẩu mới" },
];

const Settings = (props: any) => {
  const initFormValue = {
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  };

  const { validateChangePassword } = validationSchema();

  const changePassword = async (values: any) => {
    const { old_password, new_password } = values;

    try {
      await authServices.changePassword({
        old_password,
        new_password,
      });

      toast.success("Cập nhật thành công!");
    } catch (err: any) {
      console.log("err: ", err.response.data);

      toast.error(err.response.data.log);
    }
  };

  return (
    <AccountLayout title="Thiết lập chung">
      <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
        <h1>Thiết lập chung</h1>
        <Formik
          validateOnBlur={true}
          validateOnChange={true}
          validationSchema={validateChangePassword}
          initialValues={initFormValue}
          onSubmit={(values) => {
            changePassword(values);
          }}
        >
          {({ values }) => {
            return (
              <Form style={{ minWidth: 300 }}>
                {fieldArray.map((item) => (
                  <Field
                    component={InputField}
                    name={item.name}
                    label={item.label}
                    type={TypeInput.Password}
                  />
                ))}

                <button
                  className="btn btn-primary w-100 "
                  // onClick={() => {
                  //   !isEdit ? setIsEdit(true) : updateProfile(values);
                  // }}
                  type="submit"
                >
                  Save
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </AccountLayout>
  );
};

export default Settings;
