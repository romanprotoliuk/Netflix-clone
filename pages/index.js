import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Banner from '../components/banner/banner';
import NavBar from '../components/nav/navbar';

import SectionCards from '../components/card/section-cards';

import { getVideos, getPopularVideos, getWatchItAgainVideos } from '../lib/videos';
import { redirectUser } from '../utils/redirectUser';

export async function getServerSideProps(context) {
	const { userId, token } = await redirectUser(context);

	// const userId = null;

	if (!userId) {
		return {
			props: {},
			redirect: {
				destination: '/login',
				permanent: false
			}
		};
	}
	const watchItAgainVideos = await getWatchItAgainVideos(userId, token);

	const disneyVideos = await getVideos('disney trailer');
	const productivityVideos = await getVideos('Productivity');

	const travelVideos = await getVideos('indie music');

	const popularVideos = await getPopularVideos();
	return {
		props: {
			disneyVideos,
			travelVideos,
			productivityVideos,
			popularVideos,
			watchItAgainVideos
		}
	};
}

export default function Home({ disneyVideos, travelVideos, productivityVideos, popularVideos, watchItAgainVideos }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Netflix</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className={styles.main}>
				<NavBar />
				<Banner
					videoId="H8z6GDnEaM8"
					title="PEAKY BLINDERS"
					subTitle="A notorious gang in 1919 Birmingham, England, is led by the fierce Tommy Shelby, a crime boss set on moving up in the world no matter the cost."
					imgUrl="/static/peaky-blinders.jpg"
				/>

				<div className={styles.sectionWrapper}>
					<SectionCards title="Disney" videos={disneyVideos} size="large" />
					<SectionCards title="Watch it again" videos={watchItAgainVideos} size="small" />
					<SectionCards title="Travel" videos={travelVideos} size="small" />
					<SectionCards title="Productivity" videos={productivityVideos} size="medium" />
					<SectionCards title="Popular" videos={popularVideos} size="small" />
				</div>
			</div>
		</div>
	);
}
