import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '../../components/Forms/Input';
import Textarea from '../../components/Forms/Textarea';
import Dropdown from '../../components/Forms/Dropdown';
import Button from '../../components/Buttons/Button';
import { TRANSMISSION_TYPES, FUEL_TYPES, CAR_CATEGORIES } from '../../constants';

const CarForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } = useForm();

  const onSubmit = (data) => {
    toast.success(isEdit ? 'Car updated successfully' : 'Car listed successfully');
    navigate('/dashboard/my-cars');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{isEdit ? 'Edit Car' : 'Add New Car'}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Car Name" placeholder="BMW 3 Series" {...register('name')} />
            <Input label="Brand" placeholder="BMW" {...register('brand')} />
            <Input label="Model" placeholder="3 Series" {...register('model')} />
            <Input label="Year" type="number" placeholder="2024" {...register('year')} />
            <Input label="City" placeholder="Delhi" {...register('city')} />
            <Input label="Price per Day (₹)" type="number" placeholder="4500" {...register('pricePerDay')} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Dropdown label="Category" value={watch('category') || ''} onChange={(v) => setValue('category', v)} options={CAR_CATEGORIES.map((c) => ({ value: c, label: c }))} />
            <Dropdown label="Transmission" value={watch('transmission') || ''} onChange={(v) => setValue('transmission', v)} options={TRANSMISSION_TYPES.map((t) => ({ value: t, label: t }))} />
            <Dropdown label="Fuel Type" value={watch('fuelType') || ''} onChange={(v) => setValue('fuelType', v)} options={FUEL_TYPES.map((f) => ({ value: f, label: f }))} />
          </div>
          <Textarea label="Description" rows={4} placeholder="Describe your car..." {...register('description')} />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Images</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <p className="text-gray-500">Drag & drop images here or click to browse</p>
            <p className="text-xs text-gray-400 mt-2">PNG, JPG up to 5MB each. Max 10 images.</p>
            <Button variant="outline" className="mt-4" type="button">Upload Images</Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit">{isEdit ? 'Update Car' : 'List Car'}</Button>
          <Button variant="outline" type="button" onClick={() => navigate('/dashboard/my-cars')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
