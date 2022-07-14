import React, { useState } from "react";
import withAuth from "../../HOCs/withAuth";
import DefaultLayout from "../../layout/DefaultLayout";
import styles from "./upload.module.scss";
import Album from "components/UploadScreens/Album";

interface Props {}

const index = (props: Props) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [idAlbum, setIdAlbum] = useState<string>("");

  return (
    <DefaultLayout title="Gửi Tác phẩm">
      <>
        <div className={styles.upload}>
          <div className="mb-5 container d-flex flex-column justify-content-center align-items-center">
            <h1 className="pt-5 pb-3">Tạo tác phẩm</h1>
            <Album
              nextStep={() => {
                setStep(2);
              }}
              setIdAlbum={(idAlbum: string) => setIdAlbum(idAlbum)}
            />
          </div>
        </div>
      </>
    </DefaultLayout>
  );
};

export default withAuth(index);
