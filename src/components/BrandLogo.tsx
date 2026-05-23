import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  eager?: boolean;
};

export default function BrandLogo({
  href,
  className = "",
  imageClassName = "",
  eager = false,
}: BrandLogoProps) {
  const logo = (
    <Image
      src="/lyncs-logo.png"
      alt="Lyncs logo"
      width={852}
      height={320}
      preload={eager}
      loading={eager ? "eager" : "lazy"}
      className={`h-10 w-auto object-contain ${imageClassName}`.trim()}
    />
  );

  if (!href) {
    return <div className={className}>{logo}</div>;
  }

  return (
    <Link href={href} className={className} aria-label="Lyncs home">
      {logo}
    </Link>
  );
}
