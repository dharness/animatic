import { normalize, schema } from "normalizr";
import { Frame, parseFrames } from "./Frame";
import _ from "lodash";

export interface Track {
  id: string;
  frames: Frame[];
}

const frame = new schema.Entity("frames");
const track = new schema.Entity("tracks", {
  frames: [frame],
});

const tracksSchema = new schema.Array(track);

export const parseTracks = (data: any) => {
  let { tracks, frames } = normalize(data, tracksSchema).entities;
  tracks = _.mapValues<Track>(tracks, parseTrack);
  frames = parseFrames(frames);
  return { tracks, frames };
};

export const parseTrack = (data: any) => ({
  id: data.id,
  frames: data.frames,
});
