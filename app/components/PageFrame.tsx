import { PageMotion } from "./PageMotion";
import { SiteHeader } from "./SiteHeader";
import { SoundToggle } from "./SoundToggle";

export function PageFrame({
  children,
  theme = "light",
  className = "",
  mobileMenuColor,
}: {
  children: React.ReactNode;
  theme?: "dark" | "light";
  className?: string;
  mobileMenuColor?: string;
}) {
  return (
    <main className={`interior-page interior-page-${theme} ${className}`}>
      <div className="ambient ambient-interior" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <SiteHeader mobileMenuColor={mobileMenuColor} />
      <SoundToggle className="interior-sound-toggle" />
      <PageMotion>{children}</PageMotion>
      <footer className="site-footer">
        <p>Yihan Jiang</p>
        <a href="mailto:ian.yihan.jiang@gmail.com">ian.yihan.jiang@gmail.com</a>
        <p>London, UK</p>
      </footer>
    </main>
  );
}
