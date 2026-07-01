import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Input from '../../components/Forms/Input';
import PasswordInput from '../../components/Forms/PasswordInput';
import OtpInput from '../../components/Forms/OtpInput';
import Button from '../../components/Buttons/Button';
import { authApi } from '../../api/auth.api';
import { getErrorMessage } from '../../utils';
import { resetPasswordSchema } from '../../utils/validation';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: location.state?.email || '' },
  });

  const onSubmit = async (data) => {
    if (otp.length < 6) {
      toast.error('Please enter the complete OTP');
      return;
    }
    try {
      await authApi.resetPassword({
        email: data.email,
        otp,
        newPassword: data.newPassword,
      });
      toast.success('Password reset successfully. Please sign in.');
      navigate('/login', { state: { email: data.email } });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
        <p className="text-gray-500 mt-2">Enter the OTP from your email and your new password</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">OTP Code</label>
            <OtpInput value={otp} onChange={setOtp} />
          </div>
          <PasswordInput label="New Password" error={errors.newPassword?.message} {...register('newPassword')} />
          <PasswordInput label="Confirm Password" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
          <Button type="submit" fullWidth loading={isSubmitting}>Reset Password</Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link to="/login" className="text-primary-600 font-medium hover:underline">Back to login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
