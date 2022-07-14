import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Track.module.scss";
import { Radio, Table } from "@nextui-org/react";
import { ITrack, Size, TypeButton } from "../../../interfaces";
import { Formik, FormikValues, Form, Field } from "formik";
import musicServices from "../../../services/musicServices";
import Input from "components/Input";
import MusicService from "services/musicServices";
import Select from "components/Select";
import InputTag from "components/InputTag";
import Button from "components/Button";

interface Props {
  idAlbum: string;
}

const headerFields = [
  "Tên Bản ghi*",
  "Tên Version*",
  "Mã ISRC",
  "Tên (những) Nghệ sĩ/Nhóm*",
  "Tên (những) Producer/Mixer",
  "Tên (những) Người soạn nhạc*",
  "Tên (những) Nquoi viết lời*",
];

// 3mHPUNeuNdTzw2
const dummy = [
  {
    title: "ten ban ghi",
    version: "Tên Version*",
    isrc: "Mã ISRC",
    artist: " Nghệ sĩ/Nhóm*",
    producers: "producers",
    composers: "composers",
    lyricists: "lyricists",
  },
];

const initValues: ITrack = {
  album_id: "3mHPUNeuNdTzw2",
  title: "",
  download_link: "https://www.facebook.com/",
  irsc: "",
  version_id: "",
  artists: [
    {
      link: "",
      name: "",
    },
  ],
  producers: [
    {
      link: "",
      name: "",
    },
  ],
  composers: [
    {
      link: "",
      name: "",
    },
  ],
  lyricists: [
    {
      link: "",
      name: "",
    },
  ],
};

const index = ({ idAlbum }: Props) => {
  const [track, setTrack] = useState([]);
  const [version, setVersion] = useState<{ label: string; value: string }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const refFormik = useRef<any>();

  useEffect(() => {
    const getVersion = async () => {
      try {
        const response = await MusicService.getListVersion();

        if (response?.data) {
          const convert = [...response.data].map((item) => ({
            label: item.version_title,
            value: item.id,
          }));

          setVersion(convert);
          return;
        }

        setVersion([]);
      } catch (error: any) {
        setVersion([]);
        console.log(error, "err");
      }
    };
    getVersion();
  }, []);

  // const renderheader = () => (
  //   <Table.Header>
  //     {headerFields.map((item: string, i: number) => (
  //       <Table.Column key={i}>{item}</Table.Column>
  //     ))}
  //   </Table.Header>
  // );

  // const renderBody = () => (
  //   <Table.Body>
  //     {dummy.map((item, index) => (
  //       <Table.Row key={index}>
  //         <Table.Cell>{item.title}</Table.Cell>
  //         <Table.Cell>{item.version}</Table.Cell>
  //         <Table.Cell>{item.isrc}</Table.Cell>
  //         <Table.Cell>{item.artist}</Table.Cell>
  //         <Table.Cell>{item.producers}</Table.Cell>
  //         <Table.Cell>{item.composers}</Table.Cell>
  //         <Table.Cell>{item.lyricists}</Table.Cell>
  //       </Table.Row>
  //     ))}
  //   </Table.Body>
  // );

  const renderRow = (body: ITrack) => {};

  const handleSubmit = useCallback(async (values: FormikValues) => {
    // console.log(values, "values");
    try {
      const bodyReq = { tracks: [values] };
      const response = await musicServices.createTrack(
        values.album_id,
        bodyReq
      );

      if (response?.data) {
      }
      // console.log(response, "response");
    } catch (error: any) {
      console.log(error, "error");
    }
  }, []);

  const renderGroup = (name: string) => {
    return (
      <Radio.Group
        onChange={(value: string | number) => {
          if (refFormik?.current) {
            refFormik.current.setFieldValue(name, value === 0);
          }
        }}
        row
        value={1}
      >
        <Radio value={0}>Có</Radio>
        <Radio value={1}>Không</Radio>
      </Radio.Group>
    );
  };

  return (
    <div className={styles.track}>
      <Formik
        innerRef={refFormik}
        validateOnBlur={true}
        validateOnChange={true}
        // validationSchema={validateAlbum}
        initialValues={{ ...initValues, album_id: idAlbum }}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          // useEffect(() => {
          //   console.log(values, "Button");
          // }, [values]);

          return (
            <Form>
              <div className={styles.input_track}>
                <Field
                  component={Input}
                  name="download_link"
                  placeholder="Điền Liên kết có thể tải xuống Bản ghi"
                />
              </div>
              <div className={styles.input_track}>
                <Field
                  component={Input}
                  name="title"
                  placeholder="Tên Bản ghi"
                />
              </div>
              <div className={styles.input_track}>
                <Field
                  component={Select}
                  options={version}
                  name="version_id"
                  placeholder="Tên Version"
                />
              </div>
              <div className={styles.input_track}>
                <Field component={Input} name="irsc" placeholder="Mã ISRC" />
              </div>
              <div className={styles.input_track}>
                <Field
                  component={InputTag}
                  name="artists"
                  placeholder="Tên (các) Nghệ sĩ/Nhóm"
                />
              </div>
              <div className={styles.input_track}>
                <Field
                  component={InputTag}
                  name="producers"
                  placeholder="Tên (các) Producer/Mixer"
                />
              </div>
              <div className={styles.input_track}>
                <Field
                  component={InputTag}
                  name="composers"
                  placeholder="Tên (các) Người soạn nhạc"
                />
              </div>
              <div className={styles.input_track}>
                <Field
                  component={InputTag}
                  name="lyricists"
                  placeholder="Tên (các) Người viết lời"
                />
              </div>
              <div className={styles.input_track}>
                <div style={{ display: "flex" }}>
                  <label>Bản ghi này có lời?</label>
                  {renderGroup("has_lyrics")}
                </div>
              </div>
              <div className={styles.input_track}>
                <div style={{ display: "flex" }}>
                  <label>Bản ghi có nhạc cụ?</label>
                  {renderGroup("has_instruments")}
                </div>
              </div>
              <Button
                title="Tạo bản ghi"
                type={TypeButton.Submit}
                loading={loading}
                size={Size.Md}
              />
            </Form>
          );
        }}
      </Formik>
      {/* <Table
        aria-label="Example table with static content"
        // css={{
        //   height: "auto",
        //   minWidth: "100%",
        // }}
      >
        {renderheader()}
        {renderBody()}
      </Table> */}
    </div>
  );
};

export default index;
