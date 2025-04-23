import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

// Password visibility toggle component
const PasswordField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder = "",
  required = false,
  error = null,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          placeholder={placeholder}
          autoComplete={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`block w-full px-4 py-3 pr-12 rounded-lg border ${
            error
              ? "border-red-300 bg-red-50"
              : "border-gray-300 focus:border-blue-500"
          } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200`}
        />
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            // Eye-slash icon (hidden password)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
                clipRule="evenodd"
              />
              <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
            </svg>
          ) : (
            // Eye icon (visible password)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        {error && (
          <div className="absolute right-10 top-3 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

// Separate InputField component to maintain its own state and focus
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder = "",
  required = false,
  disabled = false,
  error = null,
}) => {
  const inputRef = useRef(null);

  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`block w-full px-4 py-3 rounded-lg border ${
            error
              ? "border-red-300 bg-red-50"
              : "border-gray-300 focus:border-blue-500"
          } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200`}
        />
        {error && (
          <div className="absolute right-3 top-3 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    aadharNumber: "",
    address: {
      line1: "",
      line2: "",
      landmark: "",
      city: "",
      district: "",
      state: "",
      zipCode: "",
    },
    emergencyContact: "",
    emergencyPhone: "",
    medical: {
      dob: "",
      gender: "",
      height: "",
      weight: "",
      bloodGroup: "",
      allergies: "",
      medicalConditions: "",
      medications: "",
      surgeries: "",
      pregnancyStatus: "",
    },
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [validatingZip, setValidatingZip] = useState(false);
  const [step, setStep] = useState(3);
  const navigate = useNavigate();

  // Password strength indicators
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // Update password strength indicators when password changes
  useEffect(() => {
    if (formData.password) {
      setPasswordChecks({
        length: formData.password.length >= 6,
        uppercase: /[A-Z]/.test(formData.password),
        lowercase: /[a-z]/.test(formData.password),
        number: /[0-9]/.test(formData.password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
          formData.password
        ),
      });
    } else {
      setPasswordChecks({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
      });
    }
  }, [formData.password]);

  const formatAadhaar = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "").substring(0, 12);

    // Format as XXXX-XXXX-XXXX
    return digits.replace(/(\d{4})(\d{4})(\d{0,4})/, (_, p1, p2, p3) =>
      [p1, p2, p3].filter(Boolean).join("-")
    );
  };

  const validatePincodeExistence = async (pincode) => {
    setValidatingZip(true);
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();

      if (data[0].Status === "Success" && data[0].PostOffice?.length) {
        const postOffice = data[0].PostOffice[0];
        setFormData((prevData) => ({
          ...prevData,
          address: {
            ...prevData.address,
            district: postOffice.District,
            state: postOffice.State,
          },
        }));
        return "";
      } else {
        return "Invalid PIN code";
      }
    } catch (error) {
      return "Could not validate PIN code. Please try again.";
    } finally {
      setValidatingZip(false);
    }
  };

  // Validate field individually
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return !value ? "Name is required" : "";
      case "email":
        if (!value) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
        return "";
      case "govId":
        if (!value) return "Government ID is required";
        if (!/^[0-9]{12}$/.test(value))
          return "Government ID must be 12 digits";
        return "";
      case "password":
        if (!value) return "Password is required";

        // Enhanced password validation
        if (!passwordChecks.length)
          return "Password must be at least 6 characters";
        if (!passwordChecks.uppercase)
          return "Password must include an uppercase letter";
        if (!passwordChecks.lowercase)
          return "Password must include a lowercase letter";
        if (!passwordChecks.number) return "Password must include a number";
        if (!passwordChecks.special)
          return "Password must include a special character";

        return "";
      case "confirmPassword":
        return value !== formData.password ? "Passwords do not match" : "";
      case "phone":
        if (!value) return "Phone number is required";

        // Remove optional "+91" or "91" from the beginning
        const cleanedPhone = value.replace(/^(\+91|91)?/, "");

        // Check if cleaned number is 10 digits and starts with 6-9
        if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
          return "Enter a valid 10-digit Indian mobile number";
        }

        return "";
      case "aadharNumber":
        if (!value) return "Aadhaar number is required";

        const rawAadhaar = value.replace(/-/g, "");
        if (!/^\d{12}$/.test(rawAadhaar)) return "Aadhaar must be 12 digits";
        return "";
      case "address.line1":
        return !value ? "Line 1 is required" : "";
      case "address.city":
        return !value ? "City is required" : "";
      case "address.district":
        return !value ? "District is required" : "";
      case "address.state":
        return !value ? "State is required" : "";
      case "address.zipCode":
        if (!value) return "ZIP Code is required";
        if (!/^\d{6}$/.test(value)) return "ZIP Code must be exactly 6 digits";
        return "";
      // medical info validation
      case "medical.dob":
        return !value ? "Date of birth is required" : "";
      case "medical.gender":
        return !value ? "Gender is required" : "";
      case "medical.height":
        if (!value) return "Height is required";
        if (isNaN(value) || value <= 0) return "Please enter a valid height";
        return "";
      case "medical.weight":
        if (!value) return "Weight is required";
        if (isNaN(value) || value <= 0) return "Please enter a valid weight";
        return "";
      case "medical.bloodGroup":
        return !value ? "Blood group is required" : "";
      case "medical.allergies":
        return !value ? "Please list your allergies or enter 'None'" : "";
      case "medical.medicalConditions":
        return !value
          ? "Please list your medical conditions or enter 'None'"
          : "";
      case "medical.medications":
        return !value ? "Please list your medications or enter 'None'" : "";
      case "medical.surgeries":
        return !value ? "Please list your surgeries or enter 'None'" : "";
      case "medical.pregnancyStatus":
        if (formData.medical?.gender === "female" && !value) {
          return "Pregnancy status is required for female users";
        }
        return "";
      default:
        return "";
    }
  };

  // Validate all fields for step 1
  const validateStep1 = () => {
    const newErrors = {};
    const fields = [
      "name",
      "email",
      "aadharNumber",
      "password",
      "confirmPassword",
      "phone",
    ];

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;

      // Mark fields as touched
      setTouched((prev) => ({ ...prev, [field]: true }));
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Validate all fields for step 2
  const validateStep2 = () => {
    const newErrors = {};
    const fields = [
      "address.line1",
      "address.city",
      "address.district",
      "address.state",
      "address.zipCode",
    ];

    fields.forEach((field) => {
      const subField = field.split(".")[1];
      const error = validateField(field, formData["address"][subField]);
      if (error) newErrors[field] = error;

      // Mark fields as touched
      setTouched((prev) => ({ ...prev, [field]: true }));
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Validate all fields for step 3
  const validateStep3 = () => {
    const newErrors = {};
    const fields = [
      "medical.dob",
      "medical.gender",
      "medical.height",
      "medical.weight",
      "medical.bloodGroup",
      "medical.allergies",
      "medical.medicalConditions",
      "medical.medications",
      "medical.surgeries",
    ];

    // Add pregnancy status validation only for females
    if (formData.medical?.gender === "female") {
      fields.push("medical.pregnancyStatus");
    }

    fields.forEach((field) => {
      const value = field.startsWith("medical.")
        ? formData.medical[field.split(".")[1]]
        : formData[field];

      const error = validateField(field, value);
      if (error) newErrors[field] = error;

      // Mark fields as touched
      setTouched((prev) => ({ ...prev, [field]: true }));
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Handle field change with validation
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Format Aadhaar number as XXXX-XXXX-XXXX
      let formattedValue = value;
      if (name === "aadharNumber") {
        formattedValue = formatAadhaar(value);
      }

      if (name.startsWith("medical.")) {
        const field = name.split(".")[1];
        setFormData((prevData) => ({
          ...prevData,
          medical: { ...prevData.medical, [field]: formattedValue },
        }));
      } else if (name.startsWith("address.")) {
        const field = name.split(".")[1];
        setFormData((prevData) => ({
          ...prevData,
          address: { ...prevData.address, [field]: formattedValue },
        }));
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));
      }

      // Only validate if the field has been touched
      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));

        // Special handling for confirmPassword when password changes
        if (name === "password") {
          const confirmError =
            value !== formData.confirmPassword && formData.confirmPassword
              ? "Passwords do not match"
              : "";
          setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
        }
      }
    },
    [formData, touched, passwordChecks]
  );

  // Handle field blur (update touched state and validate)
  const handleBlur = useCallback(
    async (e) => {
      const { name, value } = e.target;

      setTouched((prev) => ({ ...prev, [name]: true }));

      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));

      if (name === "address.zipCode" && !error) {
        const zipError = await validatePincodeExistence(value);
        setErrors((prev) => ({ ...prev, "address.zipCode": zipError }));
      }
    },
    [formData, passwordChecks]
  );

  const formTopRef = useRef(null);
  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      formTopRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      formTopRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    formTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 3 && validateStep3()) {
      setLoading(true);

      try {
        const userData = {
          ...formData,
          role: "user",
        };

        await authService.register(userData);
        navigate("/otp-verification", { state: { email: formData.email } });
      } catch (err) {
        setErrors({
          submit:
            err.response?.data?.message ||
            "Registration failed. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // Function to render password requirement indicator
  const PasswordRequirement = ({ fulfilled, text }) => (
    <li className="flex items-center">
      {fulfilled ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01"
          />
          <circle cx="12" cy="12" r="9" />
        </svg>
      )}
      <span className={fulfilled ? "text-green-600" : "text-gray-600"}>
        {text}
      </span>
    </li>
  );

  return (
    <div
      ref={formTopRef}
      className="bg-white shadow-lg rounded-xl overflow-hidden"
    >
      {/* Form Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          Create Your Account
        </h2>
        <p className="text-blue-100 text-sm md:text-base">
          Join our disaster relief network
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="px-6 pt-6 mt-4">
        <div className="flex items-center justify-between mb-8">
          <div className="w-full">
            <div className="relative">
              {/* Progress bar background */}
              <div className="absolute top-1 w-full h-2 bg-gray-200 rounded-full"></div>

              {/* Active progress */}
              <div
                className="absolute top-1 h-2 transition-all duration-500 ease-in-out bg-blue-600 rounded-full"
                style={{
                  width:
                    step === 1
                      ? "33.3%"
                      : step === 2
                      ? "66.6%"
                      : step === 3
                      ? "100%"
                      : "0%",
                }}
              ></div>

              {/* Step indicators */}
              <div className="absolute top-0 left-0 transform -translate-y-1/2 flex justify-between w-full">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 text-sm font-medium ${
                      step >= 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    1
                  </div>
                  <span className="mt-3 text-xs md:text-sm font-medium text-gray-700">
                    Personal Info
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 text-sm font-medium ${
                      step >= 2
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    2
                  </div>
                  <span className="mt-3 text-xs md:text-sm font-medium text-gray-700">
                    Address & Emergency
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 text-sm font-medium ${
                      step >= 3
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    3
                  </div>
                  <span className="mt-3 text-xs md:text-sm font-medium text-gray-700">
                    Medical Info
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error message */}
      {errors.submit && (
        <div className="mx-6 mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 font-medium">
                {errors.submit}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className="px-6 pb-8">
        <form onSubmit={handleSubmit} className="w-full">
          {step === 1 && (
            <div className="animated fadeIn">
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Personal Information
                </h3>
                <p className="text-gray-600 text-sm">
                  Please provide your basic details to get started
                </p>
              </div>

              <div className="space-y-1">
                <InputField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  required
                  error={touched.name ? errors.name : null}
                />

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="your.email@example.com"
                  required
                  error={touched.email ? errors.email : null}
                />

                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="(123) 456-7890"
                  required
                  error={touched.phone ? errors.phone : null}
                />

                <InputField
                  label="Aaddhaar Number"
                  name="aadharNumber"
                  type="text"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="XXXX-XXXX-XXXX"
                  required
                  error={touched.aadharNumber ? errors.aadharNumber : null}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <PasswordField
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Create a secure password"
                    required
                    error={touched.password ? errors.password : null}
                  />

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">
                      Password Requirements:
                    </h4>
                    <ul className="text-xs space-y-2">
                      <PasswordRequirement
                        fulfilled={passwordChecks.length}
                        text="At least 6 characters long"
                      />
                      <PasswordRequirement
                        fulfilled={passwordChecks.uppercase}
                        text="At least one uppercase letter (A-Z)"
                      />
                      <PasswordRequirement
                        fulfilled={passwordChecks.lowercase}
                        text="At least one lowercase letter (a-z)"
                      />
                      <PasswordRequirement
                        fulfilled={passwordChecks.number}
                        text="At least one number (0-9)"
                      />
                      <PasswordRequirement
                        fulfilled={passwordChecks.special}
                        text="At least one special character (!@#$%^&*)"
                      />
                    </ul>
                  </div>

                  <PasswordField
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm your password"
                    required
                    error={
                      touched.confirmPassword ? errors.confirmPassword : null
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors duration-200 flex items-center"
                >
                  Next Step
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animated fadeIn">
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Address & Emergency Contact
                </h3>
                <p className="text-gray-600 text-sm">
                  This information helps us during emergency response
                </p>
              </div>

              <InputField
                label="Line 1"
                name="address.line1"
                value={formData.address.line1}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your address line1"
                required
                error={
                  touched["address.line1"] ? errors["address.line1"] : null
                }
              />
              <InputField
                label="Line 2"
                name="address.line2"
                value={formData.address.line2}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your address line2"
                error={
                  touched["address.line2"] ? errors["address.line2"] : null
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <InputField
                  label="Landmark"
                  name="address.landmark"
                  value={formData.address.landmark}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter a landmark"
                  error={
                    touched["address.landmark"]
                      ? errors["address.landmark"]
                      : null
                  }
                />

                <InputField
                  label="City"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your city"
                  required
                  error={
                    touched["address.city"] ? errors["address.city"] : null
                  }
                />

                <div className="relative">
                  <InputField
                    label="ZIP/Postal Code"
                    name="address.zipCode"
                    value={formData.address.pinCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="ZIP code"
                    required
                    error={
                      touched["address.zipCode"]
                        ? errors["address.zipCode"]
                        : null
                    }
                  />
                  {validatingZip && (
                    <div className="absolute right-3 top-9">
                      <svg
                        className="animate-spin h-5 w-5 text-blue-600"
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
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>

                <InputField
                  label="District"
                  name="address.district"
                  value={formData.address.district}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your District"
                  required
                  disabled
                  error={
                    touched["address.district"]
                      ? errors["address.district"]
                      : null
                  }
                />

                <InputField
                  label="State/Province"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your state"
                  required
                  disabled
                  error={
                    touched["address.state"] ? errors["address.state"] : null
                  }
                />
              </div>

              <div className="mt-8 mb-4">
                <h4 className="text-md font-medium text-gray-800 mb-3">
                  Emergency Contact Information
                </h4>
                <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        This contact will be notified in case of emergencies.
                        They should not be at the same location as you.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Emergency Contact Name"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Contact person's name"
                    error={
                      touched.emergencyContact ? errors.emergencyContact : null
                    }
                  />

                  <InputField
                    label="Emergency Contact Phone"
                    name="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Contact person's phone"
                    error={
                      touched.emergencyPhone ? errors.emergencyPhone : null
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="mb-3 sm:mb-0 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors duration-200 flex items-center"
                >
                  Next Step
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animated fadeIn">
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Medical Information
                </h3>
                <p className="text-gray-600 text-sm">
                  This information helps emergency responders provide
                  appropriate care during disasters
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Your medical information is kept strictly confidential and
                      will only be accessed by authorized medical personnel
                      during emergencies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Basic Medical Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <InputField
                    label="Date of Birth"
                    name="medical.dob"
                    type="date"
                    value={formData.medical?.dob || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={
                      touched["medical.dob"] ? errors["medical.dob"] : null
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <select
                      name="medical.gender"
                      value={formData.medical?.gender || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full px-4 py-3 rounded-lg border ${
                        touched["medical.gender"] && errors["medical.gender"]
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {touched["medical.gender"] && errors["medical.gender"] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors["medical.gender"]}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <InputField
                    label="Height (cm)"
                    name="medical.height"
                    type="number"
                    value={formData.medical?.height || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Height in centimeters"
                    required
                    error={
                      touched["medical.height"]
                        ? errors["medical.height"]
                        : null
                    }
                  />
                </div>

                <div>
                  <InputField
                    label="Weight (kg)"
                    name="medical.weight"
                    type="number"
                    value={formData.medical?.weight || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Weight in kilograms"
                    required
                    error={
                      touched["medical.weight"]
                        ? errors["medical.weight"]
                        : null
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Group <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <select
                      name="medical.bloodGroup"
                      value={formData.medical?.bloodGroup || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full px-4 py-3 rounded-lg border ${
                        touched["medical.bloodGroup"] &&
                        errors["medical.bloodGroup"]
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200`}
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                    {touched["medical.bloodGroup"] &&
                      errors["medical.bloodGroup"] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors["medical.bloodGroup"]}
                        </p>
                      )}
                  </div>
                </div>
              </div>

              {/* Pregnancy Status (only for females) */}
              {formData.medical?.gender === "female" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pregnancy Status <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <select
                      name="medical.pregnancyStatus"
                      value={formData.medical?.pregnancyStatus || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full px-4 py-3 rounded-lg border ${
                        touched["medical.pregnancyStatus"] &&
                        errors["medical.pregnancyStatus"]
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200`}
                    >
                      <option value="">Select Status</option>
                      <option value="pregnant">Pregnant</option>
                      <option value="not pregnant">Not Pregnant</option>
                    </select>
                    {touched["medical.pregnancyStatus"] &&
                      errors["medical.pregnancyStatus"] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors["medical.pregnancyStatus"]}
                        </p>
                      )}
                  </div>
                </div>
              )}

              {/* Allergies & Conditions */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Allergies <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="medical.allergies"
                  placeholder="List any allergies you have (medications, food, etc.) or write 'None' if you have no allergies"
                  value={formData.medical?.allergies || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="3"
                  className={`block w-full px-4 py-3 rounded-lg border ${
                    touched["medical.allergies"] && errors["medical.allergies"]
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200`}
                ></textarea>
                {touched["medical.allergies"] &&
                  errors["medical.allergies"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors["medical.allergies"]}
                    </p>
                  )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medical Conditions <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="medical.medicalConditions"
                  placeholder="List any chronic medical conditions (e.g., diabetes, hypertension, asthma) or write 'None' if you have no conditions"
                  value={formData.medical?.medicalConditions || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="3"
                  className={`block w-full px-4 py-3 rounded-lg border ${
                    touched["medical.medicalConditions"] &&
                    errors["medical.medicalConditions"]
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200`}
                ></textarea>
                {touched["medical.medicalConditions"] &&
                  errors["medical.medicalConditions"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors["medical.medicalConditions"]}
                    </p>
                  )}
              </div>

              {/* Medications & Surgeries */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Medications <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="medical.medications"
                  placeholder="List any medications you take regularly or write 'None' if you don't take any medications"
                  value={formData.medical?.medications || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="3"
                  className={`block w-full px-4 py-3 rounded-lg border ${
                    touched["medical.medications"] &&
                    errors["medical.medications"]
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200`}
                ></textarea>
                {touched["medical.medications"] &&
                  errors["medical.medications"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors["medical.medications"]}
                    </p>
                  )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Previous Surgeries <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="medical.surgeries"
                  placeholder="List any major surgeries you've had with dates or write 'None' if you haven't had any surgeries"
                  value={formData.medical?.surgeries || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="3"
                  className={`block w-full px-4 py-3 rounded-lg border ${
                    touched["medical.surgeries"] && errors["medical.surgeries"]
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200`}
                ></textarea>
                {touched["medical.surgeries"] &&
                  errors["medical.surgeries"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors["medical.surgeries"]}
                    </p>
                  )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="mb-3 sm:mb-0 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                      Registering...
                    </span>
                  ) : (
                    <>
                      Complete Registration
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Form Footer */}
      <div className="border-t border-gray-200 py-4 px-6 bg-gray-50 text-center">
        <p className="text-xs text-gray-600">
          By registering, you agree to our
          <a href="#" className="text-blue-600 hover:underline mx-1">
            Terms of Service
          </a>
          and
          <a href="#" className="text-blue-600 hover:underline mx-1">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
