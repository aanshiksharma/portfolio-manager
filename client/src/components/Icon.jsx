import {
  ExclamationCircle,
  Book,
  LayoutTextWindowReverse,
  Cpu,
  Person,
  FileEarmarkX,
} from "react-bootstrap-icons";

function Icon({ icon, size }) {
  switch (icon) {
    case "book":
      return <Book size={size} />;
    case "layout":
      return <LayoutTextWindowReverse size={size} />;
    case "cpu":
      return <Cpu size={size} />;
    case "person":
      return <Person size={size} />;
    case "not-found":
      return <FileEarmarkX size={size} />;
    case "exclamation-circle":
      return <ExclamationCircle size={size} />;
    default:
      return <ExclamationCircle size={size} />;
  }
}

export default Icon;
