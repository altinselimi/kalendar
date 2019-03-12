<template>
	<div class="popup-wrapper">
		<span>Popup goes here</span>
		<!-- <portal-target name="event-popup-form" :slot-props="popup_scope">
		</portal-target> -->
	</div>
</template>
<script>
export default {
	props: ['event'],
	beforeMount() {
		//this.popup_scope['appointment_props'] = this.event;
	},
	data: () => ({
	}),
}
</script>
<style lang="scss">
.popup-wrapper {
	text-shadow: none;
	color: black;
	z-index: 10;
	position: absolute;
	top: 0;
	left: calc(100% + 5px);
	display: flex;
	flex-direction: column;
	user-select: none;
	background-color: white;
	border: solid 1px rgba(black, .08);
	border-radius: 4px;
	box-shadow: 0px 2px 12px -3px rgba(black, .3);
	padding: 10px;
	h4 {
		color: black;
		font-weight: 400;
	}
	input,
	textarea {
		border: none;
		background-color: darken(white, 8);
		color: lighten(black, 1);
		border-radius: 4px;
		padding: 5px 8px;
		margin-bottom: 5px;
	}
}

ul:last-child .popup-wrapper {
	left: auto;
	right: 100%;
	margin-right: 10px;
}

.is-day-view ul .popup-wrapper {
    left: auto;
    right: auto;
    width: 100%;
}
</style>