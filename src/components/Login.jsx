import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  isUserValidated,
  isUserSubmitting,
} from '../redux/reducers/userAuth';
import { useSelector, useDispatch } from 'react-redux';
import {
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../lib/firebase.js';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const [showSubmit, setShowSubmit] = useState(true);
  const isSubmitting = useSelector(
    (state) => state.userAuthReducerExport.valueIsSubmitting
  );

  // includes firebase authentication module for email and password authentication
  const onSubmit = async (data) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    try {
      // state handlings
      dispatch(isUserSubmitting(true));
      setShowSubmit(false);
      setShowLoading(true);
      data.email = data.callSign + '@gmail.com';
      const aa = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log('🚀 ~ onSubmit ~ aa:', aa);
      console.log(data);
      dispatch(isUserValidated(true));
     } catch (error) {
      let errorMessage = 'Something went wrong, please try again';
      if ((error.code = 'auth/invalid-credential')) {
        errorMessage = 'Invalid credentials, please check your credentials';
      }
      console.log('🚀 ~ onSubmit ~ error:', JSON.stringify(error));
      alert(errorMessage);
     } finally {
      // state handlings
      setShowSubmit(true);
      setShowLoading(false);
      dispatch(isUserSubmitting(false));
    }
  };

  // returns a component created using react-hook-form

  return (
    <>
      <div>
        <div className='item flex flex-col gap-14 justify-center items-center'>
          <h1 className='text-3xl font-bold p-5'>Login to your account,</h1>
          <div className='loginFormClass border-2 p-5 '>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col justify-center items-center'
            >
              <div className='mb-5 flex-col justify-center items-center'>
                <input
                  className='text-black w-[548px] p-1 rounded-xl text-center'
                  defaultValue='GhatakCommandoOne.GhatakForce'
                  placeholder='Enter your call sign...'
                  {...register('callSign', {
                    required: true,
                    min: 3,
                    max: 30,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d.]+$/,
                  })}
                // disabling from using post submit
                  disabled={isSubmitting}
                />
                <div className='text-red-500 w[548px] flex justify-center items-center'>
                  {errors.callSign && <span>Invalid Call Sign</span>}
                </div>
              </div>

              <div className='mb-5 flex flex-col justify-center items-center'>
                <input
                  className='text-black w-[548px] p-1 rounded-xl text-center'
                  defaultValue='Password3453@'
                  {...register('password', {
                    required: true,
                    min: 7,
                    max: 20,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                  })}
                  placeholder='Password'
                  type='password'
                  // disabling from using post submit
                  disabled={isSubmitting}
                />
                <div className='flex justify-center items-center'>
                  {errors.password && (
                    <span className='text-red-500 w[548px] text-wrap break-words'>
                      Password must contain atleast one uppercase, one
                      lowercase, one number and one special character
                    </span>
                  )}
                </div>
              </div>
              {/* disabling the submit button post once clicked, till either success or failure is returned */}
              {showSubmit && (
                <div className='flex justify-center'>
                  <input
                    className='bg-green-800 px-9 py-2 rounded-3xl cursor-pointer hover:bg-green-900'
                    type='submit'
                  />
                </div>
              )}
              {/* for showing loading indicator */}
              {showLoading && (
                <div className='flex items-center  w-15 h-15 '>
                  <div className='loader'></div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
