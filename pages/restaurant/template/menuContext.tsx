import React, {
  ComponentProps,
  createContext,
  useEffect,
  useState,
} from "react";

type DataContextProps = {
  dataMenu: typeMenu[];
  setDataMenu: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        name: string;
      }[]
    >
  >;
  refreshData: () => void;
  resetData: () => void;
  order: orderType[];
};

type ContainerProps = ComponentProps<"div">;
type typeMenu = {
  id: string;
  name: string;
  harga: number;
};
type orderType = {
  id: string;
  meja: string;
  menu: {
    id: string;
    name: string;
    jumlah: number;
    harga: number;
  }[];
};

const dataMenuInitial: typeMenu[] = [
  {
    id: "12345",
    name: "ayam rica-rica",
    harga: 10000,
  },
  {
    id: "12245",
    name: "soto banjar",
    harga: 20000,
  },
];
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

const DataContext = createContext<DataContextProps | string>("test");

const DataProvider: React.FC<ContainerProps> = ({ children }) => {
  const [dataMenu, setDataMenu] = useState<typeMenu[]>([]);
  const [order, setOrder] = useState<orderType[]>([]);

  const refreshData = () => {
    setDataMenu(JSON.parse(localStorage.getItem("menu") || "{}"));
    setOrder(JSON.parse(localStorage.getItem("order") || "{}"));
  };

  const resetData = () => {
    localStorage.setItem("menu", JSON.stringify(dataMenuInitial));
    localStorage.setItem("order", JSON.stringify(dataOrderInitial));
  };
  useEffect(() => {
    if (!localStorage.getItem("menu") && !localStorage.getItem("order")) {
      localStorage.setItem("menu", JSON.stringify(dataMenuInitial));
      localStorage.setItem("order", JSON.stringify(dataOrderInitial));
      setDataMenu(JSON.parse(localStorage.getItem("menu") || "{}"));
      setOrder(JSON.parse(localStorage.getItem("order") || "{}"));
    } else {
      setDataMenu(JSON.parse(localStorage.getItem("menu") || "{}"));
      setOrder(JSON.parse(localStorage.getItem("order") || "{}"));
    }
  }, []);
  return (
    <DataContext.Provider
      value={{ dataMenu, setDataMenu, refreshData, order, resetData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
