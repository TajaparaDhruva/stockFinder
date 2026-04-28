import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { User, Mail, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import Button from '../components/Button';
import api from '../services/api';
import authBg from '../assets/auth_bg.png';

const schema = yup.object().shape({
  name: yup.string().required('Required').min(3, 'Too short'),
  email: yup.string().email('Invalid').required('Required'),
  password: yup.string().required('Required').min(8, 'Min 8 chars'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Mismatch').required('Required'),
  agreeTerms: yup.boolean().oneOf([true], 'Must agree'),
});

const calculateStrength = (password) => {
  if (!password) return { label: '', percent: 0, color: 'bg-white/5' };
  let score = 0;
  if (password.length > 7) score += 1;
  if (password.match(/(?=.*[A-Z])/)) score += 1;
  if (password.match(/(?=.*[0-9])/)) score += 1;
  if (password.match(/(?=.*[!@#$%^&*])/)) score += 1;
  return { 
    label: score < 2 ? 'WEAK' : score < 4 ? 'GOOD' : 'SECURE', 
    percent: score * 25, 
    color: 'bg-primary' 
  };
};

const CreateAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const passwordValue = watch('password');
  const strength = calculateStrength(passwordValue);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
        role
      });
      if (response.data.success) {
        toast.success('Account Ready.');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Sign Up" 
      subtitle="Create your identity"
      image={authBg}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex gap-2 mb-2">
          {['customer', 'retailer'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 py-1 rounded-full text-[8px] font-black uppercase tracking-widest transition-all border ${
                role === r ? 'bg-white text-black border-white' : 'bg-transparent text-gray-600 border-white/5'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-1">
          <InputField label="Name" icon={User} error={errors.name} {...register('name')} />
          <InputField label="Email" icon={Mail} error={errors.email} {...register('email')} />
          
          <div>
            <InputField label="Password" type="password" icon={ShieldCheck} error={errors.password} {...register('password')} />
            <div className="flex justify-between items-center px-1 h-1.5 mb-2">
              <div className="flex gap-1 flex-1 h-full">
                {[25, 50, 75, 100].map((t) => (
                  <div key={t} className={`flex-1 rounded-full ${strength.percent >= t ? strength.color : 'bg-white/5'}`} />
                ))}
              </div>
              <span className="text-[7px] font-black text-gray-600 ml-2">{strength.label}</span>
            </div>
          </div>
          
          <InputField label="Confirm" type="password" icon={ShieldCheck} error={errors.confirmPassword} {...register('confirmPassword')} />
        </div>
        
        <div className="flex items-center gap-2">
          <input id="terms" type="checkbox" className="w-3 h-3 rounded bg-black text-primary" {...register('agreeTerms')} />
          <label htmlFor="terms" className="text-[7px] text-gray-600 font-bold uppercase">Agree to Protocols</label>
        </div>
        
        <div className="pt-1">
          <Button type="submit" isLoading={isLoading} disabled={!isValid}>Register &rarr;</Button>
        </div>
        
        <div className="text-center pt-2">
          <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">
            Member? <Link to="/login" className="text-primary hover:underline">Sign In Now</Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default CreateAccount;
