import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, res, next) => {
  console.log("REQ BODY:", req.body);

  if (!req.body) {
    return next(new ErrorHandler("Request body missing", 400));
  }

  const { firstName, lastName, email, date, time, phone } = req.body;

  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(
      new ErrorHandler("Please Fill Full Reservation Form!", 400)
    );
  }

  try {
    await Reservation.create({
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
    });

    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(
        new ErrorHandler(validationErrors.join(", "), 400)
      );
    }

    return next(error);
  }
};