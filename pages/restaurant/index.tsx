import React, { ComponentProps, FC } from "react";

type ContainerProps = ComponentProps<"div">;

const Reestaurant: FC<ContainerProps> = () => {
  return (
    <div>
      <p>restaurant</p>
    </div>
  );
};

export default Reestaurant;
