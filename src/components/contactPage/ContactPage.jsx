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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await emailjs.send(
        "service_y1aobfl",
        "template_upjj7k6",
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
      seccess={success}
    />
  );
}

export default ContactPage;
