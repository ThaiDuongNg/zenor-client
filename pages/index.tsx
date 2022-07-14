import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { List } from "interfaces";
import todoServices from "services/todoServices";
import useSagaCreators from "hooks/useSagaCreators";
import TodoModel from "models/todo.model";
import SlideSection from "components/SlideSection";
import DefaultLayout from "../layout/DefaultLayout";
import withAuth from "../HOCs/withAuth";
import Platform from "components/Platform";
import FAQ from "components/FAQ";
import PackageService from "components/PackageService";
import Target from "components/Target";
import musicServices from "../services/musicServices";

interface IHome {
  todoList: List<TodoModel>;
}

const Home: NextPage<IHome> = ({ todoList }) => {
  const { dispatch } = useSagaCreators();
  const [dataPlan, setDataPlan] = useState<any>([]);

  //! UseEffect
  useEffect(() => {
    getList();
  }, []);
  //! Function

  const getList = async () => {
    try {
      const response = await musicServices.getListPlan();
      if (response.status === 200 && response.data) {
        // console.log(response.data, "response");
        const list = response.data.map((item: any) => ({
          ...item,
          detail: splitString(item.detail),
        }));

        setDataPlan(list);
        return;
      }

      setDataPlan([]);
    } catch (error) {
      setDataPlan([]);
    }
  };

  function splitString(text: string) {
    return text.split("- ").slice(1).length
      ? text.split("- ").slice(1)
      : [text];
  }

  //! Render
  return (
    <DefaultLayout title="Trang chủ">
      <>
        <SlideSection />
        <Target />
        <Platform />
        <PackageService data={dataPlan} />
        <FAQ />
      </>
    </DefaultLayout>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default withAuth(Home);
