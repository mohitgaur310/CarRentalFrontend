import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Input from '../../components/Forms/Input';
import Button from '../../components/Buttons/Button';

const DashboardSettings = () => {
  const { user } = useSelector((state) => state.auth);

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

      <div className="max-w-2xl space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Profile Settings</h2>
          <Input label="First Name" defaultValue={user?.firstName || ''} />
          <Input label="Last Name" defaultValue={user?.lastName || ''} />
          <Input label="Email" type="email" defaultValue={user?.email || ''} />
          <Input label="Phone" defaultValue={user?.phone || ''} />
          <Button onClick={handleSave}>Save Changes</Button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Notifications</h2>
          {['Email notifications', 'SMS notifications', 'Push notifications', 'Booking updates'].map((item) => (
            <label key={item} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{item}</span>
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600" />
            </label>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-red-600 mb-2">Danger Zone</h2>
          <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all data.</p>
          <Button variant="danger">Delete Account</Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;
