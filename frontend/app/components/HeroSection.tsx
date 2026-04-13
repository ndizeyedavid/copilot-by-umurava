import { Search, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  const popularTags = ["UI Designer", "UX Researcher", "Android", "Admin"];

  return (
    <section className="relative mt-[50px] bg-[#f8f8fd] overflow-hidden">
      <div className="relative mx-[122px] py-16 flex items-center justify-between">
        {/* Left content */}
        <div className="max-w-2xl w-full">
          <h1 className="text-[70px] font-bold text-[#25324B] leading-tight">
            Discover
            <br />
            more than
            <br />
            <span className="text-[#286ef0]">1000+ Jobs</span>
          </h1>

          {/* Blue underline decoration */}
          <img
            src={"/images/illustrations/underline.svg"}
            alt="Underline"
            className=""
          />
          <p className="text-gray-500 text-base mb-8 leading-relaxed pt-5">
            Great platform for the job seeker that searching for
            <br />
            new career heights and passionate about startups.
          </p>

          {/* Search bar */}
          <div className="flex items-center bg-white shadow-sm border border-gray-100 overflow-hidden max-w-lg w-full">
            <div className="flex items-center gap-3 px-4 py-3 flex-1 border-r border-gray-100">
              <Search className="w-5 h-10 text-gray-400" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="text-sm text-gray-500 placeholder-gray-400 outline-none w-full"
              />
            </div>

            <button className="mx-2 bg-[#286ef0] hover:bg-[#2566de] text-white px-6 py-4">
              Search my job
            </button>
          </div>

          {/* Popular tags */}
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-gray-400">Popular :</span>
            {popularTags.map((tag, index) => (
              <span key={tag} className="text-gray-500">
                {tag}
                {index < popularTags.length - 1 && (
                  <span className="text-gray-400">, </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Right - Hero image placeholder */}
        <div className="relative w-[500px] h-[450px] flex items-center justify-center">
          <Image
            src="/images/illustrations/pattern.svg"
            className="absolute top-0 right-[100px] scale-170 z-0"
            alt=""
            width={860}
            height={794}
          />

          <Image
            src="/images/illustrations/arrow.svg"
            className="absolute top-[-10px] left-[-200px] scale-170 z-0 -rotate-30"
            alt=""
            width={200}
            height={209}
          />

          <div className="w-[401px] h-[557px] relative z-10 overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/vDfTbBMQCcI"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="w-[283px] h-[731px] bg-[#f8f8fd] absolute p-4 bottom-[-460px] right-[-100px] z-20 rotate-50" />
        </div>
      </div>
    </section>
  );
}
