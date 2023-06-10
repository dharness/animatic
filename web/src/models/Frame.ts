import _ from "lodash";

export interface Frame {
  id: string;
  imgUrl: string;
  imgData: string;
  duration: number;
  index: number;
}

export const parseFrames = (frames: any): { [id: number]: Frame } => {
  return _.mapValues<Frame>(frames, parseFrame);
};

export const parseFrame = (frame: any): Frame => {
  return {
    ...frame,
    imgData: "",
  };
};
