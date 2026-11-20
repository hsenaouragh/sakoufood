
import React from "react";
import SakouBg from "../assets/fish-animation.mp4";
import SakouLogo from "../assets/sakou-logo.png";
import Button from "./ui/button";

const Hero = () => {
  return (
    <section className="relative flex min-h-[550px] w-full flex-col items-center justify-center gap-8 overflow-hidden px-4 py-24">

      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source src={SakouBg} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Background overlay */}
      <div className="absolute inset-0 bg-[#061c2d]/30" />

      {/* Premium badge */}
      <div className="absolute left-1/2 top-6 z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/40 bg-[#0d2137]/80 px-6 py-2.5 text-white shadow-lg shadow-black/10 backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-[#4ae0d2] shadow-[0_0_8px_rgba(74,224,210,0.8)]" />

        <span className="text-sm font-semibold leading-normal tracking-[0.12em]">
          PREMIUM SEAFOOD
        </span>
      </div>

      {/* Main content card */}
      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center gap-8 rounded-3xl bg-white p-8 shadow-2xl sm:flex-row sm:gap-10">

        {/* Logo */}
        <div className="shrink-0">
          <img
            src={SakouLogo}
            alt="Sakou Logo"
            className="h-auto w-[150px] object-contain"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center gap-3 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-blue-950 md:text-4xl">
            FROM THE DEPTH OF THE SEAS
          </h1>

          <h2 className="text-xl font-bold text-[#173b5f]">
            STRAIGHT TO YOUR PLATES
          </h2>

          <p className="text-lg leading-relaxed text-gray-600">
            Discover our services and explore everything we have to offer.
          </p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 sm:gap-10">
        <Button variant="secondary">
          Contact Us
        </Button>

        <Button
          variant="primary"
          className="min-w-[180px]"
          onClick={() => console.log("Browse products")}
        >
          Browse Our Products
        </Button>
      </div>

    </section>
  );
};

export default Hero;
