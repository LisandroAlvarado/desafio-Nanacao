import prisma from "../config/prisma.js";

export const obtenerCafes = async () => {
  return await prisma.cafe.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export const obtenerCafePorId = async (id) => {
  return await prisma.cafe.findUnique({
    where: {
      id,
    },
  });
};

export const crearCafe = async (nombre) => {
  return await prisma.cafe.create({
    data: {
      nombre,
    },
  });
};

export const eliminarCafe = async (id) => {
  const cafe = await prisma.cafe.findUnique({
    where: {
      id,
    },
  });

  // Si el café no existe, devolvemos null.
  if (!cafe) {
    return null;
  }

  return await prisma.cafe.delete({
    where: {
      id,
    },
  });
};

export const actualizarCafe = async (id, datosCafe) => {
  const cafe = await prisma.cafe.findUnique({
    where: {
      id,
    },
  });

  // Si el café no existe, devolvemos null.
  if (!cafe) {
    return null;
  }

  return await prisma.cafe.update({
    where: {
      id,
      data: datosCafe,
    },
  });
};
