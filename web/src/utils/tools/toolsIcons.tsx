import brushIcon from "./../../assets/brush.svg";
import eraserIcon from "./../../assets/eraser.svg";
import { ToolId } from "../../reducers/toolsSlice";

export default {
  [ToolId.Brush]: brushIcon,
  [ToolId.Eraser]: eraserIcon,
};
