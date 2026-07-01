import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '../../components/Forms/Input';
import Textarea from '../../components/Forms/Textarea';
import Dropdown from '../../components/Forms/Dropdown';
import Button from '../../components/Buttons/Button';
import PageLoader from '../../components/Loader/PageLoader';
import { TRANSMISSION_TYPES, FUEL_TYPES, CAR_CATEGORIES } from '../../constants';
import {
  createCar,
  updateCar,
  fetchMyCarById,
  clearEditingCar,
} from '../../redux/slices/carsSlice';
import { getErrorMessage } from '../../utils';

const buildCarPayload = (data) => ({
  title: data.title,
  brand: data.brand,
  model: data.model,
  year: Number(data.year),
  category: data.category,
  transmission: data.transmission,
  fuelType: data.fuelType,
  seats: Number(data.seats),
  doors: Number(data.doors),
  color: data.color || undefined,
  registrationNumber: data.registrationNumber,
  pricePerDay: Number(data.pricePerDay),
  securityDeposit: data.securityDeposit ? Number(data.securityDeposit) : undefined,
  mileageLimitPerDay: data.mileageLimitPerDay ? Number(data.mileageLimitPerDay) : undefined,
  extraKmCharge: data.extraKmCharge ? Number(data.extraKmCharge) : undefined,
  city: data.city,
  state: data.state,
  images: data.images
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  description: data.description || undefined,
  features: data.features
    ? data.features.split(',').map((s) => s.trim()).filter(Boolean)
    : undefined,
  location: {
    type: 'Point',
    coordinates: [Number(data.longitude), Number(data.latitude)],
  },
  address: {
    street: data.street || undefined,
    city: data.city,
    state: data.state,
    country: data.country || 'India',
    pincode: data.pincode || undefined,
  },
});

const CarForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { editingCar, loading } = useSelector((state) => state.cars);
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchMyCarById(id));
    }
    return () => {
      dispatch(clearEditingCar());
    };
  }, [dispatch, isEdit, id]);

  useEffect(() => {
    if (!editingCar || !isEdit) return;

    const coords = editingCar.location;
    const lng = coords?.lng ?? coords?.coordinates?.[0];
    const lat = coords?.lat ?? coords?.coordinates?.[1];

    reset({
      title: editingCar.name || editingCar.title,
      brand: editingCar.brand,
      model: editingCar.model,
      year: editingCar.year,
      city: editingCar.city,
      state: editingCar.state,
      pricePerDay: editingCar.pricePerDay,
      category: editingCar.category,
      transmission: editingCar.transmission,
      fuelType: editingCar.fuelType,
      seats: editingCar.seats,
      doors: editingCar.doors,
      color: editingCar.color,
      registrationNumber: editingCar.registrationNumber,
      securityDeposit: editingCar.securityDeposit,
      mileageLimitPerDay: editingCar.mileageLimitPerDay,
      extraKmCharge: editingCar.extraKmCharge,
      description: editingCar.description,
      features: (editingCar.features || []).join(', '),
      images: (editingCar.images || []).join(', '),
      street: editingCar.address?.street,
      pincode: editingCar.address?.pincode,
      country: editingCar.address?.country || 'India',
      longitude: lng,
      latitude: lat,
    });
  }, [editingCar, isEdit, reset]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = buildCarPayload(data);
      if (isEdit && id) {
        await dispatch(updateCar({ id, ...payload })).unwrap();
        toast.success('Car updated successfully');
      } else {
        await dispatch(createCar(payload)).unwrap();
        toast.success('Car listed successfully');
      }
      navigate('/dashboard/my-cars');
    } catch (error) {
      toast.error(getErrorMessage(error) || error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isEdit && loading && !editingCar) {
    return <PageLoader />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{isEdit ? 'Edit Car' : 'Add New Car'}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title" placeholder="BMW 3 Series" {...register('title', { required: true })} />
            <Input label="Brand" placeholder="BMW" {...register('brand', { required: true })} />
            <Input label="Model" placeholder="3 Series" {...register('model', { required: true })} />
            <Input label="Year" type="number" placeholder="2024" {...register('year', { required: true })} />
            <Input label="Registration Number" placeholder="DL04GH3456" {...register('registrationNumber', { required: true })} />
            <Input label="Color" placeholder="White" {...register('color')} />
            <Input label="Seats" type="number" placeholder="5" {...register('seats', { required: true })} />
            <Input label="Doors" type="number" placeholder="4" {...register('doors', { required: true })} />
            <Input label="City" placeholder="Delhi" {...register('city', { required: true })} />
            <Input label="State" placeholder="Delhi" {...register('state', { required: true })} />
            <Input label="Price per Day (₹)" type="number" placeholder="4500" {...register('pricePerDay', { required: true })} />
            <Input label="Security Deposit (₹)" type="number" placeholder="5000" {...register('securityDeposit')} />
            <Input label="Mileage Limit/Day (km)" type="number" placeholder="200" {...register('mileageLimitPerDay')} />
            <Input label="Extra km Charge (₹)" type="number" placeholder="8" {...register('extraKmCharge')} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Dropdown label="Category" value={watch('category') || ''} onChange={(v) => setValue('category', v, { shouldValidate: true })} options={CAR_CATEGORIES.map((c) => ({ value: c, label: c }))} />
            <Dropdown label="Transmission" value={watch('transmission') || ''} onChange={(v) => setValue('transmission', v, { shouldValidate: true })} options={TRANSMISSION_TYPES.map((t) => ({ value: t, label: t }))} />
            <Dropdown label="Fuel Type" value={watch('fuelType') || ''} onChange={(v) => setValue('fuelType', v, { shouldValidate: true })} options={FUEL_TYPES.filter((f) => f !== 'CNG').map((f) => ({ value: f, label: f }))} />
          </div>
          <Textarea label="Description" rows={4} placeholder="Describe your car..." {...register('description')} />
          <Input label="Features (comma-separated)" placeholder="GPS, Bluetooth, Cruise Control" {...register('features')} />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Longitude" type="number" step="any" placeholder="77.209" {...register('longitude', { required: true })} />
            <Input label="Latitude" type="number" step="any" placeholder="28.6139" {...register('latitude', { required: true })} />
            <Input label="Street" placeholder="Connaught Place" {...register('street')} />
            <Input label="Pincode" placeholder="110001" {...register('pincode')} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Images</h2>
          <Textarea
            label="Image URLs (comma-separated)"
            rows={3}
            placeholder="https://example.com/car1.jpg, https://example.com/car2.jpg"
            {...register('images', { required: true })}
          />
          <p className="text-xs text-gray-400 mt-2">At least one image URL is required.</p>
        </div>

        <div className="flex gap-3">
          <Button type="submit" loading={submitting}>{isEdit ? 'Update Car' : 'List Car'}</Button>
          <Button variant="outline" type="button" onClick={() => navigate('/dashboard/my-cars')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
