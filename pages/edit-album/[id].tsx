import React, { useEffect, useRef, useState } from "react";
import withAuth from "../../HOCs/withAuth";
import DefaultLayout from "../../layout/DefaultLayout";
import styles from "../upload/upload.module.scss";
import Album from "components/UploadScreens/Album";
import { useRouter } from "next/router";
import musicServices from "services/musicServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBackward,
  faBackwardFast,
  faBackwardStep,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface Props {}

const index = (props: Props) => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const { id } = router.query;
  const [idAlbum, setIdAlbum] = useState<string>("");

  const [dataTrack, setDataTrack] = useState<any>({});
  const [optionGenre, setOptionGenre] = useState([]);

  const isCallAPI = useRef<boolean>(false);

  const [isLoading, setLoading] = useState<boolean>(false);

  const getTracks = async () => {
    try {
      setLoading(true);
      const response = await musicServices.getTrackByAlbumId(id as string);
      if (response.status === 200) {
        setDataTrack({
          ...response.data,
          release_time: new Date(response?.data?.release_time),
        });
        setLoading(false);
        return;
      }
      setLoading(false);
      router.push("/404");
    } catch (error) {
      setLoading(false);
      router.push("/404");
    }
  };

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

  useEffect(() => {
    if (id && !isCallAPI.current) {
      isCallAPI.current = true;
      getTracks();
      getListGenre();
    }
  }, [id]);

  console.log("data: ", dataTrack);

  return (
    <DefaultLayout title="Edit tác phẩm">
      <>
        {isLoading ? null : (
          <div className={styles.upload}>
            <div className="mb-5 container d-flex flex-column ">
              <Link href={`/upload/${id}`}>
                <a className="tw-mt-4">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{ fontSize: 18, cursor: "pointer" }}
                    className="tw-pr-2"
                  />
                  Quay lại
                </a>
              </Link>

              <h1 className="pt-5 pb-3">Edit tác phẩm</h1>
              <Album
                nextStep={() => {
                  setStep(2);
                }}
                setIdAlbum={(idAlbum: string) => setIdAlbum(idAlbum)}
                initData={dataTrack}
                initGenres={optionGenre}
              />
            </div>
          </div>
        )}
      </>
    </DefaultLayout>
  );
};

export default withAuth(index);
