import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner/banner';
import NavBar from '../components/nav/navbar';
import Card from '../components/card/card';
import SectionCards from '../components/card/section-cards';
import { getPopularVideos, getVideos } from '../lib/videos';

export async function getServerSideProps() {
	const disneyVideos = await getVideos('disney trailer');
	const productivityVideos = await getVideos('Productivity');
	const travelVideos = await getVideos('travel');
	// const popularVideos = await getVideos('disney trailer');

	const popularVideos = await getPopularVideos();

	return { props: { disneyVideos, travelVideos, productivityVideos, popularVideos } };
}

export default function Home({ disneyVideos, travelVideos, productivityVideos, popularVideos }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Netflix</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className={styles.main}>
				<NavBar username="Roman Protoliuk" />
				<Banner title="Clifford the red dog" subTitle="a very cool dog" imgUrl="/static/clifford.webp" />

				<div className={styles.sectionWrapper}>
					<SectionCards title="Disney" videos={disneyVideos} size={'large'} />
					<SectionCards title="Travel" videos={travelVideos} size={'small'} />
					<SectionCards title="Productivity" videos={productivityVideos} size={'medium'} />
					<SectionCards title="Popular" videos={popularVideos} size={'small'} />
				</div>
			</div>
		</div>
	);
}
