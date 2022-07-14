import { Radio } from "@nextui-org/react";
import Button from "components/Button";
import { Field, Form, Formik, FormikProps, FormikValues } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { validationSchema } from "validation";
import { corporate, personal, smes } from "../../constants/signupType";
import {
  IAccount,
  Size,
  TypeAccount,
  TypeButton,
  TypeInput,
} from "../../interfaces";
import authServices from "../../services/authServices";
import styles from "./signup.module.scss";
import FloatingInput from "components/FloatingInput";
import DefaultLayout from "../../layout/DefaultLayout";
import capitalize from "lodash/capitalize";
import ReCAPTCHA from "react-google-recaptcha";

interface ITypeField {
  name: string;
  title: string;
  type?: string;
}

const initAccount = {
  email: "",
  password: "",
  last_name: "",
  first_name: "",
  organization_name: "",
  organization_id: "",
  type: TypeAccount.Personal,
};

const index = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const refFormik = useRef<FormikProps<any>>(null);
  const { validateRegister } = validationSchema();
  const [key, setKey] = useState<boolean>(false);
  const router = useRouter();

  const renderFieldByType = (type: TypeAccount = TypeAccount.Personal) => {
    let array = personal;

    if (type === TypeAccount.Smes) {
      array = smes;
    } else if (type === TypeAccount.Corporate) {
      array = corporate;
    }

    return (
      <>
        {array.map((item: ITypeField, index) => (
          <div className={styles.signup_input}>
            <Field
              label={item.title}
              component={FloatingInput}
              name={item.name}
              placeholder="Username"
              contentTooltip={"contentTooltip"}
              type={item?.type || TypeInput.Text}
            />
          </div>
        ))}
      </>
    );
  };

  const renderRadioGroup = useCallback(() => {
    const listType: string[] = Object.values(TypeAccount);

    return (
      <div className={styles.signup_radio}>
        <div className={" my-3"}>
          <h1>Đăng ký tài khoản</h1>
        </div>
        <Radio.Group
          value={listType[0]}
          row
          onChange={(value: string | number) => {
            if (refFormik?.current) {
              refFormik.current.setFieldValue("type", value);
            }
          }}
        >
          {listType.map((item) => (
            <Radio className="my-2" value={item}>
              {capitalize(item)}
            </Radio>
          ))}
        </Radio.Group>
      </div>
    );
  }, []);

  const handleSignin = useCallback(async (values: FormikValues) => {
    setLoading(true);
    try {
      const response = await authServices.resgister(values as IAccount);

      if (response?.status === 200 && response?.data?.data) {
        router.push("/");
        console.log("success register");
        return;
      }
    } catch (error: any) {
      console.log(error.response, "");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DefaultLayout title="Đăng ký">
      <div className={styles.signup}>
        <Formik
          innerRef={refFormik}
          validateOnBlur={true}
          validateOnChange={true}
          validationSchema={validateRegister}
          initialValues={initAccount}
          onSubmit={handleSignin}
        >
          {({ values }) => {
            return (
              <Form>
                <Head>
                  <title>Đăng ký</title>
                </Head>
                {renderRadioGroup()}
                {renderFieldByType(values.type)}
                <div className={styles.signup_button + " py-3"}>
                  <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={(e: any) => {
                      setKey(!!e);
                    }}
                  />
                </div>
                <div className={styles.signup_button}>
                  <button
                    className="btn btn-primary w-100"
                    type="submit"
                    disabled={!key}
                  >
                    Đăng kí
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </DefaultLayout>
  );
};

export default index;
