<script>
	import { afterUpdate } from "svelte";
	export let order = 0;
	export let playing = false;
	export let value = {
		username: null,
		mods: "",
		grade: 8,
		acc: 100.00,
		score: 0,
		currentMaxCombo: 0,
	};
	const regex = /\B(?=(\d{3})+(?!\d))/g;
	function scorestr(num) {
		return num.toString().replace(regex, ",");
	}

	let movable;

    const osuGrade = {
		1: "XH",
		2: "SH",
		3: "X",
		4: "S",
		5: "A",
		6: "B",
		7: "C",
		8: "D",
		9: "F",
		10: "?",
	};
	import { get } from 'svelte/store';
	import { userIdCache } from './../../scripts/static';
	afterUpdate(() => {
        if (movable != null)
		    movable.style.top = `${order*80+10}px`;
	});


</script>

<div class="movable player {playing ? "enabled" : ""}" bind:this={movable}>
	<div class="leaderboard-item">
		<div class="order">
			#{order > 49 ? "?" : order+1}
		</div>
		<div class="part">
			<img
				class="avatar"
				src="https://a.ppy.sh/{get(userIdCache)[value.username]}"
				alt="Avatar"
			/>

			<div class="username">
				{value.username || "{Guest}"}
			</div>
		</div>
		<div class="part">
			<div class="rank">{osuGrade[parseInt(value.grade+1) || 8]}</div>
			<div class="section">
				<div class="combos" style="width: {scorestr(value.score || 0).length*4+8}px">{value.currentMaxCombo || "0"}x</div>
				<div class="mods">{(value.mods || "").split(",").join("")}</div>
			</div>
			<div class="section">
				<div class="score" style="width: {scorestr(value.score || 0).length*7.5}px">
					{scorestr(value.score || 0)}
				</div>
				<div class="accuracy">{(value.acc || 0).toFixed(2)}%</div>
			</div>
		</div>
	</div>
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;600&display=swap");
	.order { 
		margin-left: 10px;
		color: white;
	}
	.movable {
        position: absolute;
        transition: all 0.5s;
        top: 0px;
    }
	.leaderboard-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
        background-color: rgba(117, 117, 117, 0.5);
		border-radius: 10px;
        
	}
	.part {
		display: flex;
		align-items: center;
	}
	.avatar {
		width: 50px;
		height: 50px;
		border-radius: 10px;
		margin: 10px;
		transition: all 1s;
	}
	.username {
		color: white;
	}
	.score, .combos {
		display: flex;
		justify-content: flex-end;
		transition: all 0.1s;
	}
	* {
		color: rgb(223, 223, 223);
		font-variant-numeric: tabular-nums lining-nums;
		font-family: "Quicksand", sans-serif;
	}
	.rank {
		background-color: white;
		color: black;
		font-size: 20px;
		width: 25px;
		padding: 0px 10px 0px 10px;
		border-radius: 10rem;
		margin: 10px;

		display: flex;
		justify-content: center;
	}
	.section {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin: 0px 10px 0px 0px;
	}
	.mods {
		height: 20px;
	}
	.player {
		opacity: 0;
		transition: all 0.2s;
	}
	.enabled {
		opacity: 1;
	}
</style>
