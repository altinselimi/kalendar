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
</style>