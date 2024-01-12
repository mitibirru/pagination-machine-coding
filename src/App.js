import Loader from './components/Loader';
import { useFetchProducts } from './hooks/fetch-products';
import './App.css';
import { useRef, useState } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { FaArrowAltCircleRight } from 'react-icons/fa';

function App() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(12);
	const inputRef = useRef();
	const { data, error, loading } = useFetchProducts(`https://dummyjson.com/products?limit=${limit}&skip=${12 * (page - 1)}`);

	if (loading || !data) {
		return (
			<div className="loader-cont">
				<Loader />
			</div>
		);
	}

	const { products, total } = data;
	const totalPage = Math.ceil(total / 12);

	const selectPageHandler = selectedPage => {
		if (selectedPage >= 1 && selectedPage <= totalPage && selectedPage !== page) {
			setPage(selectedPage);
		}
	};

	return (
		<>
			<h1 className="input-div">Pagination Demo</h1>
			<div className="input-div">
				<input ref={inputRef} type="number" class="input" placeholder="Set your Limit here...."></input>
				<div
					class="button"
					onClick={() => {
						if (inputRef.current) {
							setLimit(inputRef.current.value);
						}
					}}>
					<div class="box">S</div>
					<div class="box">E</div>
					<div class="box">T</div>
				</div>
			</div>
			{products?.length > 0 && (
				<div className="products">
					{products?.map(prod => (
						<span className="products__single" key={prod.id}>
							<img src={prod.thumbnail} alt={prod.title} />
							<span>{prod.title.substring(0, 20)}...</span>
						</span>
					))}
				</div>
			)}

			{total > 0 && (
				<div className="pagination">
					<span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? '' : 'pagination__disable'}>
						<FaArrowAltCircleLeft size={20} />
					</span>
					{[...Array(totalPage)].map((_, i) => (
						<span onClick={() => selectPageHandler(i + 1)} key={i} className={page == i + 1 ? 'pagination__selected' : ''}>
							{i + 1}
						</span>
					))}
					<span onClick={() => selectPageHandler(page + 1)} className={page < totalPage ? '' : 'pagination__disable'}>
						<FaArrowAltCircleRight size={20} />
					</span>
				</div>
			)}
		</>
	);
}

export default App;
