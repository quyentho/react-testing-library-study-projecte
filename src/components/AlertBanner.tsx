import { Alert } from "react-bootstrap";

interface IProps {
  message?: string;
  variant?: string;
}
export const AlertBanner = ({ message, variant }: IProps) => {
  const alertMessage =
    message || "An unexpected error occurred. Please try again later";
  const alertVariant = variant || "danger";
  return <Alert variant={alertVariant}>{alertMessage}</Alert>;
};
