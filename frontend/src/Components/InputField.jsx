function InputField({
  id,
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  disabled = false,
  required = false,
  minLength,
  autoComplete,
}) {
  const inputId = id || name;
  const hasError = Boolean(error);

  return (
    <div className="field-group">
      {label ? (
        <label className="field-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        name={name}
        type={type}
        className={`field-input${hasError ? ' has-error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
      />

      {hasError ? <p className="field-error">{error}</p> : null}
    </div>
  );
}

export default InputField;
