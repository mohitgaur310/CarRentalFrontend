import { getDisplayName } from './index';

const SORT_MAP = {
  popular: undefined,
  'price-low': 'price_asc',
  'price-high': 'price_desc',
  rating: 'rating_desc',
};

export const mapSortToApi = (sort) => SORT_MAP[sort] || undefined;

export const buildCarQueryParams = (filters = {}) => {
  const params = {};

  if (filters.page) params.page = Number(filters.page);
  if (filters.limit) params.limit = Number(filters.limit);
  if (filters.city) params.city = filters.city;
  if (filters.state) params.state = filters.state;
  if (filters.brand) params.brand = filters.brand;
  if (filters.category) params.category = filters.category;
  if (filters.transmission) params.transmission = filters.transmission;
  if (filters.fuelType) params.fuelType = filters.fuelType;
  if (filters.priceMin) params.minPrice = Number(filters.priceMin);
  if (filters.priceMax) params.maxPrice = Number(filters.priceMax);
  if (filters.isFeatured === true || filters.isFeatured === 'true') {
    params.isFeatured = true;
  }

  const sort = mapSortToApi(filters.sort);
  if (sort) params.sort = sort;

  return params;
};

export const mapApiCar = (car) => {
  if (!car) return null;

  const [lng, lat] = car.location?.coordinates || [];
  const host = car.host || car.owner;

  return {
    id: car._id || car.id,
    name: car.title || car.name,
    title: car.title || car.name,
    brand: car.brand,
    model: car.model,
    year: car.year,
    category: car.category,
    transmission: car.transmission,
    fuelType: car.fuelType,
    seats: car.seats,
    doors: car.doors,
    color: car.color,
    registrationNumber: car.registrationNumber,
    pricePerDay: car.pricePerDay,
    securityDeposit: car.securityDeposit,
    mileageLimitPerDay: car.mileageLimitPerDay,
    extraKmCharge: car.extraKmCharge,
    rating: car.rating ?? 0,
    reviewCount: car.totalReviews ?? car.reviewCount ?? 0,
    totalReviews: car.totalReviews ?? car.reviewCount ?? 0,
    city: car.city,
    state: car.state,
    featured: car.isFeatured ?? car.featured ?? false,
    isFeatured: car.isFeatured ?? car.featured ?? false,
    available: car.isAvailable ?? car.available ?? true,
    isAvailable: car.isAvailable ?? car.available ?? true,
    status: car.status,
    images: car.images || [],
    description: car.description || '',
    features: car.features || [],
    address: car.address,
    location: lng != null && lat != null ? { lat, lng } : car.location,
    owner: host
      ? {
          id: host._id || host.id,
          name: getDisplayName(host) || `${host.firstName || ''} ${host.lastName || ''}`.trim(),
          firstName: host.firstName,
          lastName: host.lastName,
          avatar: host.profileImage || host.avatar || '',
          rating: host.rating ?? 0,
        }
      : null,
    host,
    createdAt: car.createdAt,
    updatedAt: car.updatedAt,
  };
};

export const mapApiCars = (cars = []) => {
  if (!Array.isArray(cars)) return [];
  return cars.map(mapApiCar).filter(Boolean);
};
