import Image from "next/image";
import { FaLinkedin, FaXTwitter, FaYoutube, FaInstagram, FaTelegram, FaDiscord, FaEnvelope } from "react-icons/fa6";
import Link from "next/link";

const features = [
  {
    title: "HLD",
    desc: "High Level Design resources and guides.",
    icon: "/next.svg",
  },
  {
    title: "LLD",
    desc: "Low Level Design concepts and patterns.",
    icon: "/vercel.svg",
  },
  {
    title: "INTERVIEW PRACTICE",
    desc: "Practice problems and mock interviews.",
    icon: "/next.svg",
  },
  {
    title: "ARTICLES",
    desc: "Curated articles and notes for SDE prep.",
    icon: "/vercel.svg",
  },
];

const socials = [
  { icon: FaLinkedin, url: "#" },
  { icon: FaXTwitter, url: "#" },
  { icon: FaYoutube, url: "#" },
  { icon: FaInstagram, url: "#" },
  { icon: FaTelegram, url: "#" }
];

// Add instructor data array
const instructors = [
  {
    name: "Priyanshu Sharma",
    profession: "Student @ NITH",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    socials: [socials[0], socials[2]], // LinkedIn, YouTube
  },
  {
    name: "Pranav Sharma",
    profession: "Student @ CGC CHD",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    socials: [socials[0], socials[2]], // LinkedIn, YouTube
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#112240] to-[#0a0a23] text-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-8">
        <h2 className="text-2xl sm:text-3xl font-medium mb-2">Learn</h2>
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-2">
          <span className="text-yellow-400">HLD</span>
        </h1>
        <h3 className="text-xl sm:text-2xl font-medium mb-2">By Intuition</h3>
        <p className="text-lg sm:text-xl text-gray-300 mb-4">Ultimate Guide &amp; Notes to ace SDE Interviews</p>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-8 max-w-4xl mx-auto w-full mb-16">
        {features.map((f, i) => (
          i === 0 ? (
            <Link
              key={f.title}
              href="/hld"
              className="relative bg-[#000000] rounded-2xl p-10 flex flex-col items-start shadow-xl hover:scale-[1.03] transition-transform min-h-[220px] text-left outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer hover:bg-[#232b4a]"
              style={{ textDecoration: 'none' }}
            >
              <Image src={f.icon} alt={f.title} width={64} height={64} className="mb-6" />
              <h4 className="text-3xl font-extrabold mb-2">{f.title}</h4>
              <p className="text-gray-300 text-lg">{f.desc}</p>
            </Link>
          ) : i === 1 ? (
            <Link
              key={f.title}
              href="/lld"
              className="relative bg-[#000000] rounded-2xl p-10 flex flex-col items-start shadow-xl hover:scale-[1.03] transition-transform min-h-[220px] text-left outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer hover:bg-[#232b4a]"
              style={{ textDecoration: 'none' }}
            >
              <Image src={f.icon} alt={f.title} width={64} height={64} className="mb-6" />
              <h4 className="text-3xl font-extrabold mb-2">{f.title}</h4>
              <p className="text-gray-300 text-lg">{f.desc}</p>
            </Link>
          ) : i === 2 ? (
            <Link
              key={f.title}
              href="/interview"
              className="relative bg-[#000000] rounded-2xl p-10 flex flex-col items-start shadow-xl hover:scale-[1.03] transition-transform min-h-[220px] text-left outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer hover:bg-[#232b4a]"
              style={{ textDecoration: 'none' }}
            >
              <Image src={f.icon} alt={f.title} width={64} height={64} className="mb-6" />
              <h4 className="text-3xl font-extrabold mb-2">{f.title}</h4>
              <p className="text-gray-300 text-lg">{f.desc}</p>
            </Link>
          ) : i === 3 ? (
            <Link
              key={f.title}
              href="/articles"
              className="relative bg-[#000000] rounded-2xl p-10 flex flex-col items-start shadow-xl hover:scale-[1.03] transition-transform min-h-[220px] text-left outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer hover:bg-[#232b4a]"
              style={{ textDecoration: 'none' }}
            >
              <Image src={f.icon} alt={f.title} width={64} height={64} className="mb-6" />
              <h4 className="text-3xl font-extrabold mb-2">{f.title}</h4>
              <p className="text-gray-300 text-lg">{f.desc}</p>
            </Link>
          ) : (
            <div key={f.title} className="relative bg-[#000000] rounded-2xl p-10 flex flex-col items-start shadow-xl min-h-[220px] text-left">
              <Image src={f.icon} alt={f.title} width={64} height={64} className="mb-6" />
              <h4 className="text-3xl font-extrabold mb-2">{f.title}</h4>
              <p className="text-gray-300 text-lg">{f.desc}</p>
            </div>
          )
        ))}
      </section>

      {/* About Instructor */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-8 bg-transparent mx-8 max-w-4xl w-full self-center mb-16">
        {instructors.map((inst, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-between bg-[#000000] rounded-2xl p-6 w-full md:w-1/2 max-w-xs aspect-square shadow-2xl border-2 border-blue-700"
            style={{ minWidth: '280px', minHeight: '280px' }}
          >
            <div className="flex flex-col items-center w-full">
              <Image
                src={inst.image}
                alt={inst.name}
                width={110}
                height={110}
                className="rounded-xl object-cover border-4 border-blue-400 mb-3"
              />
              <h3 className="text-xl font-extrabold mb-1 text-white text-center">{inst.name}</h3>
              <p className="text-base text-blue-300 mb-2 text-center">{inst.profession}</p>
            </div>
            <div className="flex gap-3 mt-auto pt-2">
              {inst.socials.map(({ icon: Icon, url }, idx) => (
                <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-400 transition-colors">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-[#10182a] py-8 px-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 text-gray-300">
        
          <div>
            <h4 className="font-bold text-lg mb-2 text-white">Quick Access</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">HLD</a></li>
              <li><a href="#" className="hover:underline">LLD</a></li>
              <li><a href="#" className="hover:underline">INTERVIEW</a></li>
              <li><a href="#" className="hover:underline">ARTICLES</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2 text-white">SYSTEMDESIGN_LETTER</h4>
            <p className="mb-2">The best place to learn  System Design.</p>
            <div className="flex gap-3 mt-2">
              {socials.map(({ icon: Icon, url }, idx) => (
                <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-400 transition-colors">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8">© 2025 SYSTEMDESIGN_LETTER. All rights reserved.</div>
      </footer>
    </div>
  );
}
