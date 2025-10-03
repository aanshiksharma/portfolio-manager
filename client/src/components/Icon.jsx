import {
  ExclamationCircle,
  Book,
  LayoutTextWindowReverse,
  Cpu,
  Person,
  FileEarmarkX,
  PlusLg,
  XLg,
  Images,
  Database,
  Search,
  Link45deg,
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
    case "plus":
      return <PlusLg size={size} />;
    case "x":
      return <XLg size={size} />;
    case "search":
      return <Search size={size} />;
    case "link":
      return <Link45deg size={size} />;
    case "database":
      return <Database size={size} />;
    case "images":
      return <Images size={size} />;
    case "not-found":
      return <FileEarmarkX size={size} />;
    case "exclamation-circle":
      return <ExclamationCircle size={size} />;
    default:
      return <ExclamationCircle size={size} />;
  }
}

export default Icon;
