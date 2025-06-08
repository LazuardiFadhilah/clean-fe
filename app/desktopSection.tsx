export default function DesktopHeroSection() {
  return (
    <div className="relative w-full md:h-[300px] lg:h-[816px] flex flex-col items-center justify-center">
      <img
        src="/illu1.png"
        className="w-full h-auto object-cover -mt-[100px] absolute inset-0 z-[-1]"
        alt="Hero Image"
      />
      <div className="flex items-center justify-center">
        <h1 className="text-4xl lg:text-5xl xl:text-6xl text-center font-bold">
          Your One Stop Cleaning <br /> Center For All Needs
        </h1>
      </div>
    </div>
  );
}
