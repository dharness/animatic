import { normalize, schema } from "normalizr";
import { defaultFrame, parseFrames } from "./Frame";
import _ from "lodash";

export interface Track {
  id: string;
  frames: string[];
}

export const defaultTrack: Track = {
  id: "default",
  frames: [defaultFrame.id],
};

const frame = new schema.Entity("frames");
const track = new schema.Entity("tracks", {
  frames: [frame],
});

const tracksSchema = new schema.Array(track);

export const parseTracks = (data: any) => {
  for (const track of data) {
    if (track.frames.length === 0) {
      track.frames = [defaultFrame.id];
    }
  }
  const { entities } = normalize(data, tracksSchema);
  let { tracks, frames } = entities;
  tracks = _.mapValues<Track>(tracks, parseTrack);
  frames = parseFrames(frames);
  return { tracks, frames };
};

export const parseTrack = (data: any) => ({
  id: data.id,
  frames: data.frames,
});
