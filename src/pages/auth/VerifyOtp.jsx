import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import OtpInput from '../../components/Forms/OtpInput';
import Button from '../../components/Buttons/Button';
import { verifyOtp } from '../../redux/slices/authSlice';
import { authApi } from '../../api/auth.api';
import { OTP_TYPES } from '../../constants';
import { getErrorMessage } from '../../utils';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const devOtp = location.state?.devOtp;
  const otpType = location.state?.otpType || OTP_TYPES.EMAIL_VERIFICATION;

  const handleVerify = async () => {
    if (otp.length < 6) {
      toast.error('Please enter the complete OTP');
      return;
    }
    if (!email) {
      toast.error('Email is missing. Please register again.');
      navigate('/register');
      return;
    }

    setLoading(true);
    try {
      await dispatch(
        verifyOtp({
          identifier: email,
          otp,
          type: otpType,
        })
      ).unwrap();
      toast.success('Email verified successfully! Please sign in.');
      navigate('/login', { state: { email } });
    } catch (error) {
      toast.error(error || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      const { data } = await authApi.sendOtp({
        identifier: email,
        type: otpType,
      });
      toast.success('OTP sent successfully');
      if (data?.devOtp) {
        toast(`Dev OTP: ${data.devOtp}`, { icon: '🔑' });
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">📧</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Verify OTP</h1>
        <p className="text-gray-500 mt-2">
          Enter the 6-digit code sent to <strong>{email || 'your email'}</strong>
        </p>

        {devOtp && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
            Dev OTP: <strong>{devOtp}</strong>
          </div>
        )}

        <div className="mt-8">
          <OtpInput value={otp} onChange={setOtp} />
        </div>

        <Button onClick={handleVerify} fullWidth loading={loading} className="mt-8">Verify</Button>

        <p className="text-sm text-gray-500 mt-6">
          Didn&apos;t receive the code?{' '}
          <button type="button" onClick={handleResend} className="text-primary-600 font-medium hover:underline">Resend OTP</button>
        </p>

        <Link to="/login" className="block text-sm text-gray-500 mt-4 hover:text-primary-600">Back to login</Link>
      </div>
    </div>
  );
};

export default VerifyOtp;
