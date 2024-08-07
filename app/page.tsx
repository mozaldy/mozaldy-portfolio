import { Articles } from "@/components/Articles";
import Hero from "@/components/Hero";
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
          {
            name: "Articles",
            link: "#articles",
            icon: <FaInfo />,
          },
        ]}
      />
      <Hero />
      <Articles />
    </main>
  );
}
