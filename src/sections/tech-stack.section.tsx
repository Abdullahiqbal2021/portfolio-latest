import { GlowBox } from '../components/glow-box';
import { SectionTitle } from '../components/section-title.component';
import { techStack } from '../data/portfolio';

export const TechStack = () => {
	return (
		<section
			className='tech-stack'
			id='tech-stack'
		>
			<div className='tech-grid'>
				{techStack.groups.map((group, idx) => (
					<div key={idx}>
						<p>{group.heading}</p>
						<div className='tech-row'>
							{group.items.map((item) => (
								<GlowBox
									key={item.label}
									icon={<item.icon color={item.iconColor} />}
									color={item.glowColor}
									title={item.label}
								/>
							))}
						</div>
					</div>
				))}
			</div>
			<div>
				<SectionTitle
					title={techStack.section.title}
					subTitle={techStack.section.subtitle}
				/>
			</div>
		</section>
	);
};
