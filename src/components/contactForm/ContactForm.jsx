import { useEffect } from "react";

function ContactForm({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  error,
  success,
}) {
  return (
    <form onSubmit={onSubmit} className="contactForm" dir="rtl">
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
          כתובת דואר אלקטרוני:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </label>
      </div>
      <div className="formGroup">
        <label dir="rtl">
          טלפון נייד:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={onChange}
          />
        </label>
      </div>
      <div className="formGroup">
        <label dir="rtl">
          הודעה:
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={onChange}
            required
          />
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
