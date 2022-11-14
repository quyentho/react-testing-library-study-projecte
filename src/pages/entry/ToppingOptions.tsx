import { Col } from "react-bootstrap";
import { useAddonContext } from "../../contexts/AddonContext";

interface IProps {
  name: string;
  image: string;
}
export const ToppingOptions = ({ name, image: imagePath }: IProps) => {
  const {
    setAddOnQuantity,
    value: { toppings },
  } = useAddonContext();
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <input
        type="checkbox"
        checked={toppings[name] || false}
        onChange={(e) => setAddOnQuantity("toppings", name, e.target.checked)}
      />
    </Col>
  );
};
