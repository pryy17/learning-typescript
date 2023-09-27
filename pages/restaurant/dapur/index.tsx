/* eslint-disable react-hooks/rules-of-hooks */
import React, { ComponentProps, FC, useContext, useEffect } from "react";
import Template from "../template";
import { DataContext } from "../template/menuContext";

type ContainerProps = ComponentProps<"div">;

const Dapur: FC<ContainerProps> = () => {
  const dataRestaurant = useContext(DataContext);
  if (!dataRestaurant) return undefined;
  const { order, refreshData } = dataRestaurant;

  useEffect(() => {
    refreshData();
  }, []);
  return (
    <div>
      <Template>
        <section className="bg-[#F1F5F9] px-3 py-3 mt-5 min-h-[18em]">
          <div className="grid grid-cols-3 ">
            {order?.map((item: any) => (
              <div key={item.id}>
                <h3 className="font-semibold text-xl">{item.meja}</h3>
                {item.menu.map((food: any) => (
                  <p key={food.id} className="font-normal text-sm mt-4">
                    {food.jumlah}x {food.name}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>
      </Template>
    </div>
  );
};

export default Dapur;
