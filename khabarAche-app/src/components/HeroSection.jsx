import heroImage from "../assets/heroImage.png";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-3xl lg:text-5xl text-center tracking-wide">
        A website listing every restaurant in Bangladesh and
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}
          allowing food donations to cut down on food waste
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl hover:text-white transition">
        To create a centralized database of restaurants in Bangladesh, to
        promote food donation initiatives and connect donors with those in need
        and To enhance the visibility of local eateries and support the food
        industry.
      </p>
      <div className="flex justify-center my-10">
        <a
          href="#"
          className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md hover:text-black transition"
        >
          Sign up
        </a>
        <a
          href="#"
          className="py-3 px-4 mx-3 rounded-md border hover:text-orange-500 transition"
        >
          Documentation
        </a>
      </div>
      <div className="flex mt-10 justify-center">
        <img
          src={heroImage}
          alt="Hero Section"
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-800 mx-2 my-4 hover:shadow-lg hover:shadow-orange-500 hover:border-orange-500 transition"
        />
      </div>
    </div>
  );
};

export default HeroSection;
