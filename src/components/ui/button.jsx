
import React from "react";

const Button = ({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  const styles = {
    base: "inline-flex items-center justify-center min-h-[50px] px-8 py-3.5 rounded-full font-cairo-bold text-base font-bold leading-normal text-white whitespace-nowrap no-underline cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#4ae0d2] focus-visible:ring-offset-[3px]",

    primary:
      "border border-transparent bg-[#0d2137] hover:bg-[#173b5f] hover:shadow-[0_10px_24px_rgba(0,0,0,0.2)]",

    secondary:
      "border-[1.5px] border-white bg-transparent hover:bg-white/15",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.base} ${styles[variant] || styles.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
