import supabase from "../supabase";

async function requireAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  const { data, error } = await supabase.auth.getUser(token);
  if (error !== null) return res.sendStatus(401);

  console.log(data);
  next();
}

export { requireAuth };
