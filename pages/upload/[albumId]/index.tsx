import { Table, useModal } from "@nextui-org/react";
import Button from "components/Button";
import Modal from "components/UploadScreens/Modal";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import withAuth from "../../../HOCs/withAuth";
import { ISelect, ITrack, Size, TypeButton } from "../../../interfaces";
import DefaultLayout from "../../../layout/DefaultLayout";
import musicServices from "../../../services/musicServices";
import styles from "./albumId.module.scss";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faPaperPlane,
  faMicrophoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { convertArtistsToString } from "helpers";
import ModalConfirm from "components/UploadScreens/ModalConfirm";
import dayjs from "dayjs";

type Props = {};

const headerFields = [
  "Tên bản ghi",
  "Link liên kết",
  "Version",
  "Tên (các) Nghệ sĩ/Nhóm",
  "Tên (các) Producer/Mixer",
  "Tên (các) Người soạn nhạc",
  "Tên (các) Người viết lời",
  "Thao tác",
];

const index = (props: Props) => {
  const router = useRouter();
  const { albumId } = router.query;
  const [dataTrack, setDataTrack] = useState<any>({});
  const isCallAPI = useRef<boolean>(false);
  const { setVisible, bindings, visible } = useModal();
  const [isVisibleConfirm, setIsVisibleConfirm] = useState<boolean>(false);
  const [version, setVersion] = useState<ISelect[]>([]);
  const isFirst = useRef<boolean>(false);

  //! UseEffect
  useEffect(() => {
    if (albumId && !isCallAPI.current) {
      isCallAPI.current = true;
      getTracks();
    }
  }, [albumId]);

  useEffect(() => {
    const getVersion = async () => {
      try {
        const response = await musicServices.getListVersion();
        if (response?.data) {
          const convert = [...response.data].map((item) => ({
            label: item.title,
            value: item.id,
          }));

          setVersion(convert);
          return;
        }

        setVersion([]);
      } catch (error: any) {
        setVersion([]);
      }
    };

    if (!isFirst.current) {
      isFirst.current = true;
      return;
    }

    getVersion();
  }, []);

  // useEffect(() => {
  //   console.log(dataTrack, "dataTrack");
  // }, [dataTrack]);

  //! Functions
  const renderHeader = () => (
    <Table.Header>
      {headerFields.map((item: string, i: number) => (
        <Table.Column key={i}>{item}</Table.Column>
      ))}
    </Table.Header>
  );

  const renderBody = () => {
    return (
      <Table.Body>
        {dataTrack?.tracks &&
          dataTrack?.tracks?.map((item: ITrack, index: number) => (
            <Table.Row key={index}>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.download_link}</Table.Cell>
              <Table.Cell>{renderVersion(item.version_id)}</Table.Cell>
              <Table.Cell>{convertArtistsToString(item?.artists)}</Table.Cell>
              <Table.Cell>
                {item?.producers?.map((item) => item.name).join(", ")}
              </Table.Cell>
              <Table.Cell>
                {item?.composers?.map((item) => item.name).join(", ")}
              </Table.Cell>
              <Table.Cell>
                {item?.lyricists?.map((item) => item.name).join(", ")}
              </Table.Cell>
              <Table.Cell>
                {dataTrack?.status !== 2 && (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      item.id && deleteTracks(item.id as string);
                    }}
                  >
                    Xoá
                  </a>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    );
  };

  const renderVersion = (versionID: string) => {
    if (!version.length) return "";
    const find = version.find((item) => item.value === versionID);

    return find?.label || versionID;
  };

  const getTracks = async () => {
    try {
      const response = await musicServices.getTrackByAlbumId(albumId as string);
      if (response.status === 200) {
        setDataTrack(response.data ?? []);
        return;
      }

      router.push("/404");
    } catch (error) {
      router.push("/404");
    }
  };

  const deleteTracks = async (track_id: string) => {
    try {
      const response = await musicServices.deleteTrack(
        albumId as string,
        track_id
      );

      if (response.status === 200) {
        getTracks();
        return;
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  const handleSubmit = useCallback(async () => {
    try {
      const response = await musicServices.submitTrack(albumId as string);
      if (response.data) {
        toast.success("Gửi tác phẩm thành công");
        setTimeout(() => {
          router.push("/dashboard");
        }, 4000);
      }
    } catch (error: any) {
      toast.error("Có lỗi xảy ra");
    }
  }, [albumId, dataTrack]);

  const handleSaveDraft = async (values: any) => {
    try {
      const bodyReq = { tracks: [values] };
      const response = await musicServices.createTrack(
        albumId as string,
        bodyReq
      );

      if (response.data) {
        toast.success("Tạo thêm bản ghi thành công");
        getTracks();
        bindings.onClose();
      }
    } catch (error: any) {
      toast.error("Có lỗi xảy ra");
    }
  };

  const onClickSubmit = () => {
    if (dataTrack.format === "single" && dataTrack.tracks.length > 3) {
      toast.error("Tác phẩm single không vượt quá 4 bản ghi");
      return;
    }

    if (dataTrack.format === "ep" || dataTrack.format === "mini-album") {
      if (dataTrack.tracks.length < 3 || dataTrack.tracks.length > 6) {
        toast.error(
          `Tác phẩm ${dataTrack.format} phải có ít nhất 4 bản ghi và không vượt quá 6 bản ghi`
        );
        return;
      }
    }

    if (dataTrack.format === "album") {
      toast.error(`Tác phẩm ${dataTrack.format} phải có ít nhất 7 bản ghi`);
      return;
    }

    setIsVisibleConfirm(true);
  };

  return (
    <DefaultLayout title="Tạo bản ghi">
      <>
        <div className={styles.track + " container"}>
          <div className={styles.track_title}>
            <div className={styles.track_title_img + " p-4"}>
              <img
                src={dataTrack?.cover?.url}
                style={{ width: "100%", height: 300 }}
                className="rounded"
              />
            </div>
            <div className={styles.track_title_content + " p-4"}>
              <div className="">
                <div>Tác phẩm</div>
                <p className="h1 pt-3">{dataTrack?.title}</p>
                <div>
                  <FontAwesomeIcon
                    icon={faMicrophoneAlt}
                    style={{ fontSize: 20, cursor: "pointer", marginRight: 5 }}
                  />
                  <span>{convertArtistsToString(dataTrack?.artists)}</span>
                </div>
                <p className="pt-3">
                  {dayjs(dataTrack?.release_time).format("DD/MM/YYYY")}
                </p>
              </div>
              <button
                className="btn btn-primary"
                type="button"
                onClick={onClickSubmit}
                disabled={dataTrack.status === 2 || !dataTrack?.tracks?.length}
              >
                <span className="d-flex">
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    style={{ fontSize: 20, cursor: "pointer", marginRight: 5 }}
                  />
                  Gửi tác phẩm
                </span>
              </button>
            </div>
          </div>
          <div className={styles.track_table + " py-4"}>
            <div className="d-flex justify-content-between align-items-start p-3">
              <label className="h4 p-1">Tracklist</label>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  setVisible(true);
                }}
                disabled={dataTrack.status === 2}
              >
                <span className="d-flex">
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    style={{ fontSize: 20, cursor: "pointer", marginRight: 5 }}
                  />
                  <span className="">Thêm bản ghi</span>
                </span>
              </button>
            </div>

            {dataTrack?.tracks?.length && (
              <div className={styles.track_body}>
                <Table
                  aria-label="Example table with static content"
                  css={{
                    height: "auto",
                    minWidth: "100%",
                  }}
                >
                  {renderHeader()}
                  {renderBody()}
                </Table>
              </div>
            )}
          </div>
        </div>
        {visible && (
          <Modal
            isSingle={false}
            defaultTitle={dataTrack.tracks?.[0]?.title || ""}
            version={version}
            bindings={bindings}
            setVisible={setVisible}
            handleSaveDraft={handleSaveDraft}
          />
        )}
        {isVisibleConfirm && (
          <ModalConfirm
            setVisible={setIsVisibleConfirm}
            submit={handleSubmit}
          />
        )}
      </>
    </DefaultLayout>
  );
};
export default withAuth(index);
