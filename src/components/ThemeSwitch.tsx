import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="absolute bottom-0 m-6 ml-10"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <MdDarkMode className="rounded-full bg-gray-200 p-2 text-4xl" />
      ) : (
        <MdLightMode className="rounded-full bg-[#262626] p-2 text-4xl" />
      )}
    </button>
  );
};

export default ThemeSwitch;
