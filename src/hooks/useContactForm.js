import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function useContactForm(schema, source = 'contact_page') {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
  });

  const onSubmit = async (data) => {
    // Validate captcha token exists
    if (!captchaToken) {
      setSubmitStatus({
        type: 'error',
        message: 'Please complete the captcha verification.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5001/api/contact-forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, source, captchaToken }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        // Extract specific validation errors if available
        if (result.errors && Array.isArray(result.errors)) {
          const errorMessages = result.errors.map(err => `${err.field}: ${err.message}`).join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(result.message || 'Failed to submit form');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for contacting us! We will get back to you within 24 hours.',
      });
      reset();
      setCaptchaToken(null); // Reset captcha on success
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Sorry, something went wrong. Please try again or contact us directly at info@e-incarnation.com',
      });
      setCaptchaToken(null); // Reset captcha on error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken(null);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    submitStatus,
    reset,
    captchaToken,
    handleCaptchaChange,
    handleCaptchaExpired,
  };
}
