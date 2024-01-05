import { CheckCircleTwoTone, MinusSquareTwoTone } from "@ant-design/icons";
import { Button, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";

const TodoListComponent = ({ todo, loading }) => {
  const [loadings, setLoadings] = useState([]);
  const [newTodo, setNewTodo] = useState([]);
  useEffect(() => {
    setNewTodo(todo);
  }, [todo]);
  const doneTask = newTodo.filter((item) => item.completed).length;
  const totalTask = newTodo.length;
  const sortedData = newTodo.slice().sort((a, b) => {
    if (a.completed === b.completed) {
      return 0; // Giữ nguyên vị trí nếu cả hai có cùng giá trị completed
    }
    return a.completed ? 1 : -1; // completed === false trước, completed === true sau
  });
  const enterLoading = (loadingId) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[loadingId] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[loadingId] = false;
        return newLoadings;
      });
      setNewTodo(
        newTodo.map((t) => {
          if (t.id === loadingId) {
            return {
              ...t,
              completed: true,
            };
          } else {
            return t;
          }
        })
      );
    }, 2000);
  };
  return (
    <>
      <List
        className="overflow-auto"
        style={{ height: "500px" }}
        bordered
        loading={loading ? loading : false}
        dataSource={sortedData}
        renderItem={(item) => (
          <List.Item
            className="ant-list-item-no-flex"
            actions={
              item.completed
                ? null
                : [
                    <Button
                      key="mark-done"
                      loading={loadings[item.id]}
                      onClick={() => enterLoading(item.id)}
                    >
                      Mark done
                    </Button>,
                  ]
            }
          >
            <Space>
              {item.completed ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" className="mr-2" />
              ) : (
                <MinusSquareTwoTone twoToneColor="orange" className="mr-2" />
              )}
              {item.title}
            </Space>
          </List.Item>
        )}
      />

      <Typography className="mt-2">
        Done {doneTask}/{totalTask} tasks
      </Typography>
    </>
  );
};

export default TodoListComponent;
