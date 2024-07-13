import React, { useState, useRef } from 'react';

import { useForm } from 'react-hook-form';
import { isUserNew, isUserValidated } from '../redux/reducers/userAuth';
import { useSelector, useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import { uploadData } from '../lib/upload.js';
import avatarIcon from '../assets/avatarIcon.png';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatar, setAvatar] = useState({
    file: null,
    url: '',
  });
  const [showImgUpload, setShowImgUpload] = useState(false);
  const first = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
     try {
      data.email = data.callSign + '.' + data.regiment + '@gmail.com';
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      data.id = userCredential.user.uid;
      data.radioSilencedUsers = [];

      if (data?.profilePic && data.profilePic.length) {
        const imgUrl = await uploadData(data.profilePic[0]);
        data.imgUrl = imgUrl;

       // deleting profile pic after use
        delete data.profilePic;
      } else {
        console.log('no profile pic uploaded');
        data.imgUrl = 'none';
      }

      setDoc(doc(db, 'users', data.id), {
        ...data,
      });
      setDoc(doc(db, 'chats', data.id), {
        chats: [],
      });
      
      dispatch(isUserValidated(true));
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
      alert('something went wrong. Please try again');
      throw error;
    }
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
            <div className='flex gap-2 pb-2'>
              <img
                className='w-16 h-16 mx-2 rounded-full cursor-pointer object-cover object-top'
                src={avatar.url || avatarIcon}
                alt=''
              />
              <span
                onClick={() => {
                  setAvatar({ file: null, url: '' });
                  // first.current.style.display = 'none';
                  setShowImgUpload(false);
                }}
                className='self-center p-2 bg-white text-black cursor-pointer rounded-xl '
              >
                use default image
              </span>
              <span
                onClick={() => {
                  // first.current.style.display = 'block';
                  setShowImgUpload(true);
                }}
                className='self-center p-2 bg-white text-black cursor-pointer rounded-xl '
              >
                upload image
              </span>
            </div>

            {showImgUpload && (
              <div
                ref={first}
                className='mb-5 flex-col justify-center items-center'
              >
                <input
                  type='file'
                  className='text-opacity-65 w-full p-2 rounded-xl text-center border border-gray-300 '
                  {...register('profilePic', {
                    required: false,
                    validate: {
                      validFileType: (value) => {
                        console.log('🚀 ~ SignUp ~ value:', value);
                        if (value.length) {
                          if (value[0].size > 1000000) {
                            return 'File size should be less than 10MB';
                          }
                          if (!value[0].type.includes('image/')) {
                            return 'Only image files are allowed';
                          }

                          return true;
                        }
                      },
                    },
                  })}
                  onChange={(e) => {
                    console.log('🚀 ~ SignUp ~ e:', e.target.files);
                    if (e.target.files.length) {
                      if (
                        e.target.files[0].size <= 1000000 &&
                        e.target.files[0].type.includes('image/')
                      ) {
                        setAvatar({
                          file: e.target.files[0],
                          url: URL.createObjectURL(e.target.files[0]),
                        });
                      }
                    }
                  }}
                />
                <div className='text-red-500 w[548px] flex justify-center items-center'>
                  {errors.profilePic && (
                    <span>{errors.profilePic.message}</span>
                  )}
                </div>
              </div>
            )}

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
