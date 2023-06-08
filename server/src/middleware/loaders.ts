import prisma from "../utils/prisma";

export async function loadTrack(req, res, next) {
  const trackId = Number(req.params.trackId);
  if (isNaN(trackId)) return res.status(400).send("Invalid track id");

  const track = await prisma.track.findUnique({
    where: { id: trackId },
  });
  if (track === null) return res.status(400).send("Cannot find track");
  if (track.userId !== req.user.id) {
    return res.status(401).send("User does not have access to this track");
  }
  req.track = track;
  next();
}

// export async function loadFrame(req, res, next) {
//   const frameId = Number(req.params.frameId);
//   const frame = await prisma.frame.findUnique({
//     where: { id: frameId },
//   });
//   if (frame === null) return res.status(400).send("Cannot find frame");
//   req.frame = frame;
//   next();
// }
