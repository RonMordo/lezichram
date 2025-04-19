function ContactForm({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  error,
  errors,
  success,
}) {
  return (
    <form onSubmit={onSubmit} className="contactForm" dir="rtl">
      <h2>דברו איתנו</h2>
      <div className="formGroup">
        <label dir="rtl">
          שם:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
        </label>
      </div>
      <div className="formGroup">
        <label dir="rtl">
          דואר אלקטרוני:
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </label>
        {errors.email && (
          <p className="fieldError" dir="rtl">
            {errors.email}
          </p>
        )}
      </div>
      <div className="formGroup">
        <label dir="rtl">
          טלפון נייד:
          <input
            type="tel"
            name="phone"
            id="phone"
            inputMode="numeric"
            pattern="[0-9]"
            value={formData.phone}
            onChange={onChange}
          />
        </label>
        {errors.phone && (
          <p className="fieldError" dir="rtl">
            {errors.phone}
          </p>
        )}
      </div>
      <div className="formGroup">
        <label dir="rtl">
          הודעה:
          <textarea
            name="message"
            value={formData.message}
            onChange={onChange}
            required
            rows={6}
            cols={10}
            minLength={5}
          ></textarea>
        </label>
      </div>
      <button className="successButton" disabled={isSubmitting}>
        {isSubmitting ? "שולח" : "שלח"}
      </button>
      {error && (
        <p className="errorMessage" dir="rtl">
          {error}
        </p>
      )}
      {success && (
        <p className="successMessage" dir="rtl">
          ההודעה נשלחה בהצלחה!
        </p>
      )}
    </form>
  );
}

export default ContactForm;
