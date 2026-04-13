import {
  ArrowRight,
  Briefcase,
  Code2,
  Megaphone,
  Palette,
  BarChart3,
  Monitor,
  Wallet,
  Users,
} from "lucide-react";

interface Category {
  name: string;
  jobs: number;
  icon: React.ReactNode;
  highlighted?: boolean;
}

const categories: Category[] = [
  { name: "Design", jobs: 235, icon: <Palette className="w-6 h-6" /> },
  { name: "Sales", jobs: 756, icon: <BarChart3 className="w-6 h-6" /> },
  { name: "Marketing", jobs: 140, icon: <Megaphone className="w-6 h-6" /> },
  { name: "Finance", jobs: 325, icon: <Wallet className="w-6 h-6" /> },
  { name: "Technology", jobs: 436, icon: <Monitor className="w-6 h-6" /> },
  { name: "Engineering", jobs: 542, icon: <Code2 className="w-6 h-6" /> },
  { name: "Business", jobs: 211, icon: <Briefcase className="w-6 h-6" /> },
  { name: "Human Resource", jobs: 346, icon: <Users className="w-6 h-6" /> },
];

export default function CategorySection() {
  return (
    <section className="py-16">
      <div className="mx-[122px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold text-[#25324B]">
            Explore by <span className="text-[#286ef0]">category</span>
          </h2>
          <a
            href=""
            className="flex items-center gap-2 text-sm font-medium text-[#286ef0] hover:text-[#2566de]"
          >
            Show all jobs
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-4 gap-6">
          {categories.map((category) => (
            <a
              key={category.name}
              href=""
              className={`group p-6 border transition-all ${
                category.highlighted
                  ? "bg-[#4F46E5] border-[#4F46E5] text-white"
                  : "bg-white border-gray-100 hover:border-[#286ef0] hover:shadow-md text-[#25324B]"
              }`}
            >
              <div
                className={`mb-4 ${
                  category.highlighted ? "text-white" : "text-[#4F46E5]"
                }`}
              >
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <div
                className={`flex items-center gap-2 text-sm ${
                  category.highlighted
                    ? "text-white/80"
                    : "text-gray-500 group-hover:text-[#286ef0]"
                }`}
              >
                <span>{category.jobs} jobs available</span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    category.highlighted ? "text-white" : ""
                  }`}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
