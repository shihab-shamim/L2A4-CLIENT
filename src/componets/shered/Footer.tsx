"use client"

/* =====================
   Types
===================== */
type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

/* =====================
   Component
===================== */
const Footer: React.FC = () => {
  const sections: FooterSection[] = [
    {
      title: "Platform",
      links: [
        { label: "Home", href: "/" },
        { label: "Tutors", href: "/tutors" },
        { label: "Profile", href: "/profile" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "Login", href: "/login" },
        { label: "Registration", href: "/registration" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
      ],
    },
  ];

  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-900 font-bold">
                SB
              </div>
              <span className="text-lg font-semibold text-white">
                SkillBridge
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              SkillBridge connects students with skilled tutors to learn,
              grow, and succeed — anytime, anywhere.
            </p>
          </div>

          {/* Links */}
          {sections.map((section: FooterSection) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link: FooterLink) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-800" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {currentYear} SkillBridge. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="text-xs text-gray-400 hover:text-white transition"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-xs text-gray-400 hover:text-white transition"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-xs text-gray-400 hover:text-white transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
