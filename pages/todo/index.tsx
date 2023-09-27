import { type } from "os";
import React, { ComponentProps, FC, useState } from "react";

type ContainerProps = ComponentProps<"div">;
type listTask = {
  id: string | number;
  name: string;
  isCompleted: boolean;
};
type taskEditActive = {
  id: string | number;
  status: boolean;
};

const Todo: FC<ContainerProps> = ({ className, children, ...props }) => {
  const [listTask, setListTask] = useState<listTask[]>([
    {
      id: 1,
      name: "do mathemathics homework",
      isCompleted: true,
    },
    {
      id: 2,
      name: "playing football",
      isCompleted: false,
    },
  ]);
  const [task, setTask] = useState<string>("");
  const [editTask, setEditTask] = useState<string>("");
  const [isEdit, setIsEdit] = useState<taskEditActive>({
    id: "",
    status: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTask(e.target.value);
  };

  const handleSaveEdit = (id: string | number) => {
    if (editTask !== "") {
      const newTask: listTask[] = listTask.map((item) =>
        item.id == id ? { ...item, name: editTask } : { ...item }
      );
      setListTask(newTask);
      setEditTask("");
    }

    setIsEdit({ id, status: false });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newTask: listTask = {
      id: Math.random(),
      name: task,
      isCompleted: false,
    };
    setListTask([...listTask, newTask]);
    setTask("");
  };

  const handleDelete = (id: string | number) => {
    const newTask: listTask[] = listTask.filter((item) => {
      return item.id !== id;
    });
    setListTask(newTask);
  };

  const handleCompleted = (id: string | number) => {
    const newTask: listTask[] = listTask.map((item) =>
      item.id == id ? { ...item, isCompleted: !item.isCompleted } : { ...item }
    );
    setListTask(newTask);
    console.log(newTask);
    console.log(listTask);
  };

  return (
    <div
      {...props}
      className={`${className}flex-col items-center w-[50%] mt-[7%] mx-auto border-2 px-5 py-3`}
    >
      <h1 className="text-6xl font-bold text-center">TO DO APPS</h1>
      <div>
        <form className="text-left" onSubmit={handleSubmit}>
          <div>
            <label>what do you want to do today?</label>
            <br />
            <input
              type="text"
              name="todo"
              placeholder="do mathemathics homework"
              className="border-2 ps-2 py-2"
              size={100}
              onChange={handleChange}
              value={task}
            />
            <button className="text-center w-20 border-2 py-2 border-l-0">
              enter
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4">
        {listTask?.map((item) => (
          <div key={item.id} className="flex w-fit border-2 py-4 px-2 mb-2">
            {isEdit.status && isEdit.id == item.id ? (
              <form>
                <input
                  className="border-2"
                  type="text"
                  name={item.name}
                  defaultValue={item.name}
                  onChange={handleChangeEdit}
                />
              </form>
            ) : (
              <h2 className="border-r-2 border-black pr-4">{item.name}</h2>
            )}
            <div className="flex justify-between ml-7">
              <p
                className={`mr-7 cursor-pointer ${
                  item.isCompleted ? "font-bold" : ""
                }`}
                onClick={() => {
                  handleCompleted(item.id);
                }}
              >
                sudah
              </p>
              <p
                className={`mr-7 cursor-pointer ${
                  item.isCompleted ? "" : "font-bold"
                }`}
                onClick={() => {
                  handleCompleted(item.id);
                }}
              >
                belum
              </p>

              <div>
                {isEdit.status && isEdit.id == item.id ? (
                  <p
                    className="text-blue-600 mr-7 cursor-pointer"
                    onClick={() => {
                      handleSaveEdit(item.id);
                    }}
                  >
                    save
                  </p>
                ) : (
                  <p
                    className="text-blue-600 mr-7 cursor-pointer"
                    onClick={() => {
                      setIsEdit({
                        id: item.id,
                        status: true,
                      });
                    }}
                  >
                    Edit
                  </p>
                )}
              </div>

              <p
                className="text-red-600 cursor-pointer"
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                Delete
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
