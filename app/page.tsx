import Hero from "@/components/hero";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaInfo } from "react-icons/fa";

export default function Home() {
  return (
    <main
      className="relative bg-black flex justify-center items-center flex-col 
      overflow-hidden mx-auto sm:px-10"
    >
      <div className="max-w-7xl w-full">
        <FloatingNav
          navItems={[
            {
              name: "Home",
              link: "/",
              icon: <FaHome />,
            },
            {
              name: "About",
              link: "#about",
              icon: <FaInfo />,
            },
          ]}
        />
        <Hero />
      </div>
    </main>
  );
}
