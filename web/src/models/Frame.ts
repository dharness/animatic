import _ from "lodash";

export interface Frame {
  id: string;
  imgData: string;
  duration: number;
}

// This is the smallest, empty, base-64 encoded png
const EMPTY_BASE64_PNG =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=";
export const defaultFrame: Frame = {
  id: "default",
  imgData: EMPTY_BASE64_PNG,
  duration: 1,
};

export const parseFrames = (frames: any): { [id: number]: Frame } => {
  return _.mapValues<Frame>(frames, parseFrame);
};

export const parseFrame = (frame: any): Frame => {
  return {
    ...frame,
  };
};
