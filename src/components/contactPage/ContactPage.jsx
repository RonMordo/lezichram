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
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const phonePattern = /^05\d-\d{3}-\d{4}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = "נא להזין שם.";
    }

    if (!emailPattern.test(formData.email)) {
      newErrors.email = "כתובת דואר אלקטרוני אינה תקינה.";
    }

    if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "מספר טלפון אינו בפורמט הנכון.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "נא להזין הודעה.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const isValid = validateForm();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

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
        "WqabIc6Hp1Od-BnmP"
      );
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("שליחת ההודעה נכשלה.");
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
