<template>
  <div class="manual-add">
    <el-form name="manual-form"
             ref="manualEventForm">
      <label>Title
        <el-input v-model="formData.title"
                  name="title"
                  placeholder="Title" />
      </label>
      <label>Description
        <el-input v-model="formData.description"
                  type="textarea"
                  name="description"
                  placeholder="Description"
                  rows="2"></el-input>
      </label>
      <label>Date
        <el-date-picker v-model="formData.date"
                        type="date"
                        placeholder="Pick a day"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
      </label>
      <label>
        From
        <el-time-picker v-model="formData.from"
                        placeholder="Start time"
                        value-format="HH:mm:00"
                        format="HH:mm"
                        :picker-options="{
                        	format: 'HH:mm'
                        }">
        </el-time-picker>
      </label>
      <label>
        To
        <el-time-picker v-model="formData.to"
                        placeholder="End time"
                        value-format="HH:mm:00"
                        format="HH:mm"
                        :picker-options="{
                        	format: 'HH:mm'
                        }">
        </el-time-picker>
      </label>
      <span class="info">Date format must be a valid one. For example:
        <strong>2018-08-09T01:50:00</strong>.</span>
      <button type="button"
              @click="addManually()"
              class="save">Add Event</button>
      <button type="button"
              class="close"
              @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
      </button>
    </el-form>
  </div>
</template>
<script>
export default {
  data: () => ({
    formData: {
      from: null,
      to: null,
      description: null,
      title: null
    }
  }),
  methods: {
    addManually() {
      const { title, description, date, from, to } = this.formData;
      let formattedFrom = `${date}T${from}.000Z`;
      let formattedTo = `${date}T${to}.000Z`;
      let payload = {
        data: { title, description },
        from: formattedFrom,
        to: formattedTo
      };
      this.$emit('done', payload);
      this.$refs.manualEventForm.resetFields();
    },
  }
}
</script>