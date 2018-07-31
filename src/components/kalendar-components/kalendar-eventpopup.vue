<template>
	<div class="popup-wrapper">
		<portal-target name="event-popup" :slot-props="popup_scope">
		</portal-target>
	</div>
</template>
<script>
export default {
	props: ['appointmentProps'],
	beforeMount() {
		this.popup_scope['appointment_props'] = this.appointmentProps;
		if(this.appointmentProps.hasOwnProperty('form_data')){
			this.popup_scope.status = 'existing';
		} else {
			this.popup_scope.status = 'new';
		}
	},
	data: () => ({
		popup_scope: {
			close_popup: false,
			status: null,
			appointment_props: null,
		}
	}),	
	mounted() {
		this.$on('completedForm', () => {
			console.log('completed form in eventpopup.vue');
		});
	},
	watch: {
		popup_scope: {
			handler(val) {
				if(val.close_popup) {
					console.log('Closing popup.');
					this.$emit('closePopup');
				}
			},
			deep: true,
		},
	},
}

</script>
