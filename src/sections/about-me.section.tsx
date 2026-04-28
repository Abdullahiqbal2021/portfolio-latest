import { SectionTitle } from '../components/section-title.component';
import { about } from '../data/portfolio';

export const AboutMe = () => {
	return (
		<section
			className='about-me container'
			id='about-me'
		>
			<div>
				<SectionTitle
					title={about.section.title}
					subTitle={about.section.subtitle}
				/>
			</div>
			<div>
				<div className='intro'>
					{about.intro.map((paragraph, idx) => (
						<p
							key={idx}
							style={idx === 0 ? { marginTop: '20px' } : undefined}
						>
							{paragraph}
						</p>
					))}
				</div>
				<div>
					{about.timeline.map(({ heading, items }, idx) => (
						<div
							className='timeline'
							key={idx}
						>
							<h1>{heading}</h1>
							{items.map(({ role, org, period, bullets }, itemIdx) => (
								<div
									className='timeline-list'
									key={itemIdx}
								>
									<div className='timeline-item'>
										<p className='designation'>{role}</p>
										<p className='place'>
											{org} | {period}
										</p>
										{bullets.length > 0 && (
											<div className='timeline-description'>
												<ul>
													{bullets.map((bullet, bIdx) => (
														<li key={bIdx}>{bullet}</li>
													))}
												</ul>
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
