// src/controllers/userController.ts

import { Request, ResponseToolkit } from "@hapi/hapi";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

function checkId(payload: any, h: ResponseToolkit) {
  if (!payload || !payload.id) {
    return h.response({ message: "ID is required" }).code(400);
  }
  const id = Number(payload.id);
  if (isNaN(id)) {
    return h.response({ message: "Invalid ID format" }).code(400);
  }
  console.log("id:", typeof id);
  return id;
}

export const getAllUsers = async (request: Request, h: ResponseToolkit) => {
  try {
    const users: User[] = await prisma.user.findMany();
    return h.response(users).code(200);
  } catch (error) {
    const errorMessage = (error as Error).message || "Unknown error";
    const errorResponse: { error: string } = { error: errorMessage };
    return h.response(errorResponse).code(500);
  }
};

export const fetchUserById = async (request: Request, h: ResponseToolkit) => {
  const payload = request.payload as { id?: string }; // Pastikan id bisa undefined

  const id = checkId(payload, h);

  if (typeof id !== "number") {
    // Jika checkId mengembalikan objek respons, kembalikan langsung
    console.log("itype d:", typeof id);
    return id;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user) {
      return h.response(user).code(200);
    } else {
      return h.response({ message: "User not found" }).code(404);
    }
  } catch (error) {
    const errorMessage = (error as Error).message || "Unknown error";
    const errorResponse = { error: errorMessage };
    return h.response(errorResponse).code(500);
  }
};

export const EditUserById = async (request: Request, h: ResponseToolkit) => {
  const payload = request.payload as {
    id?: string;
    username?: string;
    email?: string;
  }; // Tambahkan field lain sesuai kebutuhan

  const id = checkId(payload, h);
  if (typeof id !== "number") {
    return id;
  }

  try {
    const { username, email } = payload;

    // Perbarui data pengguna
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { username, email }, // Update field yang diinginkan
    });

    return h.response(updatedUser).code(200);
  } catch (error) {
    const errorMessage = (error as Error).message || "Unknown error";
    const errorResponse = { error: errorMessage };
    return h.response(errorResponse).code(500);
  }
};

export const DeleteUserById = async (request: Request, h: ResponseToolkit) => {
  const payload = request.payload as { id?: string };

  const id = checkId(payload, h);
  if (typeof id !== "number") {
    return id;
  }

  try {
    // Hapus pengguna
    await prisma.user.delete({
      where: { id },
    });

    return h.response({ message: "User deleted successfully" }).code(200);
  } catch (error) {
    const errorMessage = (error as Error).message || "Unknown error";
    const errorResponse = { error: errorMessage };
    return h.response(errorResponse).code(500);
  }
};
