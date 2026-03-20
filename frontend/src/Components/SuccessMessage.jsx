function SuccessMessage({ message }) {
  if (!message) return null;
  return (
    <div className="success-banner" role="status" aria-live="polite">
      {message}
    </div>
  );
}

export default SuccessMessage;
