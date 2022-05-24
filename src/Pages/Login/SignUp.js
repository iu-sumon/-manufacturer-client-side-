import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import bg from '../../Assets/others/bicycle.jpg'
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';
import google from '../../Assets/svg/google-icon-logo-svgrepo-com.svg'
import faceBook from '../../Assets/svg/facebook-svgrepo-com.svg'
import { toast } from 'react-toastify';
const SignUp = () => {

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [signInWithFacebook, fUser, fLoading, fError] = useSignInWithFacebook(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate();

    let signInError;

    if (loading || gLoading || fLoading || updating) {
        return <Loading></Loading>
    }

    if (error || gError || fError || updateError) {
        signInError = <small className='text-red-500'>{error?.message || gError?.message || updateError?.message}</small>
    }

    if (user || gUser || fUser) {
        navigate('/');
    }

    const onSubmit = async data => {

        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        toast('Signup Successfully')
    }
    return (
        <div  className='bg-cover h-screen' style={{ backgroundImage: `url(${bg})` }}>
            <div className='flex h-screen justify-center items-center'>
                <div className="card w-96 bg-base-100 shadow-xl border-2 border-primary-focus">
                    <div className="card-body">
                        <h2 className="text-center text-primary text-2xl font-bold">Sign Up</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="input input-bordered w-full max-w-xs shadow rounded-full "
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Name is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="input input-bordered w-full max-w-xs shadow rounded-full"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is Required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid Email'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered w-full max-w-xs shadow rounded-full"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password is Required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters or longer'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                </label>
                            </div>

                            {signInError}
                            <input className='btn btn-primary rounded-full w-full max-w-xs text-white' type="submit" value="Sign Up" />
                        </form>
                        <p><small>Already have an account? <Link className='text-secondary' to="/login">Please login</Link></small></p>
                        <div className="divider">OR</div>
                        <div className='flex justify-evenly items-center bg-primary p-2 rounded-full shadow-lg'>
                            <div>
                                <img onClick={() => {
                                    signInWithGoogle()
                                    toast('Signup Successfully')
                                    
                                    }} className='w-7 h-7 cursor-pointer' src={google} alt="" />
                            </div>
                            <div>
                                <img onClick={() => {
                                    signInWithFacebook()
                                    toast('Signup Successfully')
                                    }} className='w-8 h-8 cursor-pointer' src={faceBook} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default SignUp;