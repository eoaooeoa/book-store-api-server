import jwt from "jsonwebtoken";

function loginRequired(req, res, next) {
  const userToken = req.headers["authorization"]?.split(" ")[1];

  if (!userToken || userToken === "null") {
    console.log("Service Use Request. But, Authorization Token: Nothing");
    res.status(403).json({
      result: "forbidden-approach",
      reason: "Your Not User!",
    });

    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey);

    const userId = jwtDecoded.userId;

    req.currentUserId = userId;

    next();
  } catch (error) {
    res.status(403).json({
      result: "forbidden-approach",
      reason: "This is not an available token.",
    });

    return;
  }
}

export { loginRequired };
