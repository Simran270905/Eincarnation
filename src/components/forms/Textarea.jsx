export default function Textarea({ 
  label,
  name,
  placeholder,
  error,
  register,
  required = false,
  rows = 5,
  className = "",
  variant = "default",
  ...props 
}) {
  const baseClasses = "w-full outline-none resize-none transition-all duration-300";
  
  const variants = {
    default: `bg-transparent border-b py-2 text-white placeholder:text-white/30 focus:border-white focus:border-b-2 ${
      error ? 'border-red-400' : 'border-white/40'
    }`,
    contact: `rounded-[25px] bg-white px-6 py-4 text-sm shadow-sm ${
      error ? 'ring-2 ring-red-400 focus:ring-red-500' : 'focus:ring-2 focus:ring-[#99c5df]'
    }`,
  };

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={name}
          className="block text-[10px] tracking-[0.2em] text-white/50 uppercase font-bold mb-2"
        >
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && (
        <p 
          id={`${name}-error`}
          className="mt-2 text-sm text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
