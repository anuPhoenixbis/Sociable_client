import React from 'react';

const FormInput = ({
  label,
  name,
  type,
  size,
  handleBlur,
  handleChange,
  value,
  error,
  touched
}) => {
  return (
    <div className="form-control">
      <input
        type={type}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value ?? ""}
        placeholder={label}
        aria-describedby={name}
        aria-invalid={Boolean(error && touched)}
        className={`bg-transparent input input-bordered border-b border-black ${size}`}
      />
      {touched && error && (
        <p id={name} className="text-error mt-2 text-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
