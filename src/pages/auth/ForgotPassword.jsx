import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Input from '../../components/Forms/Input';
import Button from '../../components/Buttons/Button';
import { authApi } from '../../api/auth.api';
import { getErrorMessage } from '../../utils';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await authApi.forgotPassword(data);
      toast.success('If the email exists, an OTP has been sent');
      navigate('/reset-password', { state: { email: data.email } });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <Link to="/login" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 mb-6">
          <FiArrowLeft size={16} /> Back to login
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
        <p className="text-gray-500 mt-2">Enter your email and we&apos;ll send you an OTP</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <Input label="Email" type="email" placeholder="you@example.com" leftIcon={<FiMail size={18} />} error={errors.email?.message} {...register('email')} />
          <Button type="submit" fullWidth loading={isSubmitting}>Send OTP</Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
