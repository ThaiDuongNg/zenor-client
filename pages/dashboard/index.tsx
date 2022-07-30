import React, { useCallback, useEffect, useRef, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import styles from "./dashboard.module.scss";
import withAuth from "../../HOCs/withAuth";
import { Table } from "@nextui-org/react";
import MediaServices from "services/musicServices";
import Head from "next/head";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faGear } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { convertArtistsToString, renderStatus } from "helpers";
import musicServices from "services/musicServices";

const headerFields = [
  // "Ảnh bìa",
  "Tên Tác phẩm",
  "Tên (các) Nghệ sĩ/Nhóm",
  "Ngày gửi",
  "Định dạng phát hành",
  "Số Catalogue (CAT No.)",
  "Thông báo",
  "Trạng thái",
  "Chi tiết",
  "Thao tác",
];

const index = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const isFirstCall = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      return;
    }

    getDataAlbum();
  }, []);

  const getDataAlbum = useCallback(async () => {
    try {
      const response = await MediaServices.getListAlbums();
      if (response?.data) {
        setData(response?.data);
        return;
      }

      setData([]);
    } catch (error: any) {
      setData([]);
    }
  }, []);

  const deleteAlbum = useCallback(async (id: string) => {
    try {
      const response = await musicServices.deleteAlbum(id);

      if (response.status === 200) {
        getDataAlbum();
        return;
      }
      alert("Có lỗi xảy ra!");
    } catch (error) {
      alert("Có lỗi xảy ra! (catch)");
    }
  }, []);

  const renderHeader = () => (
    <Table.Header>
      {headerFields.map((item: string, i: number) => (
        <Table.Column key={i} align={item === "Ảnh bìa" ? "center" : "start"}>
          {item}
        </Table.Column>
      ))}
    </Table.Header>
  );

  const renderBody = () => {
    return (
      <Table.Body>
        {data &&
          data.map((item: any) => (
            <Table.Row key={item?.id}>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{convertArtistsToString(item.artists)}</Table.Cell>
              <Table.Cell>
                {dayjs(item.released_date).format("DD/MM/YYYY")}
              </Table.Cell>
              <Table.Cell>{item.format}</Table.Cell>
              <Table.Cell>{item.catalogue}</Table.Cell>
              <Table.Cell>{}</Table.Cell>
              <Table.Cell>{renderStatus(item.status)}</Table.Cell>
              <Table.Cell>
                <span
                  onClick={() => {
                    router.push(`/upload/${item.id}`);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faGear}
                    style={{ fontSize: 20, cursor: "pointer" }}
                  />
                </span>
              </Table.Cell>
              <Table.Cell>
                {item.status !== 2 && (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      deleteAlbum(item.id);
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

  return (
    <DefaultLayout title="Bảng điều khiển">
      <>
        <div className="container">
          <div className={styles.track_header + " my-3"}>
            <h1>Bảng điều khiển</h1>
          </div>
          {data.length ? (
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
          ) : (
            <div className="d-flex align-item-center justify-content-center">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  router.push("/upload");
                }}
              >
                <span className="d-flex">
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    style={{ fontSize: 20, cursor: "pointer", marginRight: 5 }}
                  />
                  <span className="ml-3">Tạo tác phẩm</span>
                </span>
              </button>
            </div>
          )}
        </div>
      </>
    </DefaultLayout>
  );
};

export default withAuth(index);
