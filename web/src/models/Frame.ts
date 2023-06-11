import _ from "lodash";

export interface Frame {
  id: string;
  imgData: string;
  duration: number;
}

export const defaultFrame: Frame = {
  id: "default",
  imgData: "",
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
