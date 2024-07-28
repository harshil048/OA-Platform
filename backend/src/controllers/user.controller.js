// backend/controllers/authController.js
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ApiError(400, 'User already exists'));
  }

  const user = new User({ name, email, password, role });
  await user.save();

  res.status(201).json(new ApiResponse(201, user, 'User registered successfully'));
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError(400, 'Invalid credentials'));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ApiError(400, 'Invalid credentials'));
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshTokens.push(refreshToken);
  await user.save();

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, // Prevent JavaScript access to cookies
    secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
    sameSite: 'strict', // Restrict cookie to same-site requests
    maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expiration time (1 week)
  });
  res.cookie('accessToken', accessToken, {
    httpOnly: true, // Prevent JavaScript access to cookies
    secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
    sameSite: 'strict', // Restrict cookie to same-site requests
  });

  res.json(new ApiResponse(200, { accessToken, refreshToken }, 'Login successful'));
});

export const refresh = asyncHandler(async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return next(new ApiError(401, 'No token provided'));
  }

  const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.findById(payload._id);
  if (!user || !user.refreshTokens.includes(token)) {
    return next(new ApiError(403, 'Invalid refresh token'));
  }

  const newAccessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();

  user.refreshTokens = user.refreshTokens.filter(t => t !== token);
  user.refreshTokens.push(newRefreshToken);
  await user.save();

  res.json(new ApiResponse(200, { accessToken: newAccessToken, refreshToken: newRefreshToken }, 'Token refreshed successfully'));
});

export const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1
      }
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
      new ApiResponse(
        200,
        {},
        "User logout successfull !!!."
      )
    );
});