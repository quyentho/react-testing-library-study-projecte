import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { AlertBanner } from "../../components/AlertBanner";
import { Scoop } from "../../types/Scoop";
import { ScoopOptions } from "./ScoopOptions";
import { ToppingOptions } from "./ToppingOptions";

interface IProps {
  optionType: string;
  subTotal: number;
}
export const Options = ({ optionType, subTotal }: IProps) => {
  const [items, setItems] = useState<Scoop[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => setError(true));
  }, [optionType]);
  if (error) return <AlertBanner></AlertBanner>;

  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;
  const optionItems = items.map((item, index) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        image={item.imagePath}
      ></ItemComponent>
    );
  });

  return (
    <>
      <Row>
        <Col>
          <span>
            {optionType} total: ${subTotal.toFixed(2)}
          </span>
        </Col>
      </Row>
      <Row> {optionItems}</Row>
    </>
  );
};
