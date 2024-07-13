import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import {
  isUserNew,
  isUserValidated,
  loginUser,
} from '../redux/reducers/userAuth';
import { useSelector, useDispatch } from 'react-redux';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../lib/firebase.js';
import { doc, setDoc } from 'firebase/firestore';
 function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const [showSubmit, setShowSubmit] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = (data) => {
    try {
      setIsSubmitting(true);
      setShowSubmit(false)
      dispatch(loginUser({ data: data }));
      console.log(data);
      dispatch(isUserValidated(true));
    } catch (err) {
      console.log(err);
    }
    finally{
      setShowSubmit(true)
      setShowLoading(false);
      setIsSubmitting(false);
    }
   
  };

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
                  defaultValue='GhatakCommandoOne'
                  placeholder='Enter your call sign...'
                  {...register('callSign', {
                    required: true,
                    min: 3,
                    max: 30,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]+$/,
                  })}
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
              {showSubmit && (
              <div
                className='flex justify-center'
                onClick={(e) => {
                  setShowLoading(true);
                }}
              >
                <input
                  className='bg-green-800 px-9 py-2 rounded-3xl cursor-pointer hover:bg-green-900'
                  type='submit'
                />
              </div>
            )}
            {showLoading && (
              <div className='flex items-center justify-cente w-15 h-15 '>
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
