import { Articles } from "@/components/articles";
import Hero from "@/components/hero";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaInfo } from "react-icons/fa";

export default function Home() {
  return (
    <main>
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
      <Articles />
    </main>
  );
}
