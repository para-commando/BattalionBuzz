import React from 'react';
import SignUp from './SignUp';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { isUserNew } from '../redux/reducers/userAuth';
function LandingPage() {

  const isNewuser = useSelector(
    (state) => state.userAuthReducerExport.valueIsUserNew
  );
  const isSubmitting = useSelector(
    (state) => state.userAuthReducerExport.valueIsSubmitting
  );
  const dispatch = useDispatch();
  return (
    <>
      {isNewuser ? (
        <div>
          <SignUp />
          {/* below block of code disables user from switching back to login screen when user registration process is in progress */}
          {!isSubmitting && (
            <div
              onClick={() => dispatch(isUserNew(false))}
              className='text-white text-xl cursor-pointer text-center p-4 flex flex-col justify-center items-center'
            >
              <p className='ml-1'>Existing User?</p>{' '}
              <p className='underline text-lg'>Click here!</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Login />
          {/* below block of code disables user from switching back to login screen when user registration process is in progress */}
          {!isSubmitting && (
            <div
              onClick={() => dispatch(isUserNew(true))}
              className='text-white text-xl cursor-pointer text-center p-4 flex flex-col justify-center items-center'
            >
              <p className='ml-1'>New User?</p>{' '}
              <p className='underline text-lg'>Click here!</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default LandingPage;
