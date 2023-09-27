import React, {
  ComponentProps,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import Template from "../template";
import { Button } from "@/components";
import { DataContext } from "../template/menuContext";

type ContainerProps = ComponentProps<"div">;
type typeMenu = {
  id: string;
  name: string;
};
type orderType = {
  id: string;
  meja: string;
  menu: {
    id: string;
    name: string;
    jumlah: number;
  }[];
};

const dataOrderInitial: orderType[] = [
  {
    id: "12345",
    meja: "Meja 1",
    menu: [],
  },
  {
    id: "13345",
    meja: "Meja 2",
    menu: [],
  },
  {
    id: "15445",
    meja: "Meja 3",
    menu: [],
  },
];

const Kasir: FC<ContainerProps> = () => {
  const [struk, setStruk] = useState<typeMenu[]>([]);
  const { order, refreshData } = useContext(DataContext);
  const [selectTable, setSelectTable] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlePrintStruk = () => {
    const newStruk = order.filter((item: any) => item.id === selectTable);
    setStruk(newStruk[0].menu);
    console.log(newStruk[0].menu);
    setIsOpen(true);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const resetTable = async () => {
    localStorage.setItem("order", JSON.stringify(dataOrderInitial));
    setStruk([]);
    refreshData();
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectTable(e.target.value);
  };
  return (
    <Template>
      <section className="bg-[#F1F5F9] px-3 py-3 mt-5">
        <div>
          <label>Meja</label>
          <div>
            <select
              onChange={(e) => handleChange(e)}
              name="meja"
              className="my-2 py-2 px-3 w-[13em]"
            >
              <option defaultValue="">Nomor Meja</option>
              {order
                ?.filter((item: any) => item.menu.length > 0)
                .map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.meja}
                  </option>
                ))}
            </select>
            {selectTable ? (
              <Button text="Print struk" onClick={handlePrintStruk} />
            ) : (
              <Button text="Print struk" disabled onClick={handlePrintStruk} />
            )}
            {isOpen && (
              <Button
                text="Kosongkan meja"
                className="mr-auto"
                onClick={() => {
                  resetTable();
                  setIsOpen(false);
                }}
                typeColor="danger"
              />
            )}
          </div>
        </div>
      </section>
      <section className="bg-[#F1F5F9] min-h-[18em]">
        <div>
          <div className=" px-4 grid grid-cols-12 bg-[#F1F5F9] py-4 ">
            <p className="grid col-span-2">Jumlah</p>
            <p className="grid col-span-8">Menu</p>
            <p className="grid col-span-2">Harga</p>
          </div>
          {struk &&
            struk?.map((item) => (
              <div
                key={item.id}
                className=" px-4 grid grid-cols-12 bg-[#F1F5F9] py-4 border-t-[1px]"
              >
                <p className="grid col-span-2">{item.jumlah}</p>
                <p className="grid col-span-8">{item.name}</p>
                <p className="grid col-span-2">{item.jumlah * item.harga}</p>
              </div>
            ))}
        </div>
        <div className="text-center py-4">
          <p>
            Terima kasih sudah makan di <strong>Restoran</strong>
          </p>
        </div>
      </section>
    </Template>
  );
};

export default Kasir;
