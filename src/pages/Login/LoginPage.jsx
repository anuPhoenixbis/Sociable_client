import React from 'react'
import { Form, Link } from 'react-router-dom'
import FormInput from '../../Components/FormInput'
import SubmitBtn from '../../Components/SubmitBtn'


// const LoginPage = ({
//         values,
//         errors,
//         touched,
//         handleBlur,
//         handleChange,
//         formSubmitHandler,
//         resetForm
// }) => {
//   return (
//     <div className='w-full text-center mt-4'>
//       <span className="text-base-content font-bold text-4xl lg:text-5xl font-roboto">Soci<span className='text-info font-bold text-4xl lg:text-5xl font-roboto'>@</span>ble</span>
//       <section className='h-screen grid place-items-center'>
//         <Form method='post' className='card w-96 h-96 p-8 bg-base-300 shadow-lg flex-col gap-y-4'onClick={formSubmitHandler}>
//           <h4 className="text-center text-3xl font-bold mt-6">Login</h4>
//           <FormInput type='email' label='Email' name='email'  handleBlur={handleBlur} handleChange={handleChange} value={values?.email} error={errors?.email} touched={touched?.email} />
//           <FormInput type='password' label='Password' name='password'  handleBlur={handleBlur} handleChange={handleChange} value={values?.password} error={errors?.password} touched={touched?.password} />
//           <div className="mt-4">
//             <SubmitBtn text='Login' />
//           </div>
//             <p className="text-center">
//               Create an account <Link to='/register' className='ml-2 link link-hover link-primary capitalize' onClick={resetForm()}>register</Link>
//             </p>
//         </Form>
//     </section>
//     </div>
//   )
// }

// export default LoginPage

const LoginPage = ({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit, // This will now receive the correct function from AuthForm
        resetForm
}) => {
  return (
    <div className='w-full text-center mt-4'>
      <span className="text-base-content font-bold text-4xl lg:text-5xl font-roboto">Soci<span className='text-info font-bold text-4xl lg:text-5xl font-roboto'>@</span>ble</span>
      {/* ... header ... */}
      <section className='h-screen grid place-items-center'>
        {/* use native form onSubmit */}
        <form
          onSubmit={handleSubmit}
          className='card w-96 h-96 p-8 bg-base-300 shadow-lg flex-col gap-y-4'
        >
          <h4 className="text-center text-3xl font-bold mt-6">Login</h4>

          <FormInput
            type='email'
            label='Email'
            name='email'
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values?.email}
            error={errors?.email}
            touched={touched?.email}
          />

          <FormInput
            type='password'
            label='Password'
            name='password'
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values?.password}
            error={errors?.password}
            touched={touched?.password}
          />

          <div className="mt-4">
            {/* ensure SubmitBtn renders a button with type="submit" */}
            <SubmitBtn text='Login' />
          </div>

          <p className="text-center">
            Create an account{' '}
            <Link
              to='/register'
              className='ml-2 link link-hover link-primary capitalize'
              onClick={() => resetForm()}
            >
              register
            </Link>
          </p>
        </form>
      </section>
    </div>
  )
}
export default LoginPage