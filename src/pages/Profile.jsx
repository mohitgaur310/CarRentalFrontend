import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '../components/Forms/Input';
import Button from '../components/Buttons/Button';
import Breadcrumb from '../components/Common/Breadcrumb';
import { userApi } from '../api/user.api';
import { setUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { getDisplayName, getInitials, getErrorMessage } from '../utils';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await userApi.getMe();
        reset({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
        });
        dispatch(setUser(data));
      } catch {
        // Use cached user from auth state
      }
    };
    loadProfile();
  }, [dispatch, reset]);

  const onSubmit = async (data) => {
    try {
      const { data: updatedUser } = await userApi.updateMe({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      });
      dispatch(setUser(updatedUser));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const displayName = getDisplayName(user);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Profile' }]} />
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-bold">
            {getInitials(displayName) || 'U'}
          </div>
          <div>
            <p className="font-medium text-gray-900">{displayName}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            {user?.isEmailVerified && (
              <span className="text-xs text-green-600">Email verified</span>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" {...register('firstName')} />
            <Input label="Last Name" {...register('lastName')} />
          </div>
          <Input label="Email" type="email" disabled {...register('email')} />
          <Input label="Phone" {...register('phone')} />
          <Button type="submit">Save Profile</Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
