<template>
	<div class="preferences-wrapper" :class="{'active': show_options}">
		<button class="show_options">
			PREFERENCES
			<span class="pref-icon" @click="show_options = !show_options">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sliders">
					<line x1="4" y1="21" x2="4" y2="14"></line>
					<line x1="4" y1="10" x2="4" y2="3"></line>
					<line x1="12" y1="21" x2="12" y2="12"></line>
					<line x1="12" y1="8" x2="12" y2="3"></line>
					<line x1="20" y1="21" x2="20" y2="16"></line>
					<line x1="20" y1="12" x2="20" y2="3"></line>
					<line x1="1" y1="14" x2="7" y2="14"></line>
					<line x1="9" y1="8" x2="15" y2="8"></line>
					<line x1="17" y1="16" x2="23" y2="16"></line>
				</svg>
			</span>
			<a class="json-icon" href="#getting-started">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book">
					<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
					<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
				</svg>
			</a>
		</button>
		<div class="pref-slot">
			<slot></slot>
		</div>
		<!-- 		<div class="plain-controls" v-show="show_options">
			<div>
				<h4 class="settings">Settings</h4>
				<slot></slot>
			</div>
		</div> -->
	</div>
</template>
<script>
export default {
	data: () => ({
		show_options: false,
	}),
};

</script>
<style lang="scss">
$dark-blue: #0F4894;
$blue: #007FFF;
$yellow: #F5D547;
$dark: #3C3C3B;
.plain-controls {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 50px 0px;
	flex-direction: column;
	background-color: white;
	>div {
		display: flex;
		align-items: center;
		border-radius: 4px;
		overflow: hidden;
		border: solid 1px whitesmoke;
		border-radius: 4px;
		position: relative;
		overflow: visible;
		padding: 20px;
	}
	.settings {
		position: absolute;
		left: 15px;
		top: -10px;
		margin: 0px;
		background-color: white;
		padding: 0px 10px;
		font-size: 16px;
		color: $dark-blue;
	}
	label {
		font-size: 16px;
		padding: 10px 20px;
		display: flex;
		flex-direction: column;
		select {
			font-size: 15px;
			backgorund-color: white;
			margin-top: 5px;
		}
	}
}

.pref-slot {
	display: flex;
	flex-direction: column;
	padding: 15px;
	>* {
		margin-bottom: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		>*:last-child {
			margin-left: 25px;
		}
		&:last-child {
			margin-bottom: 0px;
		}
	}
}

.preferences-wrapper {
	z-index: 2;
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 270px;
	border-radius: 6px;
	max-width: 650px;
	background-color: white;
	border-radius: 0px;
	border-bottom-right-radius: 6px;
	box-shadow: 0px 2px 5px -3px $dark, inset 0px 0px 0px 1px whitesmoke;
	font-size: 14px;
	transform: translateX(-100%);
	transition: transform .3s ease;
	&.active {
		transform: translateX(0);
	}
	.el-input,
	.el-textarea {
		max-width: 160px;
	}
}

.show_options {
	border: none;
	z-index: 10;
	color: $dark;
	background: transparent;
	display: flex;
	align-items: center;
	font-size: 14px;
	position: relative;
	padding: 15px;
	outline: none;
	span.pref-icon,
	a.json-icon {
		position: absolute;
		background-color: white;
		right: 0px;
		top: 0px;
		transform: translateX(100%);
		padding: 15px;
		border-top-right-radius: 6px;
		box-shadow: inset 0px 0px 0px 1px whitesmoke;
	}
	a.json-icon {
		transform: translateX(100%) translateY(100%);
		border-bottom-right-radius: 6px;
		border-top-right-radius: 0px;
		svg {
			stroke: $dark;
		}
	}
	svg {
		margin-right: 5px;
		width: 20px;
		height: 20px;
		stroke: $blue;
	}
}

@media screen and (max-height: 700px) {
	.preferences-wrapper {
		top:70px;
		//overflow-y: auto;
	}
}

</style>
