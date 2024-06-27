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
      <div className='item'>
        <h2>Welcome back,</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input className='text-black' defaultValue='' placeholder='Enter your call sign...' {...register('Call Sign',{ required: true, min: 3, max: 10, pattern: /^[A-Za-z]+$/i }) } />

          {/* include validation with required or other standard HTML validation rules */}
          <input className='text-black' {...register('exampleRequired', { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}

          <input type='submit' />
        </form>
      </div>
      <div className='separator'></div>
      <div className='item'></div>
    </div>
  );
}

export default Login;
