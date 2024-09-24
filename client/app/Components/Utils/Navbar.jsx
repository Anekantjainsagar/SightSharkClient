"use client";

const Navbar = () => {
  return (
    <div className="text-white py-4 flex items-center justify-between w-full px-6">
      <div>
        <h3 className="bigFont font-semibold">Hello, Rishabh</h3>
        <p className="text-sm min-[1600px]:text-base text-[#85888E]">
          Here’s your overview of the agencies
        </p>
      </div>
      <div className="w-10 min-[1600px]:w-12 h-9 min-[1600px]:h-12 rounded-lg glass flex items-center justify-center border border-gray-200/5">
        <svg
          className="w-5 min-[1600px]:w-6 h-5 min-[1600px]:h-6"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0008 21.5H10.0008M18.0008 8.5C18.0008 6.9087 17.3686 5.38258 16.2434 4.25736C15.1182 3.13214 13.5921 2.5 12.0008 2.5C10.4095 2.5 8.88333 3.13214 7.75811 4.25736C6.63289 5.38258 6.00075 6.9087 6.00075 8.5C6.00075 11.5902 5.22122 13.706 4.35042 15.1054C3.61588 16.2859 3.24861 16.8761 3.26208 17.0408C3.27699 17.2231 3.31561 17.2926 3.46253 17.4016C3.59521 17.5 4.19334 17.5 5.38961 17.5H18.6119C19.8082 17.5 20.4063 17.5 20.539 17.4016C20.6859 17.2926 20.7245 17.2231 20.7394 17.0408C20.7529 16.8761 20.3856 16.2859 19.6511 15.1054C18.7803 13.706 18.0008 11.5902 18.0008 8.5Z"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
