import { useRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";
import { useTheme } from "next-themes";

export { NavLink };

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

function NavLink({ href, exact = false, children, ...props }) {
  const { theme } = useTheme();
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += " hover:bg-violet-600 bg-violet-700 text-[#eee]";
  } else {
    props.className += `${
      theme === "dark" ? " text-[#eee]" : " text-[#121212] "
    } + hover:bg-violet-600 hover:text-[#eee]`;
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
