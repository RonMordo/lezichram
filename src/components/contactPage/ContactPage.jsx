import { useState } from "react";
import emailjs from "@emailjs/browser";
import ContactForm from "../contactForm/ContactForm";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyDigits = value.replace(/\D/g, "");

      let formattedPhone = onlyDigits;
      if (onlyDigits.length > 3 && onlyDigits.length <= 6) {
        formattedPhone = `${onlyDigits.slice(0, 3)}-${onlyDigits.slice(3)}`;
      } else if (onlyDigits.length > 6) {
        formattedPhone = `${onlyDigits.slice(0, 3)}-${onlyDigits.slice(
          3,
          6
        )}-${onlyDigits.slice(6, 10)}`;
      }

      setFormData((prev) => ({ ...prev, phone: formattedPhone }));

      const phonePattern = /^05\d-\d{3}-\d{4}$/;
      if (!phonePattern.test(formattedPhone)) {
        setErrors((prev) => ({
          ...prev,
          phone: "מספר טלפון אינו בפורמט הנכון.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    } else if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "כתובת דואר אלקטרוני אינה תקינה.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await emailjs.send(
        "service_9aua3aj",
        "template_t5k3zln",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        "lcKCeDjabcrmW16hM"
      );
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
      errors={errors}
      seccess={success}
    />
  );
}

export default ContactPage;
