import Head from "next/head";
import React from "react";
import withAuth from "../../HOCs/withAuth";
import DefaultLayout from "../../layout/DefaultLayout";
import styles from "./styles.module.scss";
import { Field, Form, Formik, FormikValues } from "formik";
import FloatingInput from "components/FloatingInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import InputField from "../../components/InputField";

type Props = {};

const index = (props: Props) => {
  return (
    <DefaultLayout title="Trợ giúp">
      <>
        <div className="container">
          <div
            className={"d-flex align-items-center justify-content-center my-3"}
          >
            <h1>Trợ giúp</h1>
          </div>
          <div className="d-flex align-items-center justify-content-center my-3 input-group">
            <InputField />
            <button type="button" className="btn btn-primary">
              <FontAwesomeIcon
                icon={faSearch}
                style={{ fontSize: 20, cursor: "pointer" }}
              />
            </button>
          </div>
        </div>
      </>
    </DefaultLayout>
  );
};

export default withAuth(index);
