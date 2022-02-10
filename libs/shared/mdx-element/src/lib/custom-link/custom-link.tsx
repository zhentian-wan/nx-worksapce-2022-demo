import Link from 'next/link';
import './custom-link.module.css';

export interface CustomLinkProps {
  as: string;
  href: string;
}

export function CustomLink({ as, href, ...otherProps }: CustomLinkProps) {
  return (
    <Link as={as} href={href}>
      <a className="text-gray-50 m-6" {...otherProps} />
    </Link>
  );
}

export default CustomLink;
