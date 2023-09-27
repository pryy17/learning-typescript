import React, { ComponentProps, FC, useContext, useState } from "react";
import { listMenu } from "./menu";
import { HiRefresh } from "react-icons/hi";
import { useRouter } from "next/router";
import Link from "next/link";
import { DataContext } from "./menuContext";

type ContainerProps = ComponentProps<"div">;
type typeMenu = {
  id: string;
  name: string;
};

const Template: FC<ContainerProps> = ({ children }) => {
  const { asPath } = useRouter();
  const { resetData, refreshData } = useContext<any>(DataContext);

  return (
    <div className="mt-10 w-full flex justify-center">
      <div>
        <div className="my-9">
          <h1 className="font-medium text-6xl text-center">Restaurant Order</h1>
          <p className="font-light text-center text-3xl">
            Ambsius coding chalenge
          </p>
        </div>
        <section className="flex justify-between items-center ">
          <div className="flex py-2 px-2 rounded-md bg-[#F1F5F9]">
            {listMenu.map((item) => (
              <Link href={"/restaurant" + item.link} key={item.id}>
                <div
                  className={`cursor-pointer border-gray-300 px-5 py-2 rounded-md ${
                    asPath.includes(item.link) && "bg-white"
                  }`}
                >
                  <p>{item.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <div
            className="ml-28 flex py-2 cursor-pointer rounded-md px-4 border-[1px] justify-center items-center"
            onClick={() => {
              resetData();
              refreshData();
            }}
          >
            <HiRefresh className="mr-2 text-xl" />
            <p>Reset</p>
          </div>
        </section>
        {children}
        <div className="text-center opacity-70 mt-9">
          <p>Semua data hanya disimpan di Local Storage browser Anda</p>
        </div>
      </div>
    </div>
  );
};

export default Template;
