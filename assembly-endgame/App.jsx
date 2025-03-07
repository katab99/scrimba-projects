import React from "react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Header from "./components/Header";
import Status from "./components/Status";
import LanguageChip from "./components/LanguageChip";
import { languages } from "./languages";
import { getWord } from "./utils";

export default function AssemblyEndgame() {
	const [currentWord, setCurrentWord] = useState(() => getWord());
	const [guessedLetters, setGuessedLetters] = useState([]);
	console.log(currentWord);
	const alphabet = "abcdefghijklmnopqrstuvwxyz";

	const wrongGuessCount = guessedLetters.filter(
		(letter) => !currentWord.includes(letter)
	).length;
	const isGameLost = wrongGuessCount >= languages.length - 1;
	const isGameWon = currentWord
		.split("")
		.every((letter) => guessedLetters.includes(letter));
	const isGameOver = isGameLost || isGameWon;
	const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
	const wrongGuess =
		lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
	const lostLanguage =
		wrongGuessCount > 0 ? languages[wrongGuessCount - 1] : null;

	const languageChipItems = languages.map((language, index) => (
		<LanguageChip
			name={language.name}
			className={clsx("language-chip", index < wrongGuessCount && "lost")}
			backgroundColor={language.backgroundColor}
			color={language.color}
			id={language.name}
		/>
	));

	const wordLetters = currentWord.split("").map((letter, index) => {
		const revealLetter = isGameLost || guessedLetters.includes(letter);
		return (
			<span
				key={index}
				className={clsx("word-letter-box", {
					reveal: isGameLost && !guessedLetters.includes(letter),
				})}
			>
				{revealLetter ? letter.toUpperCase() : ""}
			</span>
		);
	});

	const keyboardLetters = alphabet.split("").map((letter) => {
		const isGuessed = guessedLetters.includes(letter);
		const inWord = currentWord.includes(letter);

		return (
			<button
				key={letter}
				className={clsx("keyboard-letter-default", {
					"keyboard-letter-right": isGuessed && inWord,
					"keyboard-letter-wrong": isGuessed && !inWord,
				})}
				onClick={() => addGuessedLetter(letter)}
				aria-disabled={guessedLetters.includes(letter)}
				aria-label={`Letter ${letter}`}
				disabled={isGameOver}
			>
				{letter.toUpperCase()}
			</button>
		);
	});

	function addGuessedLetter(letter) {
		setGuessedLetters((prevGuessedLetters) =>
			prevGuessedLetters.includes(letter)
				? prevGuessedLetters
				: [...prevGuessedLetters, letter]
		);
	}

	function startNewGame() {
		setCurrentWord(getWord());
		setGuessedLetters([]);
	}

	return (
		<main>
			<Header />
			<Status
				isGameWon={isGameWon}
				isGameLost={isGameLost}
				isGameOver={isGameOver}
				wrongGuess={wrongGuess}
				lostLanguage={lostLanguage}
			/>
			<section className="language-chip-list">{languageChipItems}</section>
			<section className="word">{wordLetters}</section>

			<section className="sr-only" aria-live="polite" role="status">
				<p>
					{currentWord.includes(lastGuessedLetter)
						? `Correct! The letter ${lastGuessedLetter} is in the word.`
						: `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
					You have {languages.length - 1 - wrongGuessCount} attempts left.
				</p>
				<p>
					Current word:{" "}
					{currentWord
						.split("")
						.map((letter) =>
							guessedLetters.includes(letter) ? letter + "." : "blank"
						)
						.join(" ")}
				</p>
			</section>
			<section className="keyboard">{keyboardLetters}</section>
			{isGameOver ? (
				<button className="new-game" onClick={() => startNewGame()}>
					New Game
				</button>
			) : null}
		</main>
	);
}
