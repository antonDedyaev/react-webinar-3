import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Spinner() {
  const cn = bem("Loader");

  return (
    <div className={cn({ is: "active" })}>
      <div className={cn("content")}></div>
    </div>
  );
}

export default Spinner;
