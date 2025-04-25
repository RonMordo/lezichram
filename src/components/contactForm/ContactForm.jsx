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
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="שם מלא:"
          required
        />
      </div>
      <div className="formGroup">
        <input
          type="text"
          name="email"
          placeholder=":מייל"
          id="email"
          value={formData.email}
          onChange={onChange}
          required
        />
        {errors.email && (
          <p className="fieldError" dir="rtl">
            {errors.email}
          </p>
        )}
      </div>
      <div className="formGroup">
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder=":טלפון-נייד"
          inputMode="numeric"
          value={formData.phone}
          onChange={onChange}
        />
        {errors.phone && (
          <p className="fieldError" dir="rtl">
            {errors.phone}
          </p>
        )}
      </div>
      <div className="formGroup">
        <textarea
          name="message"
          value={formData.message}
          onChange={onChange}
          placeholder="הודעה:"
          required
          rows={6}
          cols={10}
          minLength={5}
        ></textarea>
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
