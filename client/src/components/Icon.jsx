import {
  // Dedicated
  Book,
  LayoutTextWindowReverse,
  Cpu,
  FileEarmarkX,
  Images,
  Database,

  // Social Media and Contact
  Linkedin,
  Github,
  Instagram,
  TwitterX,
  Whatsapp,
  Envelope,

  // General Purpose
  Person,
  PersonFill,
  Search,
  Link45deg,
  PlusLg,
  XLg,
  Trash,
  ExclamationCircle,
  Twitter,
} from "react-bootstrap-icons";

function Icon({ icon, size }) {
  switch (icon) {
    // Dedicated
    case "book":
      return <Book size={size} />;
    case "layout":
      return <LayoutTextWindowReverse size={size} />;
    case "cpu":
      return <Cpu size={size} />;
    case "not-found":
      return <FileEarmarkX size={size} />;
    case "database":
      return <Database size={size} />;
    case "images":
      return <Images size={size} />;

    // Social Media and Contact
    case "linkedin":
      return <Linkedin size={size} />;
    case "github":
      return <Github size={size} />;
    case "instagram":
      return <Instagram size={size} />;
    case "twitter":
      return <TwitterX size={size} />;
    case "whatsapp":
      return <Whatsapp size={size} />;
    case "Email":
      return <Envelope size={size} />;

    // General Purpose
    case "person":
      return <Person size={size} />;
    case "person-fill":
      return <PersonFill size={size} />;
    case "search":
      return <Search size={size} />;
    case "link":
      return <Link45deg size={size} />;
    case "plus":
      return <PlusLg size={size} />;
    case "x":
      return <XLg size={size} />;
    case "trash":
      return <Trash size={size} />;
    case "exclamation-circle":
      return <ExclamationCircle size={size} />;
    default:
      return <ExclamationCircle size={size} />;
  }
}

export default Icon;
