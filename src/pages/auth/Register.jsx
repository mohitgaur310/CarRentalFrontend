import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { FiMail, FiUser, FiPhone } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Input from '../../components/Forms/Input';
import PasswordInput from '../../components/Forms/PasswordInput';
import Button from '../../components/Buttons/Button';
import { register as registerUser } from '../../redux/slices/authSlice';
import { registerSchema } from '../../utils/validation';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      ...(data.phone ? { phone: data.phone } : {}),
    };

    try {
      const result = await dispatch(registerUser(payload)).unwrap();
      toast.success(result.message || 'Registration successful! Please verify your email.');
      navigate('/verify-otp', {
        state: {
          email: data.email,
          devOtp: result.devOtp,
          otpType: 'email_verification',
        },
      });
    } catch (error) {
      toast.error(error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <span className="text-4xl">🚗</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Create Account</h1>
          <p className="text-gray-500 mt-1">Join CarRental and start your journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="First Name" placeholder="Mohit" leftIcon={<FiUser size={18} />} error={errors.firstName?.message} {...register('firstName')} />
            <Input label="Last Name" placeholder="Gaur" error={errors.lastName?.message} {...register('lastName')} />
          </div>
          <Input label="Email" type="email" placeholder="you@example.com" leftIcon={<FiMail size={18} />} error={errors.email?.message} {...register('email')} />
          <Input label="Phone" placeholder="9876543210" leftIcon={<FiPhone size={18} />} error={errors.phone?.message} {...register('phone')} />
          <PasswordInput label="Password" error={errors.password?.message} {...register('password')} />
          <PasswordInput label="Confirm Password" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
          <p className="text-xs text-gray-500">Min 8 chars, 1 uppercase, 1 lowercase, 1 number</p>
          <Button type="submit" fullWidth loading={loading}>Create Account</Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
