"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDERS,
  SHADOWS,
  ANIMATIONS,
  GRADIENTS,
} from "../constants";

// Custom animated contact item component with enhanced effects
const ContactItem = ({
  icon,
  title,
  content,
  href,
  isLink = false,
  color = "gray",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    gray: "bg-gradient-to-br from-gray-700 to-gray-900",
    green: "bg-gradient-to-br from-green-500 to-green-700",
    blue: "bg-gradient-to-br from-blue-500 to-blue-700",
    purple: "bg-gradient-to-br from-purple-500 to-purple-700",
  };

  const glowEffects = {
    gray: "hover:shadow-[0_0_15px_rgba(75,85,99,0.5)]",
    green: "hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]",
    blue: "hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
    purple: "hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]",
  };

  const contentElement = isLink ? (
    <Link
      href={href}
      className={`text-gray-600 hover:text-gray-900 transition-all duration-300 ease-out transform hover:translate-x-1 text-sm sm:text-base relative group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
    </Link>
  ) : (
    <p className={`text-gray-600 text-sm sm:text-base`}>{content}</p>
  );

  return (
    <div
      className="flex items-start space-x-4 py-4 transition-all duration-300 hover:bg-gray-50 hover:px-3 rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative flex-shrink-0 w-12 h-12 ${BORDERS.radius.full} ${
          colorClasses[color]
        } flex items-center justify-center transition-all duration-500 ${
          glowEffects[color]
        } ${isHovered ? "scale-110 rotate-12" : ""} shadow-md`}
      >
        {icon}
        {isHovered && (
          <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-20"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3
          className={`text-lg font-semibold text-gray-800 mb-1 transition-all duration-300 ${
            isHovered ? "tracking-wider" : ""
          }`}
        >
          {title}
        </h3>
        {contentElement}
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const formRef = useRef();
  const recaptchaRef = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Load reCAPTCHA script
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Initialize reCAPTCHA after script loads
    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          if (recaptchaRef.current && !recaptchaRef.current.hasChildNodes()) {
            try {
              window.grecaptcha.render(recaptchaRef.current, {
                sitekey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
                callback: (token) => {
                  setRecaptchaToken(token);
                  if (errors.recaptcha) {
                    setErrors((prev) => ({ ...prev, recaptcha: "" }));
                  }
                },
                "expired-callback": () => {
                  setRecaptchaToken(null);
                },
              });
            } catch (error) {
              console.log("reCAPTCHA error:", error);
            }
          }
        });
      }
    };

    // Set up timer to clear status messages
    let timer;
    if (submitStatus) {
      timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 15000);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (script) document.body.removeChild(script);
    };
  }, [submitStatus, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    // reCAPTCHA validation
    if (!recaptchaToken) {
      newErrors.recaptcha = "Please verify you are not a robot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Add shake animation to form on error
      formRef.current.classList.add("animate-shake");
      setTimeout(() => {
        if (formRef.current) formRef.current.classList.remove("animate-shake");
      }, 500);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Using dynamic import for emailjs to reduce initial bundle size
      const emailjs = (await import("@emailjs/browser")).default;

      await emailjs.send(
        "service_hb9ad07",
        "template_v0yyzmi",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          "g-recaptcha-response": recaptchaToken,
        },
        "ZS-OUrEZCsqXuCb-p"
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      // Reset reCAPTCHA
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
      setRecaptchaToken(null);
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const TextElement = ({ children, className = "" }) => {
    return <div className={className}>{children}</div>;
  };

  const LineReveal = () => {
    return (
      <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto my-8 sm:my-12 w-32 sm:w-48" />
    );
  };

  const GridPattern = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_20%,transparent_100%)] opacity-10" />
      </div>
    );
  };

  const FloatingShapes = () => {
    return (
      <>
        <div className="absolute left-12 top-1/3 w-40 h-40 bg-white border border-gray-100 shadow-xs rounded-xl transform rotate-3 opacity-15 animate-float-slow" />
        <div className="absolute right-16 bottom-1/4 w-48 h-32 bg-white border border-gray-100 shadow-xs rounded-xl transform -rotate-2 opacity-15 animate-float-medium" />
        <div className="absolute left-1/4 bottom-1/3 w-24 h-24 bg-white border border-gray-100 shadow-xs rounded-lg transform rotate-2 opacity-10 animate-float-fast" />
      </>
    );
  };

  if (!mounted) return null;

  return (
    <section
      id="contact"
      className={`relative min-h-screen flex items-center justify-center bg-white overflow-hidden ${SPACING.section.py}`}
    >
      <GridPattern />
      <FloatingShapes />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div className={`text-center ${SPACING.section.mb}`}>
          <TextElement
            className={`inline-flex items-center ${BORDERS.radius.full} bg-gradient-to-r from-gray-100 to-blue-50 px-4 py-2 text-xs text-${COLORS.gray[600]} mb-14 tracking-wide border border-gray-200`}
          >
            <span className="relative flex h-1.5 w-1.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            GET IN TOUCH
          </TextElement>

          <TextElement className="animate-fade-in-up">
  <h1
    className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight"
  >
    Let&apos;s Start a{" "}
    <span className="text-gray-900">
      Conversation
    </span>
  </h1>
</TextElement>


          <TextElement className="animate-fade-in-up delay-100">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-normal">
              Contact Me
            </h2>
          </TextElement>

          <LineReveal />

          <TextElement className="animate-fade-in-up delay-200">
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
            >
              Have a project in mind or want to discuss potential collaboration?
              I&apos;m always open to new opportunities and interesting
              challenges.
            </p>
          </TextElement>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div className="space-y-2 md:space-y-4">
            <div className="animate-fade-in-right delay-300">
              <ContactItem
                icon={<EmailIcon sx={{ fontSize: 20, color: "white" }} />}
                title="Email"
                content="mibrahim.code@gmail.com"
                href="mailto:mibrahim.code@gmail.com"
                isLink={true}
                color="gray"
              />
            </div>

            <div className="animate-fade-in-right delay-400">
              <ContactItem
                icon={<WhatsAppIcon sx={{ fontSize: 20, color: "white" }} />}
                title="WhatsApp"
                content="+92 3058739445"
                href="https://wa.me/923058739445"
                isLink={true}
                color="green"
              />
            </div>

            <div className="animate-fade-in-right delay-500">
              <ContactItem
                icon={<PeopleIcon sx={{ fontSize: 20, color: "white" }} />}
                title="Availability"
                content="Currently accepting new projects"
                isLink={false}
                color="purple"
              />
            </div>

            <div className="animate-fade-in-right delay-600">
              <ContactItem
                icon={<AccessTimeIcon sx={{ fontSize: 20, color: "white" }} />}
                title="Response Time"
                content="I typically reply within 24 hours"
                isLink={false}
                color="blue"
              />
            </div>
          </div>

          <div id="contact-form" className="animate-fade-in-left delay-300">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className={`space-y-6 bg-white ${SPACING.element.p} ${BORDERS.radius.lg} border border-gray-100 ${SHADOWS.md} transition-all duration-500 hover:shadow-lg`}
            >
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium text-gray-700 mb-2`}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border ${
                    BORDERS.radius.md
                  } focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 ${
                    errors.name
                      ? "border-red-500 shake"
                      : "border-gray-200 focus:shadow-[0_0_10px_rgba(0,0,0,0.05)]"
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 animate-fade-in">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium text-gray-700 mb-2`}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border ${
                    BORDERS.radius.md
                  } focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 ${
                    errors.email
                      ? "border-red-500 shake"
                      : "border-gray-200 focus:shadow-[0_0_10px_rgba(0,0,0,0.05)]"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 animate-fade-in">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium text-gray-700 mb-2`}
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border ${
                    BORDERS.radius.md
                  } focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 ${
                    errors.message
                      ? "border-red-500 shake"
                      : "border-gray-200 focus:shadow-[0_0_10px_rgba(0,0,0,0.05)]"
                  }`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 animate-fade-in">
                    {errors.message}
                  </p>
                )}
              </div>

              <div>
                <div ref={recaptchaRef} className="g-recaptcha"></div>
                {errors.recaptcha && (
                  <p className="mt-1 text-sm text-red-600 animate-fade-in">
                    {errors.recaptcha}
                  </p>
                )}
              </div>

              {submitStatus === "success" && (
                <div
                  className={`p-4 bg-green-100 text-green-700 ${BORDERS.radius.md} text-sm flex justify-between items-center animate-fade-in`}
                >
                  <span>
                    Message sent successfully! I&apos;ll get back to you soon.
                  </span>
                  <button
                    onClick={() => setSubmitStatus(null)}
                    className="text-green-800 hover:text-green-900 ml-2 transition-colors"
                    aria-label="Close notification"
                  >
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>
              )}

              {submitStatus === "error" && (
                <div
                  className={`p-4 bg-red-100 text-red-700 ${BORDERS.radius.md} text-sm flex justify-between items-center animate-fade-in`}
                >
                  <span>
                    There was an error sending your message. Please try again or
                    contact me directly via email.
                  </span>
                  <button
                    onClick={() => setSubmitStatus(null)}
                    className="text-red-800 hover:text-red-900 ml-2 transition-colors"
                    aria-label="Close notification"
                  >
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white ${BORDERS.radius.md} font-medium text-sm tracking-wider shadow-md transition-all duration-300 hover:shadow-lg hover:from-gray-900 hover:to-gray-800 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <div className="flex items-center group cursor-pointer">
                    <span>Send Message</span>
                    <SendIcon
                      sx={{
                        fontSize: 16,
                        marginLeft: "8px",
                        transition: "transform 0.3s",
                      }}
                      className="group-hover:translate-x-1"
                    />
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(3deg);
          }
          50% {
            transform: translateY(-10px) rotate(3deg);
          }
        }
        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-15px) rotate(-2deg);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0) rotate(2deg);
          }
          50% {
            transform: translateY(-8px) rotate(2deg);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 7s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-fade-in-right {
          opacity: 0;
          animation: fade-in-right 0.6s ease-out forwards;
        }
        .animate-fade-in-left {
          opacity: 0;
          animation: fade-in-left 0.6s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;