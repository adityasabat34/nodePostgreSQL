import prisma from "../utils/prisma";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    throw new ApiError(401, "Unauthorized - No token found");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    throw new ApiError(401, "Unauthorized - Invalid token");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
    select: {
      id: true,
      email: true,
      isAdmin: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new ApiError(401, "Unauthorized - User not found");
  }

  req.user = user;
  next();
});

const admin = (req, res, next) => {
  if (req.user?.isAdmin === true) {
    next();
  } else {
    throw new ApiError(403, "Forbidden - User is not an admin");
  }
};

export { protect, admin };
