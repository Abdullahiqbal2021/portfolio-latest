import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

type PropsType = {
	color: string;
	icon: React.ReactNode;
	href: string;
} & DetailedHTMLProps<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
>;
export const GlowLink = ({ color, icon, href, ...props }: PropsType) => {
	return (
		<a
			target='_blank'
			href={href}
			className='glow-box glow-link'
			style={{
				'--clr': color,
			}}
			{...props}
		>
			{icon}
		</a>
	);
};
