import { FloatingButton } from '../components/floating-button';
import { GlowLink } from '../components/glow-box-link';
import { HeroBg } from '../components/hero-bg';
import { TextHover } from '../components/text-hover.component';
import { navButtons, personal, socialLinks } from '../data/portfolio';

export const InfoSection = () => {
	const [aboutNav, techNav] = navButtons;

	return (
		<div className='hero-section'>
			<HeroBg />
			{personal.showRepoStar && (
				<a
					href={personal.repoUrl}
					target='_blank'
					rel='noopener noreferrer'
					className='github-ribbon'
				>
					<div>{personal.repoStarLabel}</div>
					<span></span>
				</a>
			)}

			<FloatingButton
				label={aboutNav.label}
				className={aboutNav.className}
				href={aboutNav.href}
			/>

			<p>{personal.greeting}</p>
			<TextHover
				text={personal.name}
				className='name'
			/>
			<p>{personal.title}</p>

			<FloatingButton
				label={techNav.label}
				className={techNav.className}
				href={techNav.href}
			/>

			<div className='blur'></div>
			<div className='bottom-bar'>
				{socialLinks.map((link) => (
					<GlowLink
						key={link.label}
						href={link.href}
						color={link.glowColor}
						icon={<link.icon color={link.iconColor} />}
						aria-label={link.label.toLowerCase()}
					/>
				))}
			</div>
		</div>
	);
};
