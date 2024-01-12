import { useEffect, useState } from 'react';

export const useFetchProducts = url => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			fetch(url)
				.then(res => res.json())
				.then(data => setData(data))
				.catch(e => setError(e))
				.finally(() => setLoading(false));
		}, 1000);
	}, [url]);

	return { data, loading, error };
};
