import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-[122px] py-5">
      <div className="flex items-center gap-8">
        <Image
          src="/images/logo/logo.svg"
          alt="Copilot By Umurava Logo"
          width={110}
          height={34}
        />

        <nav className="flex items-center gap-6 text-sm text-gray-700">
          <a href="" className="hover:text-gray-900">
            Find Jobs
          </a>
          <a href="" className="hover:text-gray-900">
            About
          </a>
          <a href="" className="hover:text-gray-900">
            Contact
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <a
          href=""
          className="text-sm font-bold text-[#286ef0] hover:text-[#4338CA]"
        >
          Login
        </a>
        <a
          href=""
          className="px-5 py-2.5 text-sm font-medium text-white bg-[#286ef0]  hover:bg-[#2566de]"
        >
          Sign Up
        </a>
      </div>
    </header>
  );
}
