<script>
    import { afterUpdate } from "svelte";
	export let order = 0;
	export let value = {
		Date: "Unknown",
		Hit50: 0,
		Hit100: 0,
		Hit300: 0,
		HitGeki: 0,
		HitKatu: 0,
		HitMiss: 0,
		MaxCombo: 0,
		Mode: -1,
		Mods: {
			ModsXor1: 0,
			ModsXor2: 0,
			Value: 0,
		},
		Score: 0,
		UserId: 0,
		Username: 0,
	};
	const regex = /\B(?=(\d{3})+(?!\d))/g;
	function scorestr(num) {
		return num.toString().replace(regex, ",");
	}
	function modstr(num) {
		let number = parseInt(num)
		let mod_list = []

		if(number & 1<<0)   mod_list.push('NF')
		if(number & 1<<1)   mod_list.push('EZ')
		if(number & 1<<3)   mod_list.push('HD')
		if(number & 1<<4)   mod_list.push('HR')
		if(number & 1<<5)   mod_list.push('SD')
		if(number & 1<<9)   mod_list.push('NC')
		else if(number & 1<<6) mod_list.push('DT')
		if(number & 1<<7)   mod_list.push('RX')
		if(number & 1<<8)   mod_list.push('HT')
		if(number & 1<<10)  mod_list.push('FL')
		if(number & 1<<12)  mod_list.push('SO')
		if(number & 1<<14)  mod_list.push('PF')
		if(number & 1<<15)  mod_list.push('4K')
		if(number & 1<<16)  mod_list.push('5K')
		if(number & 1<<17)  mod_list.push('6K')
		if(number & 1<<18)  mod_list.push('7K')
		if(number & 1<<19)  mod_list.push('8K')
		if(number & 1<<20)  mod_list.push('FI')
		if(number & 1<<24)  mod_list.push('9K')
		if(number & 1<<25)  mod_list.push('10K')
		if(number & 1<<26)  mod_list.push('1K')
		if(number & 1<<27)  mod_list.push('3K')
		if(number & 1<<28)  mod_list.push('2K')

		return mod_list.join("")
}
	let movable;

	const osuGrade = {
		0: "SSH",
		1: "SH",
		2: "SS",
		3: "S",
		4: "A",
		5: "B",
		6: "C",
		7: "D",
		8: "F",
		9: "",
	};


	import { userIdCache } from './../../scripts/static';
    afterUpdate(() => {
        if (movable != null)
		    movable.style.top = `${order*80+10}px`;
		$userIdCache[value.Username] = value.UserId;
	});
</script>

<div class="movable" bind:this={movable}>
	<div class="leaderboard-item">
		<div class="order">
			#{order+1}
		</div>
		<div class="part">
			<img
				class="avatar"
				src="https://a.ppy.sh/{value.UserId || null}"
				alt="Avatar"
			/>

			<div class="username">
				{value.Username || "{Guest}"}
			</div>
		</div>
		<div class="part">
			<div class="rank">SS</div>
			<div class="section">
				<div class="combos">{value.MaxCombo || 0}x</div>
				<div class="mods">{modstr(value.Mods.Value)}</div>
			</div>
			<div class="section">
				<div class="score">
					{scorestr(value.Score || 0)}
				</div>
				<div class="accuracy">100%</div>
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
		top: -500px;
	}
	.leaderboard-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: rgba(0, 78, 109, 0.5);
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
	}
	.username {
		color: white;
	}
	* {
		color: rgb(223, 223, 223);
		font-variant-numeric: tabular-nums;
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
</style>
