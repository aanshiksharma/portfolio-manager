import {
  ExclamationCircle,
  Book,
  LayoutTextWindowReverse,
  Cpu,
  Person,
  FileEarmarkX,
  Images,
  Database,
  Linkedin,
  Github,
  Search,
  Link45deg,
  PlusLg,
  XLg,
  Trash,
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
    case "trash":
      return <Trash size={size} />;
    case "database":
      return <Database size={size} />;
    case "images":
      return <Images size={size} />;
    case "linkedin":
      return <Linkedin size={size} />;
    case "github":
      return <Github size={size} />;
    case "not-found":
      return <FileEarmarkX size={size} />;
    case "exclamation-circle":
      return <ExclamationCircle size={size} />;
    default:
      return <ExclamationCircle size={size} />;
  }
}

export default Icon;
