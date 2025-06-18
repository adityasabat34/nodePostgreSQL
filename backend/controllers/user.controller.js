import prisma from "../utils/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please add all fields");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long.");
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new ApiError(400, "User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  if (newUser) {
    const token = generateToken(user.id, res);

    res.status(201).json(
      new ApiResponse(
        201,
        {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
          token,
        },
        "user successfully created"
      )
    );
  } else {
    throw new ApiError(400, "Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please add all fields");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isMatchPassword = await bcrypt.compare(password, user.password);

  if (!isMatchPassword) {
    throw new ApiError(400, "Invalid credentials");
  }

  const token = generateToken(user.id, res);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
      },
      "user successfully logged in"
    )
  );
});

const getAllUsersEmail = asyncHandler(async (req, res) => {});

export { registerUser, loginUser, getAllUsersEmail };
