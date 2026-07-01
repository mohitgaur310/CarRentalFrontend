import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Button from '../../components/Buttons/Button';
import Badge from '../../components/Common/Badge';
import PageLoader from '../../components/Loader/PageLoader';
import { fetchMyCars, deleteCar } from '../../redux/slices/carsSlice';
import { formatCurrency } from '../../utils';

const MyCars = () => {
  const dispatch = useDispatch();
  const { myCars, loading, error } = useSelector((state) => state.cars);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    dispatch(fetchMyCars());
  }, [dispatch]);

  const handleDelete = async (carId) => {
    if (!window.confirm('Remove this car from listings?')) return;
    setDeletingId(carId);
    try {
      await dispatch(deleteCar(carId)).unwrap();
      toast.success('Car removed from listings');
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Failed to delete car');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading && myCars.length === 0) {
    return <PageLoader />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Cars</h1>
        <Link to="/dashboard/add-car"><Button leftIcon={<FiPlus size={16} />}>Add Car</Button></Link>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {myCars.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">You haven&apos;t listed any cars yet.</p>
          <Link to="/dashboard/add-car"><Button className="mt-4">Add Your First Car</Button></Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {myCars.map((car) => (
            <div key={car.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <img src={car.images[0]} alt={car.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{car.name}</h3>
                    <p className="text-sm text-gray-500">{car.city}</p>
                  </div>
                  <Badge variant={car.available ? 'success' : 'danger'}>
                    {car.status === 'unavailable' ? 'Unavailable' : car.available ? 'Available' : 'Booked'}
                  </Badge>
                </div>
                <p className="text-primary-600 font-semibold mt-2">{formatCurrency(car.pricePerDay)}/day</p>
                <div className="flex gap-2 mt-4">
                  <Link to={`/dashboard/edit-car/${car.id}`} className="flex-1">
                    <Button variant="outline" fullWidth leftIcon={<FiEdit2 size={14} />}>Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    leftIcon={<FiTrash2 size={14} />}
                    loading={deletingId === car.id}
                    onClick={() => handleDelete(car.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCars;
