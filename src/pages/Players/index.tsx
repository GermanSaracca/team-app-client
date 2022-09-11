import PlayerBadge from '@/components/PlayerBadge';
import { useAppSelector } from '@/hooks/reduxHooks';
import style from './index.module.scss';

const Players = () => {
	const { players } = useAppSelector(state => state.players);

	return (
		<div className={style.players_layout}>
			<div className={style.players_grid}>
				{players.map(p => (
					<PlayerBadge
						fullName={p.fullName}
						position={p.position}
						avatar={p.avatar}
						id={p.id}
						key={p.id}
						avatarDraggable={false}
					/>
				))}
			</div>
		</div>
	);
};
export default Players;
