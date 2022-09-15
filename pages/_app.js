import { useEffect, useState } from 'react';
import '../styles/globals.css';
import magic from '../lib/magic-client';
import { useRouter } from 'next/router';
import Loading from '../components/loading/loading';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [ isLoading, setIsLoading ] = useState(false);

	useEffect(
		() => {
			const handleComplete = () => {
				setIsLoading(false);
			};

			router.events.on('routeChangeComplete', handleComplete);
			router.events.on('routeChangeError', handleComplete);

			return () => {
				router.events.off('routeChangeComplete', handleComplete);
				router.events.off('routeChangeError', handleComplete);
			};
		},
		[ router ]
	);

	useEffect(() => {
		async function checkIsLoggedIn() {
			const isLoggedIn = await magic.user.isLoggedIn();
			if (isLoggedIn) {
				router.push('/');
			} else {
				router.push('/login');
			}
		}
		checkIsLoggedIn();
	}, []);

	return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
