import React, { useCallback, useState } from "react";
import { TypeInput } from "interfaces/index";
import { Field, Form, Formik, FormikValues } from "formik";
import styles from "./login.module.scss";
import { validationSchema } from "validation/index";
import useSagaCreators from "../../hooks/useSagaCreators";
import { authActions } from "redux/creators/modules/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import FloatingInput from "components/FloatingInput";
import DefaultLayout from "../../layout/DefaultLayout";

interface ILogin {
  username: string;
  password: string;
}

const initValues: ILogin = {
  username: "",
  password: "",
};
// const initValues: ILogin = {
//   username: "abc1@email.com",
//   password: "12345678",
// };

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { validateLogin } = validationSchema();
  const { dispatch } = useSagaCreators();
  const router = useRouter();

  const handleLogin = useCallback((values: FormikValues) => {
    setIsLoading(true);
    dispatch(authActions.login, {
      username: values.username.trim(),
      password: values.password,
      callbacks: {
        onSuccess: (response: any) => {
          setIsLoading(false);
          router.push("/dashboard");
        },
        onFailed: (error: any) => {
          console.log(error);
          toast.error("login failed");
          setIsLoading(false);
        },
      },
    });
  }, []);

  return (
    <DefaultLayout title="Đăng nhập">
      <Formik
        validateOnBlur={true}
        validateOnChange={true}
        validationSchema={validateLogin}
        initialValues={initValues}
        onSubmit={handleLogin}
      >
        {(propsFormik) => {
          return (
            <div className={styles.login}>
              <Head>
                <title>Đăng nhập</title>
              </Head>
              <Form className=" tw-w-96 ">
                <h1 className="h3 mb-3 fw-normal">Đăng nhập</h1>
                <Field
                  label="Tài khoản"
                  component={FloatingInput}
                  name="username"
                  placeholder="Username"
                />

                <Field
                  label="Mật khẩu"
                  component={FloatingInput}
                  name="password"
                  type={TypeInput.Password}
                  placeholder="Password"
                />

                <button
                  type="submit"
                  className="btn btn-primary w-100 tw-py-2 tw-rounded-sm"
                >
                  Đăng nhập
                </button>

                {/* <Button
                  title="Đăng nhập"
                  type={TypeButton.Submit}
                  size={Size.Lg}
                  loading={isLoading}
                /> */}
              </Form>
            </div>
          );
        }}
      </Formik>
    </DefaultLayout>
  );
};

export default Login;
