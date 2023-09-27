import React, {
  ComponentProps,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import Template from "../template";
import { Button } from "@/components";
import { HiTrash } from "react-icons/hi";
import { DataContext } from "../template/menuContext";

type ContainerProps = ComponentProps<"div">;

const Menu: FC<ContainerProps> = () => {
  const [menu, setMenu] = useState<any>();
  const [food, setFood] = useState<string>("");
  const [harga, setHarga] = useState<number>();
  const { dataMenu, refreshData } = useContext(DataContext);
  const generateRandomFiveDigitString = (): string => {
    const randomNum = Math.floor(Math.random() * 90000) + 10000;
    return randomNum.toString();
  };

  useEffect(() => {
    setMenu(dataMenu);
  }, [dataMenu]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (food) {
      const newData = [
        ...dataMenu,
        {
          id: generateRandomFiveDigitString(),
          name: food,
          harga: harga,
        },
      ];
      console.log(newData);
      localStorage.setItem("menu", JSON.stringify(newData));
      refreshData();
      setFood("");
      setHarga(0);
    } else {
      alert("isi terlebih dahulu");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "makanan") {
      setFood(e.target.value);
    }

    if (e.target.name === "harga") {
      setHarga(e.target.valueAsNumber);
    }
  };

  const handleDelete = (id: string) => {
    const newMenu = dataMenu.filter((item: any) => {
      return item.id !== id;
    });
    localStorage.setItem("menu", JSON.stringify(newMenu));
    refreshData();
  };

  return (
    <div>
      <Template>
        <section className="py-3 mt-5 bg-[#F1F5F9] border-none px-4">
          <h2 className="mb-2">Menu Makanan</h2>
          <form onSubmit={handleSubmit} className="flex">
            <div className="flex flex-col">
              {" "}
              <label>nama</label>
              <input
                className="py-3 px-2 w-[27em] rounded-md border-[1px]"
                type="text"
                name="makanan"
                value={food}
                placeholder="Tambahkan disini"
                onChange={handleChange}
              />
              <label>harga</label>
              <input
                className="py-3 px-2 w-[27em] rounded-md border-[1px]"
                type="number"
                name="harga"
                min={0}
                value={harga}
                placeholder="Berapa harganya"
                onChange={handleChange}
              />
            </div>

            {food && harga ? (
              <Button eventClick={() => ""} typeColor="primary" text="Tambah" />
            ) : (
              <Button
                eventClick={() => ""}
                typeColor="primary"
                disabled={true}
                text="Tambah"
              />
            )}
          </form>
        </section>
        <section className="bg-[#F1F5F9] min-h-[14em]">
          <div>
            <div className=" px-4 grid grid-cols-12 bg-[#F1F5F9] py-4 border-b-[1px]">
              <p className="grid col-span-2">ID</p>
              <p className="grid col-span-8">Menu</p>
              <p className="grid col-span-2">Hapus?</p>
            </div>
            {menu?.map((item: any) => (
              <div
                key={item.id}
                className=" px-4 grid grid-cols-12 bg-[#F1F5F9] py-4 border-b-[1px]"
              >
                <p className="grid col-span-2">{item.id}</p>
                <p className="grid col-span-6">{item.name}</p>
                <p className="grid col-span-2">{item.harga}</p>
                <p className="grid col-span-2">
                  <HiTrash
                    onClick={() => handleDelete(item.id)}
                    className="text-xl text-red-600 cursor-pointer"
                  />
                </p>
              </div>
            ))}
          </div>
          <div className="text-center py-4">
            <p>Daftar menu restoran Anda</p>
          </div>
        </section>
      </Template>
    </div>
  );
};

export default Menu;
