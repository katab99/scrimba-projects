import clsx from "clsx";
import { getFarewellText } from "../utils";

export default function Status(props) {
	function renderGameStatus() {
		if (!props.isGameOver && props.wrongGuess) {
			return (
				<p className="status-description">
					{getFarewellText(props.lostLanguage.name)}
				</p>
			);
		}
		if (props.isGameWon) {
			return (
				<>
					<h2 className="status-title">You win!</h2>
					<p className="status-description">Well done! 🎉</p>
				</>
			);
		}
		if (props.isGameLost) {
			return (
				<>
					<h2 className="status-title">Game over!</h2>
					<p className="status-description">
						You lose! Better start learning Assembly 😭
					</p>
				</>
			);
		}
		return null;
	}

	return (
		<section
			aria-live="polite"
			role="status"
			className={clsx("status-box", {
				won: props.isGameWon,
				lost: props.isGameLost,
				"wrong-guess": !props.isGameOver && props.wrongGuess,
			})}
		>
			{renderGameStatus()}
		</section>
	);
}
