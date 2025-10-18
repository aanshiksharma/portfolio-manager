import {
  // Dedicated
  Book,
  LayoutTextWindowReverse,
  Cpu,
  FileEarmarkX,
  FileEarmarkText,
  Images,
  Database,

  // Social Media and Contact
  Linkedin,
  Github,
  Instagram,
  TwitterX,
  Whatsapp,
  Envelope,
  Telephone,

  // General Purpose
  Person,
  PersonFill,
  Search,
  Link45deg,
  PlusLg,
  XLg,
  PencilSquare,
  Trash,
  ExclamationCircle,
  InfoCircle,
  CheckCircle,
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
    case "resume":
      return <FileEarmarkText size={size} />;

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
    case "mail":
      return <Envelope size={size} />;
    case "mobile":
      return <Telephone size={size} />;

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
    case "edit":
      return <PencilSquare size={size} />;
    case "info-circle":
      return <InfoCircle size={size} />;
    case "check-circle":
      return <CheckCircle size={size} />;
    case "exclamation-circle":
      return <ExclamationCircle size={size} />;
    default:
      return <ExclamationCircle size={size} />;
  }
}

export default Icon;
