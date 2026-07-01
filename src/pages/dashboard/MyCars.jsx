import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import Button from '../../components/Buttons/Button';
import Badge from '../../components/Common/Badge';
import { mockCars } from '../../services/mockData';
import { formatCurrency } from '../../utils';

const MyCars = () => {
  const myCars = mockCars.slice(0, 3);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Cars</h1>
        <Link to="/dashboard/add-car"><Button leftIcon={<FiPlus size={16} />}>Add Car</Button></Link>
      </div>

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
                <Badge variant={car.available ? 'success' : 'danger'}>{car.available ? 'Available' : 'Booked'}</Badge>
              </div>
              <p className="text-primary-600 font-semibold mt-2">{formatCurrency(car.pricePerDay)}/day</p>
              <div className="flex gap-2 mt-4">
                <Link to={`/dashboard/edit-car/${car.id}`} className="flex-1">
                  <Button variant="outline" fullWidth leftIcon={<FiEdit2 size={14} />}>Edit</Button>
                </Link>
                <Button variant="danger" leftIcon={<FiTrash2 size={14} />}>Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCars;
