<script>
	import SCWebsocket from "./../scripts/webscoket";
	import { onMount } from "svelte";
	import LeaderboardItem from "./components/LeaderboardItem.svelte";
	import PlayerItem from "./components/PlayerItem.svelte";
	let tokens = {};
	let websocket;

	const required = [
		"songSelectionRankingType",
		"songSelectionTotalScores",
		"songSelectionScores",
		"username",
		"mods",
		"grade",
		"acc",
		"score",
		"currentMaxCombo",
		"status",
	];
	let scores = [];
	let playerIndex = 999;
	function callPlayerIndexUpdate(parsed) {
		// order player's leaderboard
		var merged = scores.concat({
			score: {
				Score: parsed.score,
			},
		});
		merged = merged.sort(function (a, b) {
			return a.score.Score < b.score.Score
				? 1
				: b.score.Score < a.score.Score
				? -1
				: 0;
		});

		playerIndex = merged.indexOf(
			merged.filter((a) => a.score.Score == parsed.score)[0]
		);
		if (playerIndex == -1) playerIndex = 99;
	}
	onMount(() => {
		websocket = new SCWebsocket(null, required);
		websocket.invoke_message = (data) => {
			const parsed = JSON.parse(data);

			if (
				parsed.songSelectionScores != null &&
				parsed.songSelectionScores != "0"
			) {
				scores = JSON.parse(parsed.songSelectionScores).map((value, index) => {
					return {
						order: index,
						score: value,
					};
				});
				if (tokens.score != null) callPlayerIndexUpdate(parsed);
			}

			if (parsed.score != null && parsed.score != tokens.score) {
				callPlayerIndexUpdate(parsed);
			}

			tokens = { ...tokens, ...parsed };
		};
		websocket.createConnection();
	});

	const isPlaying = (value) => {
		value = parseInt(value)
		if (value == 2)	return true;
		if (value == 8)	return true;
		if (value == 32) return true;
		return false;
	}
</script>

<main>
	<div class="leaderboard-outside">
		<div class="leaderboard" style="top: -{playerIndex > 5 ? (isPlaying(tokens.status) ? (playerIndex-5)*80+10 : (playerIndex-6)*80+10 ) : 10}px">
			{#each scores as item, idx}
				<LeaderboardItem
					order={(tokens.score || 0) >= item.score.Score
						? item.order + 1
						: item.order}
					value={item.score}
				/>
			{/each}
			<PlayerItem value={tokens} order={playerIndex} playing={isPlaying(tokens.status)}/>
		</div>
	</div>
</main>

<style>
	.leaderboard-outside {
		height: 470px;
		
		overflow: hidden;
	}
	.leaderboard {
		transition: all 0.5s;
		position: relative;
		top: 0px;
	}
	
</style>
