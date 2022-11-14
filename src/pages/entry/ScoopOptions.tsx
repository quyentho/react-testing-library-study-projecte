import { useState } from "react";
import { Col } from "react-bootstrap";
import { useAddonContext } from "../../contexts/AddonContext";

interface IProps {
  name: string;
  image: string;
}
export const ScoopOptions = ({ name, image: imagePath }: IProps) => {
  const {
    setAddOnQuantity,
    value: { scoops },
  } = useAddonContext();
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <input
        type="number"
        value={scoops[name] || 0}
        onChange={(e) => {
          setAddOnQuantity("scoops", name, +e.target.value);
        }}
      ></input>
    </Col>
  );
};
