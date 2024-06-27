import React from 'react';
import { useForm } from 'react-hook-form';

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch('example')); // watch input value by passing the name of it
  return (
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
                defaultValue=''
                placeholder='Enter your call sign...'
                {...register('callSign', {
                  required: true,
                  min: 3,
                  max: 10,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
                })}
              />
              <div className='text-red-500 w[548px] flex justify-center items-center'>
                {errors.callSign && <span>Invalid Call Sign</span>}
              </div>
            </div>

            <div className='mb-5 flex flex-col justify-center items-center'>
              <input
                className='text-black w-[548px] p-1 rounded-xl text-center'
                {...register('password', {
                  required: true,
                  min: 7,
                  max: 20,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                })}
                placeholder='Password'
                type='password'
              />
              <div className='flex justify-center items-center'>
                {errors.password && (
                  <span className='text-red-500 w[548px] text-wrap break-words'>
                    Password must contain atleast one uppercase, one lowercase,
                    one number and one special character
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

export default Login;
