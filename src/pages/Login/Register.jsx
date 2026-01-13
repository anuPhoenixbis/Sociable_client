import React from 'react'
import { Form, Link } from 'react-router-dom'
import FormInput from '../../Components/FormInput'
import SubmitBtn from '../../Components/SubmitBtn'
import Dropzone from 'react-dropzone';

const Register = ({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm
}) => {
  return (
    <div className='h-screen w-full text-center mt-4'>
        <span className="text-base-content font-bold text-4xl lg:text-5xl font-roboto">Soci<span className='text-info font-bold text-4xl lg:text-5xl font-roboto'>@</span>ble</span>
        <section className='mt-16 grid place-items-center'>
        <form
          method='POST'
          onSubmit={handleSubmit}
          className='card w-96 p-8 bg-base-300 shadow-lg flex flex-col gap-y-8'
        >
          <h4 className="text-center text-3xl font-bold">Register</h4>

          <div className="grid grid-cols-2">
            <FormInput
              type='text'
              label='FirstName'
              name='firstName'
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values?.firstName}
              error={errors?.firstName}
              touched={touched?.firstName}
            />
            <FormInput
              type='text'
              label='LastName'
              name='lastName'
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values?.lastName}
              error={errors?.lastName}
              touched={touched?.lastName}
            />
          </div>

          <FormInput
            type='text'
            label='Occupation'
            name='occupation'
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values?.occupation}
            error={errors?.occupation}
            touched={touched?.occupation}
          />

          <FormInput
            type='text'
            label='Location'
            name='location'
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values?.location}
            error={errors?.location}
            touched={touched?.location}
          />

          {/* picture profile */}
          <div className="form-control hover:outline-solid hover:outline-info transition-all border-transparent cursor-pointer outline-dashed outline-info rounded-lg p-4">
            <Dropzone
              accept={{ 'image/*': [] }}
              multiple={false}
              onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => {
                return (
                  <div {...getRootProps()} className='outline-white'>
                    <input {...getInputProps()} />
                    <p className="text-sm text-gray-500">
                      Drag & drop or click to upload profile image
                    </p>
                  </div>
                );
              }}
            </Dropzone>
          </div>

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
            <SubmitBtn text='Register' />
          </div>

          <p className="text-center">
            Already have an account?
            <Link
              to='/'
              className='ml-2 link link-hover link-primary capitalize'
              onClick={() => resetForm()}
            >
              Login
            </Link>
          </p>
        </form>
      </section>
    </div>
  )
}

export default Register