import { Divider } from "antd";

const DividerComponent = ({ title }) => {
  return (
    <Divider orientation="left" plain orientationMargin="0">
      <div className="text-base font-medium">{title}</div>
    </Divider>
  );
};

export default DividerComponent;
