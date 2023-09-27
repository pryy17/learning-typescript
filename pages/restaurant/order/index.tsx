import React, { ComponentProps, FC, useContext, useState } from "react";
import Template from "../template";
import { kuantitas, table } from "./data";
import { Button } from "@/components";
import { DataContext } from "../template/menuContext";
import { type } from "os";

type ContainerProps = ComponentProps<"div">;
type orderType = {
  id: string;
  meja: string;
  menu: {
    id: string;
    name: string;
    jumlah: number | undefined;
    harga: number;
  }[];
};

type menuType = {
  id: string;
  name: string;
  jumlah: number | undefined;
  harga: number;
};

const Order: FC<ContainerProps> = () => {
  const [currentTable, setCurrentTable] = useState<string>("");
  const [menuOrder, setMenuOrder] = useState<string>("");
  const [jumlah, setJumlah] = useState<number | undefined>(0);
  const { dataMenu, order, refreshData } = useContext(DataContext);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.target.name === "makanan") {
      setMenuOrder(e.target.value);
    }
    if (e.target.name === "jumlah") {
      setJumlah(e.target.value);
    }
  };

  const generateRandomFiveDigitString = (): string => {
    const randomNum = Math.floor(Math.random() * 90000) + 10000;
    return randomNum.toString();
  };

  const handleSubmit = async () => {
    if (currentTable && menuOrder && jumlah) {
      const newOrder: menuType = {
        id: generateRandomFiveDigitString(),
        name: menuOrder,
        jumlah,
        harga: dataMenu.filter((item: any) => item.name === menuOrder)[0].harga,
      };

      const mergeOrder = order.map((item: any): orderType => {
        const addMenu = item.menu;

        if (currentTable === item.meja) {
          return {
            id: item.id,
            meja: item.meja,
            menu: [newOrder, ...addMenu],
          };
        }
        return {
          id: item.id,
          meja: item.meja,
          menu: addMenu,
        };
      });

      setCurrentTable("");
      setJumlah(0);
      setMenuOrder("");
      localStorage.setItem("order", JSON.stringify(mergeOrder));
      await refreshData();
    } else {
      alert("tidak boleh kosong");
    }
  };
  return (
    <div>
      <Template>
        <div className="bg-[#F1F5F9] px-3 py-3 mt-5 min-h-[18em]">
          <section>
            <div className="grid grid-cols-3 w-full">
              {order.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setCurrentTable(item.meja)}
                  className={`${
                    currentTable.includes(item.meja)
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } cursor-pointer px-4 py-5 border-[1px] flex justify-center items-center`}
                >
                  <p>{item.meja}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="flex mt-7">
            <div className="flex flex-col">
              <label>Menu</label>
              <select
                onChange={(e) => handleChange(e)}
                value={menuOrder}
                name="makanan"
                className="my-2 py-2 px-3 w-[25em]"
              >
                <option defaultValue="">Pilih Menu</option>
                {dataMenu?.map((item: any) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col ml-3">
              <label>Jumlah</label>
              <select
                onChange={(e) => handleChange(e)}
                value={jumlah}
                name="jumlah"
                className="my-2 py-2 px-3 w-[10em]"
              >
                <option defaultValue={0}>Kuantitas</option>
                {kuantitas?.map((item: any) => (
                  <option key={item.id} value={item.jumlah}>
                    {item.jumlah}
                  </option>
                ))}
              </select>
            </div>
          </section>
          <div className="w-fit ml-auto mt-3">
            {currentTable && menuOrder && jumlah ? (
              <Button text="Tambah" onClick={handleSubmit} />
            ) : (
              <Button text="Tambah" disabled onClick={handleSubmit} />
            )}
          </div>
        </div>
      </Template>
    </div>
  );
};

export default Order;
