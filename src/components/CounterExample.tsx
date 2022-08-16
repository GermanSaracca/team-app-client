import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';

import { decrement, increment, incrementByAmount } from '@/store/slices/counter';

const CounterExample = () => {
	// The `state` arg is correctly typed as `RootState` already
	const count = useAppSelector(state => state.counter.value);
	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log({ count });
	}, [count]);

	return (
		<div>
			<button onClick={() => dispatch(increment())}>Add one to counter store value</button>
			<button onClick={() => dispatch(decrement())}>Subtract one from counter store value</button>
			<button onClick={() => dispatch(incrementByAmount(5))}>Add 5 to counter store value</button>
		</div>
	);
};

export default CounterExample;
