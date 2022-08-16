import { forwardRef } from 'react';
import { NavLink as BaseNavLink, NavLinkProps } from 'react-router-dom';

interface Props extends NavLinkProps {
	activeClassName?: string;
}

export type Ref = HTMLAnchorElement;

const NavLink = forwardRef<Ref, Props>(({ activeClassName = 'active', ...props }: Props, ref) => {
	return (
		<BaseNavLink
			ref={ref}
			{...props}
			className={({ isActive }) =>
				[props.className ? props.className : 'nav-link', isActive ? activeClassName : null]
					.filter(Boolean)
					.join(' ')
			}></BaseNavLink>
	);
});

NavLink.displayName = 'NavLink';

export default NavLink;
