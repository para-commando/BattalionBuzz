import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { isUserNew, isUserValidated } from '../redux/reducers/userAuth';
import { useSelector, useDispatch } from 'react-redux';
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(isUserValidated(true));

    console.log(data);
  };
  console.log(watch('example')); // watch input value by passing the name of it
  return (
    <div>
      <div className='item flex flex-col gap-14 justify-center items-center'>
        <h1 className='text-3xl font-bold p-5'>Create new account,</h1>
        <div className='signUpFormClass border-2 p-5 '>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col justify-center items-center'
          >
            <div className='mb-5 flex-col justify-center items-center'>
              <input
                className='text-black w-[548px] p-1 rounded-xl text-center'
                defaultValue='GhatakCommandoOne'
                placeholder='Enter your call sign...'
                {...register('callSign', {
                  required: true,
                  min: 3,
                  max: 30,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]+$/,
                })}
              />
              <div className='text-red-500 w[548px] flex justify-center items-center'>
                {errors.callSign && <span>Invalid Call Sign</span>}
              </div>
            </div>
            <div className='mb-5 flex-col justify-center items-center'>
              <input
                className='text-black w-[548px] p-1 rounded-xl text-center'
                defaultValue='GhatakForce'
                placeholder='Enter your Regiment...'
                {...register('regiment', {
                  required: true,
                  min: 3,
                  max: 40,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]+$/i,
                })}
              />
              <div className='text-red-500 w[548px] flex justify-center items-center'>
                {errors.regiment && <span>Invalid Regiment name</span>}
              </div>
            </div>
            <div className='mb-5 flex-col justify-center items-center'>
              <input
                className='text-black w-[548px] p-1 rounded-xl text-center'
                defaultValue='8296321779'
                placeholder='Enter your mobile number...'
                type='text'
                {...register('mobileNumber', {
                  required: true,
                  pattern: /^\d{10}$/,
                })}
              />
              <div className='text-red-500 w-[548px] flex justify-center items-center'>
                {errors.mobileNumber && (
                  <span>{errors.mobileNumber.message}</span>
                )}
              </div>
            </div>
            <div className='mb-5 flex flex-col justify-center items-center'>
              <div className='relative w-[548px]'>
                <input
                  className='text-black w-full p-1 rounded-xl text-center'
                  defaultValue='Password3453@'
                  {...register('password', {
                    required: true,
                    minLength: 7,
                    maxLength: 20,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                  })}
                  placeholder='Password'
                  type={showPassword ? 'text' : 'password'}
                />
                <button
                  type='button'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className='text-red-500 w[548px] flex justify-center items-center'>
                {errors.password && (
                  <span className='text-red-500 w[548px] text-wrap break-words'>
                    Password must contain at least one uppercase, one lowercase,
                    one number and one special character
                  </span>
                )}
              </div>
            </div>

            <div className='mb-5 flex flex-col justify-center items-center'>
              <div className='relative w-[548px]'>
                <input
                  className='text-black w-full p-1 rounded-xl text-center'
                  defaultValue='Password3453@'
                  {...register('confirmPassword', {
                    required: true,
                    validate: (value) =>
                      value === watch('password') || 'Passwords do not match',
                  })}
                  placeholder='Confirm Password'
                  type={showConfirmPassword ? 'text' : 'password'}
                />
                <button
                  type='button'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className='text-red-500 w[548px] flex justify-center items-center'>
                {errors.confirmPassword && (
                  <span className='text-red-500 w[548px] text-wrap break-words'>
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
            <div className='flex justify-center'>
              <input
                className='bg-green-800 px-9 py-2 rounded-3xl cursor-pointer'
                type='submit'
              />
            </div>
          </form>
        </div>
      </div>
      <div className='separator'></div>
      <div className='item'></div>
    </div>
  );
}

export default SignUp;
