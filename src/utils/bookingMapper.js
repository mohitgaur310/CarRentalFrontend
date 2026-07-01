import { mapApiCar } from './carMapper';
import { getDisplayName } from './index';

export const mapApiBooking = (booking) => {
  if (!booking) return null;

  const car = booking.car
    ? mapApiCar({
        ...booking.car,
        _id: booking.car._id,
        title: booking.car.title || booking.car.name,
      })
    : null;

  return {
    id: booking._id || booking.id,
    bookingNumber: booking.bookingNumber,
    status: booking.status,
    startDate: booking.startDate,
    endDate: booking.endDate,
    totalDays: booking.totalDays,
    pricePerDay: booking.pricePerDay,
    totalAmount: booking.totalAmount,
    securityDeposit: booking.securityDeposit,
    notes: booking.notes,
    hostNotes: booking.hostNotes,
    cancellationReason: booking.cancellationReason,
    cancelledBy: booking.cancelledBy,
    car,
    renter: booking.renter,
    host: booking.host
      ? {
          ...booking.host,
          name: getDisplayName(booking.host),
        }
      : null,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt,
  };
};

export const mapApiBookings = (bookings = []) => {
  if (!Array.isArray(bookings)) return [];
  return bookings.map(mapApiBooking).filter(Boolean);
};

export const BOOKING_STATUS_VARIANT = {
  pending: 'warning',
  accepted: 'primary',
  rejected: 'danger',
  cancelled: 'danger',
  ongoing: 'success',
  completed: 'default',
};
