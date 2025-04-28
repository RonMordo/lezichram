import handsEmojie from "../../assets/hands.webp";

function ContactForm({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  error,
  errors,
  success,
}) {
  const showForm = !isSubmitting && !success;

  return (
    <form id="contact" onSubmit={onSubmit} className="contactForm" dir="rtl">
      {showForm && <h2>דברו איתנו</h2>}

      {success ? (
        <div className="successContainer">
          <img
            src={handsEmojie}
            alt="תודה"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "contain",
              marginBottom: "1rem",
            }}
          />
          <h3 dir="rtl">תודה! קיבלנו את ההודעה שלך.</h3>
          <h3
            dir="rtl"
            id="socialLink"
            style={{
              color: "white",
              marginTop: "0.5rem",
              fontWeight: "500",
            }}
          >
            בנתיים כנס/י לעקוב אחרינו בעמוד{" "}
            <a
              href="https://www.instagram.com/lezichram_?igsh=a3drdjhremNuMGo="
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background:
                  "linear-gradient(45deg, #f09433, #e6683c,rgb(213, 134, 23), #cc2366, #bc1888)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              lezichram@
            </a>
          </h3>
        </div>
      ) : isSubmitting ? (
        <div className="loadingCircle"></div>
      ) : (
        <>
          <div className="formGroup">
            <span>*</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="שם מלא"
              required
            />
          </div>

          <div className="formGroup">
            <span>*</span>
            <input
              type="text"
              name="email"
              placeholder="מייל"
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
              placeholder="טלפון נייד"
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
            <span>*</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={onChange}
              placeholder="הודעה"
              required
              rows={6}
              cols={10}
              minLength={5}
            ></textarea>
          </div>

          <button className="successButton" disabled={isSubmitting}>
            שלח
          </button>

          {error && (
            <p className="errorMessage" dir="rtl">
              {error}
            </p>
          )}
        </>
      )}
    </form>
  );
}

export default ContactForm;
