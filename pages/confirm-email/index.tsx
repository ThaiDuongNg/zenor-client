import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "components/Loading";
import toast from "react-hot-toast";
import musicServices from "../../services/musicServices";

type Props = {};

const index = (props: Props) => {
  const router = useRouter();
  const { code } = router.query;
  const [contentFail, setContentFail] = useState<string>("");

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const rs = await musicServices.confirmEmail(code as string);

        if (rs?.data?.message) {
          setContentFail(rs?.data?.message);
          return;
        }

        toast.success("Đăng kí thành công");
        setTimeout(() => {
          router.push("/login");
        }, 500);
      } catch (error: any) {
        setContentFail("Có lỗi xảy ra");
      }
    };

    code && confirmEmail();
  }, [code]);

  return (
    <div
      className="flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100%" }}
    >
      {contentFail ? <div>{contentFail}</div> : <Loading />}
    </div>
  );
};

export default index;
