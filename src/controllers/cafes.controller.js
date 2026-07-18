import {
  obtenerCafes,
  crearCafe,
  eliminarCafe,
  actualizarCafe,
} from "../services/cafes.service.js";

export const getCafes = async (req, res) => {
  try {
    const cafes = await obtenerCafes();

    res.status(200).json(cafes);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

export const postCafe = async (req, res) => {
  try {
    const { nombre } = req.body;

    const cafe = await crearCafe(nombre);

    res.status(201).json(cafe);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

export const deleteCafe = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const cafeEliminado = await eliminarCafe(id);

    // Si no existe el café, respondemos con 404.
    if (!cafeEliminado) {
      return res.status(404).json({
        mensaje: "El café no existe",
      });
    }

    res.status(200).json(cafeEliminado);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

export const putCafe = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const cafe = req.body;

    // Validamos que ambos ids coincidan.
    if (id !== cafe.id) {
      return res.status(400).json({
        mensaje: "El id del parámetro no coincide con el id del café",
      });
    }
    // Actualizamos el café.
    const cafeActualizado = await actualizarCafe(id, {
      nombre: cafe.nombre,
    });

    // Si el café no existe.
    if (!cafeActualizado) {
      return res.status(404).json({
        mensaje: "El café no existe",
      });
    }
    // Respondemos con éxito.
    res.status(200).json(cafeActualizado);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};
