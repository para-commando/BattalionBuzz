import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SignUp from './SignUp';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { isUserNew, isUserValidated } from '../redux/reducers/userAuth';
function LandingPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
 
  const isNewuser = useSelector((state) => state.userAuthReducerExport.valueIsUserNew);
  const dispatch = useDispatch();
  console.log(watch('example')); // watch input value by passing the name of it
  return (
    <>
      {isNewuser ? (
        <div>

            <SignUp />
            <div
            onClick={() => dispatch(isUserNew(false))}
            className='text-white text-xl cursor-pointer text-center p-4 flex flex-col justify-center items-center'
          >
            <p className='ml-1'>Existing User?</p> <p className='underline text-lg'>Click here!</p>
          </div>
        </div>
        
      ) : (
        <div>
          <Login />
          <div
            onClick={() =>dispatch(isUserNew(true))}
            className='text-white text-xl cursor-pointer text-center p-4 flex flex-col justify-center items-center'
          >
            <p className='ml-1'>New User?</p> <p className='underline text-lg'>Click here!</p>
          </div>
        </div>
      )}
    </>
  );
}

export default LandingPage;
