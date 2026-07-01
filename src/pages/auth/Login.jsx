import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { FiMail } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import Input from '../../components/Forms/Input';
import PasswordInput from '../../components/Forms/PasswordInput';
import Button from '../../components/Buttons/Button';
import { login, setCredentials } from '../../redux/slices/authSlice';
import { loginSchema } from '../../utils/validation';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [demoLoading, setDemoLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error || 'Login failed');
    }
  };

  const handleDemoLogin = () => {
    setDemoLoading(true);
    const demoUser = {
      _id: 'demo',
      firstName: 'Demo',
      lastName: 'User',
      fullName: 'Demo User',
      email: 'demo@carrental.com',
      role: 'user',
      isEmailVerified: true,
    };
    dispatch(setCredentials({ user: demoUser, accessToken: 'demo-token', refreshToken: 'demo-refresh' }));
    toast.success('Logged in as Demo User');
    navigate('/');
    setDemoLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary-600 items-center justify-center p-12">
        <div className="text-white max-w-md">
          <span className="text-5xl">🚗</span>
          <h1 className="text-4xl font-bold mt-6">Welcome Back</h1>
          <p className="text-primary-100 mt-4 text-lg">
            Sign in to access your bookings, manage your cars, and explore premium vehicles.
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <span className="text-4xl">🚗</span>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">CarRental</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
          <p className="text-gray-500 mt-2">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              leftIcon={<FiMail size={18} />}
              error={errors.email?.message}
              {...register('email')}
            />
            <PasswordInput
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register('password')}
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-sm text-primary-600 hover:underline">Forgot password?</Link>
            </div>
            <Button type="submit" fullWidth loading={loading}>Sign In</Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">or continue with</span></div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button variant="outline" leftIcon={<FcGoogle size={20} />}>Google</Button>
              <Button variant="outline" onClick={handleDemoLogin} loading={demoLoading}>Demo Login</Button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary-600 font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
