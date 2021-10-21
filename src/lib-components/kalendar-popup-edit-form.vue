<template>
  <div class="b-edit-card">
    <div class="b-edit-card__header">
      <span class="b-edit-card__header-icon">
        <span @click="edit">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.11837 13.1284L14.7162 1.53058C14.735 1.52491 14.7556 1.51901 14.7777 1.51302C14.9366 1.46997 15.1659 1.42516 15.4349 1.42145C15.9531 1.4143 16.6406 1.55535 17.3159 2.23063C17.9912 2.90592 18.1323 3.59346 18.1251 4.11164C18.1214 4.38069 18.0766 4.60996 18.0335 4.76889C18.0276 4.79099 18.0217 4.81153 18.016 4.83041L6.4182 16.4282L2.6684 16.8782L3.11837 13.1284Z" stroke="#6E7191" stroke-width="2" stroke-linecap="round"/>
            <path d="M11.8896 2.94287L16.3792 7.43244" stroke="#6E7191" stroke-width="2"/>
          </svg>
        </span>
      </span>
      <span class="b-edit-card__header-icon">
        <span @click="deleteEvent">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 5.1665H18.5L17.9875 15.4162C17.8545 18.0772 15.6581 20.1665 12.9938 20.1665H9.00625C6.34188 20.1665 4.14554 18.0772 4.01248 15.4162L3.5 5.1665Z" stroke="#6E7191" stroke-width="2"/>
            <path d="M6.83301 5.1665V4.83317C6.83301 3.17632 8.17615 1.83317 9.83301 1.83317H12.1663C13.8232 1.83317 15.1663 3.17632 15.1663 4.83317V5.1665" stroke="#6E7191" stroke-width="2"/>
            <path d="M1.83301 5.1665H20.1663" stroke="#6E7191" stroke-width="2" stroke-linecap="round"/>
            <path d="M13.5 10.1665V14.3332" stroke="#6E7191" stroke-width="2" stroke-linecap="round"/>
            <path d="M8.5 10.1665V14.3332" stroke="#6E7191" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </span>
      </span>
      <span class="b-edit-card__header-icon">
        <span @click="mail">
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5.3335C1 4.22893 1.89543 3.3335 3 3.3335H19C20.1046 3.3335 21 4.22893 21 5.3335V15.5002C21 16.6047 20.1046 17.5002 19 17.5002H3C1.89543 17.5002 1 16.6047 1 15.5002V5.3335Z" stroke="#6E7191" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2.42131 4.63636C1.91709 4.17416 2.24409 3.3335 2.9281 3.3335H19.0719C19.7559 3.3335 20.0829 4.17416 19.5787 4.63636L13.0272 10.6419C11.8802 11.6933 10.1198 11.6933 8.97283 10.6419L2.42131 4.63636Z" stroke="#6E7191" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </span>
      </span>
      <span class="b-edit-card__header-icon">
        <span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="9.99967" cy="5.83317" rx="1.66667" ry="1.66667" fill="#6E7191"/>
            <ellipse cx="9.99967" cy="14.1667" rx="1.66667" ry="1.66667" fill="#6E7191"/>
          </svg>
        </span>
      </span>
      <span class="b-edit-card__x" @click="close">
        <kalendar-x-button />
      </span>
    </div>
    <div v-if="isEdit">
      <div>
        <template v-if="addedStudents.length > 0">
          <ul class="b-added-students">
            <li
                class="b-added-students__item"
                v-for="(student, index) in addedStudents"
                :key="student.value"
            >
              <span
                  class="b-added-students__item-x"
                  @click="removeStudent(index)"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.08268 1.73925L8.26018 0.916748L4.99935 4.17758L1.73852 0.916748L0.916016 1.73925L4.17685 5.00008L0.916016 8.26092L1.73852 9.08342L4.99935 5.82258L8.26018 9.08342L9.08268 8.26092L5.82185 5.00008L9.08268 1.73925Z" fill="#777777"/>
                </svg>
              </span>
              {{ student.name }}
            </li>
          </ul>
          <div class="b-open-lesson">
            <button>Открыть урок</button> https://4smart.pro/4fx-dko-dl5
          </div>
        </template>
        <base-select
            v-else
            defaultText="Выбрать студента..."
            :options="studentSelect.filteredList"
            v-model="studentSelect.selected"
            :search="true"
            @input="addStudent(studentSelect.selected)"
        />
      </div>
      <div class="b-date-time">
        <span class="b-date-time__date">
          {{ formatDay(start_time) }}
        </span>
        <base-select
            defaultText="Начало"
            :options="startTimeSelect.filteredList"
            v-model="startTimeSelect.selected"
            @input="() => changeTime(startTimeSelect.selected.value, 'start')"
        />
        <span class="b-delimiter" />
        <base-select
            defaultText="Конец"
            :options="endTimeSelect.filteredList"
            v-model="endTimeSelect.selected"
            @input="() => changeTime(endTimeSelect.selected.value, 'end')"
            :error="errorSelectedTime"
        />
      </div>
      <div class="b-materials">
        <button class="b-materials__add-button"
          v-if="!isShowMaterialSelect"
          @click="showMaterialSelect"
        >
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.1667 9.66667H13.8333V12.1667H16.3333V13.8333H13.8333V16.3333H12.1667V13.8333H9.66667V12.1667H12.1667V9.66667ZM8 12.1667V10.5H3.83333V12.1667H8ZM12.1667 7.16667H3.83333V8.83333H10.2417C8.89167 9.725 8 11.2583 8 13C8 13.9083 8.24167 14.7667 8.66667 15.5H2.16667C1.24167 15.5 0.5 14.75 0.5 13.8333V2.16667C0.5 1.24167 1.24167 0.5 2.16667 0.5H13.8333C14.2754 0.5 14.6993 0.675595 15.0118 0.988155C15.3244 1.30072 15.5 1.72464 15.5 2.16667V8.66667C14.7667 8.24167 13.9083 8 13 8L12.1667 8.06667V7.16667ZM12.1667 5.5V3.83333H3.83333V5.5H12.1667Z" fill="#2089FF"/>
          </svg>
          Добавить материалы к уроку
        </button>
        <base-select
            v-else
            defaultText="Выбрать материал к уроку..."
            :options="materialSelect.filteredList"
            v-model="materialSelect.selected"
            :search="true"
            @input="addMaterial(materialSelect.selected)"
        />
        <ul class="b-materials__list">
          <li
              class="b-materials__list-item"
              v-for="(student, index) in addedMaterials"
              :key="student.value"
          >
              <span
                  class="b-materials__list-item-x"
                  @click="removeMaterial(index)"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.08268 1.73925L8.26018 0.916748L4.99935 4.17758L1.73852 0.916748L0.916016 1.73925L4.17685 5.00008L0.916016 8.26092L1.73852 9.08342L4.99935 5.82258L8.26018 9.08342L9.08268 8.26092L5.82185 5.00008L9.08268 1.73925Z" fill="#777777"/>
                </svg>
              </span>
            {{ student.name }}
          </li>
        </ul>
      </div>
      <div class="b-buttons" v-if="enabledSave">
        <button class="main-button" @click="editEvent">
          Сохранить
        </button>
      </div>
    </div>
    <div v-else>
      <template v-if="addedStudents.length > 0">
        <ul class="b-added-edit-students">
          <li
              class="b-added-edit-students__item"
              v-for="(student) in addedStudents"
              :key="student.value"
          >
            <span />{{ student.name }}
          </li>
        </ul>
        <div class="b-date-time">
          <span class="b-date-time__date">
            {{ formatDay(start_time) }},
            {{ formatDate(start_time) }}
            -
			      {{ formatDate(end_time) }}
          </span>
        </div>
        <div class="b-open-edit-lesson">
          <button>Открыть урок</button> https://4smart.pro/4fx-dko-dl5
        </div>
        <div class="b-before-time" v-if="beforeTime[0] > 0 || beforeTime[1] > 0">
          <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.1111 7.51191C17.1111 5.96162 16.4673 4.47481 15.3212 3.37859C14.1752 2.28236 12.6208 1.6665 11 1.6665C9.37923 1.6665 7.82485 2.28236 6.67879 3.37859C5.53274 4.47481 4.88889 5.96162 4.88889 7.51191C4.88889 12.267 2.99823 14.6538 1.85347 15.6632C1.65568 15.8376 1.79337 16.28 2.05706 16.28H7.2351C7.35207 16.28 7.45419 16.3608 7.48974 16.4723C7.6956 17.1176 8.54266 19.1665 11 19.1665C13.4573 19.1665 14.3044 17.1176 14.5103 16.4723C14.5458 16.3608 14.6479 16.28 14.7649 16.28H19.9429C20.2066 16.28 20.3443 15.8376 20.1465 15.6632C19.0018 14.6538 17.1111 12.267 17.1111 7.51191Z" stroke="#6E7191" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <template v-if="beforeTime[0] > 0">
            {{ beforeTime[0] }} час.
          </template>
          <template v-if="beforeTime[1] > 0">
            {{ beforeTime[1] }} мин.
          </template>
        </div>
        <ul class="b-materials__list">
          <li
              class="b-materials__list-item"
              v-for="(student) in addedMaterials"
              :key="student.value"
          >
            {{ student.name }}
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
import KalendarXButton from '@/lib-components/kalendar-x-button';
import BaseSelect from '@/lib-components/base/BaseSelect';
import hourUtils from "./hours.js";
import {
  getFormattedWeekDayTime,
  getFormattedMonth,
  getLocaleTime,
  getFormattedTime, addTimezoneInfo, cloneObject, getTimeRemaining,
} from './utils.js';

const EVENT = {
  title: 'Новое занятие',
  description: null,
  userId: null,
  materials: []
};
const STUDENTS = {
  '10001': {
    name: 'Иванов Сергей'
  },
  '20002': {
    name: 'Петровский Иван'
  },
  '30003': {
    name: 'Академиков Кот'
  },
  '40004': {
    name: 'Дмитриев Иван'
  }
}
const MATERIALS = {
  '10001': {
    name: 'Present simple. Правила, примеры + тест.'
  },
  '20002': {
    name: 'Present simple таблица.'
  },
  '30003': {
    name: 'Present simple.'
  }
}

export default {
  name: "kalendar-popup-edit-form",
  components: {
    KalendarXButton,
    BaseSelect
  },
  props: ['popup_information'],
  data () {
    return {
      studentSelect: {
        list: Object.keys(STUDENTS).map(m => ({ value: m, name: STUDENTS[m].name})),
        filteredList: [],
        selected: {}
      },
      materialSelect: {
        list: Object.keys(MATERIALS).map(m => ({ value: m, name: MATERIALS[m].name})),
        filteredList: [],
        selected: {}
      },
      information: null,
      start_time: null,
      end_time: null,
      addedStudents: null,
      addedMaterials: null,
      isShowMaterialSelect: false,
      start_time_h: 0,
      end_time_h: 0,
      isEdit: false,
      startTimeSelect: {
        list: [],
        filteredList: [],
        selected: {}
      },
      endTimeSelect: {
        list: [],
        filteredList: [],
        selected: {}
      },
      day_events: []
    }
  },
  computed: {
    hourRange () {
      return [this.$kalendar.options.day_starts_at, this.$kalendar.options.day_ends_at - 1]
    },
    enabledSave () {
      return this.addedStudents.length > 0 && !this.errorSelectedTime
    },
    errorSelectedTime () {
      return this.end_time_h - this.start_time_h < 0
    },
    beforeTime () {
      const rt = getTimeRemaining(this.start_time);

      if (rt.days === 0 && (rt.minutes >= 0 && (rt.hours < 8 && rt.hours >= 0))) {
        return [rt.hours, rt.minutes]
      }

      return []
    }
  },
  created () {
    const { start_time, end_time, data, day_events } =  cloneObject(this.popup_information)
    this.start_time = start_time;
    this.start_time_h = this.getNumHour(this.start_time);
    this.end_time = end_time;
    this.end_time_h = this.getNumHour(this.end_time);
    this.addedStudents = data.students;
    this.addedMaterials = data.materials;
    this.addedMaterials = data.materials;
    this.day_events = day_events;
  },
  mounted () {
    this.filterStudents()
    this.filterMaterials()
    this.filterTimes()
    this.startTimeSelect.selected = this.setTime('start');
    this.endTimeSelect.selected = this.setTime('end');
  },
  methods: {
    filterTimes () {
      this.filterTime('start')
      this.filterTime('end')
    },
    editEvent () {
      this.start_time = addTimezoneInfo(this.start_time);
      this.end_time = addTimezoneInfo(this.end_time);

      let payload = {
        data: {
          students: this.addedStudents,
          materials: this.addedMaterials
        },
        from: this.start_time,
        to: this.end_time,
        id: this.popup_information.id
      };

      this.$kalendar.saveEvent(payload);
      this.$kalendar.closePopups();
      this.$kalendar.toggleEditing();
      this.$kalendar.toggleEditPopup(false)
      this.isEdit = false
    },
    close () {
      this.$kalendar.toggleEditPopup(false)
    },
    addStudent (value) {
      this.addedStudents.push(value);
      this.studentSelect.selected = {}
      this.filterStudents()
    },
    removeStudent (index) {
      this.addedStudents.splice(index, 1);
      this.filterStudents()
    },
    filterStudents () {
      this.studentSelect.filteredList = this.studentSelect.list.filter(s => {
        if (this.addedStudents.length === 0) {
          return true
        }

        return this.addedStudents.find(addedS => addedS.value === s.value) === undefined
      })
    },
    formatDay (date ) {
      let isoDate = new Date(date);

      let dayName = getFormattedWeekDayTime(isoDate).split(',')[0];
      let dayMonth = getFormattedMonth(isoDate);
      return `${dayName}, ${dayMonth}`;
    },
    changeTime (value, timeName) {
      const dataTime = value.split(':');
      const date = new Date(this[`${timeName}_time`])

      const newDate = new Date(date.setHours(dataTime[0], dataTime[1]))

      this[`${timeName}_time`] = getLocaleTime(newDate.toISOString()) // this.startTime or this.endTime
      this[`${timeName}_time_h`] = +dataTime[0] * 100

      this.filterTimes()

      if (this.start_time_h > this.end_time_h) { // если при переключении выбрали время начала больше конца
        this.endTimeSelect.selected = this.endTimeSelect.filteredList[0]
        this.end_time_h = +this.endTimeSelect.selected.value.replace(':','')
        this.changeTime(this.endTimeSelect.selected.value, 'end')
      }
    },
    showMaterialSelect () {
      this.isShowMaterialSelect = true
    },
    hideMaterialSelect () {
      this.isShowMaterialSelect = false
    },
    addMaterial (value) {
      this.addedMaterials.push(value);
      this.materialSelect.selected = {}
      this.filterMaterials()
      this.hideMaterialSelect()
    },
    filterMaterials () {
      this.materialSelect.filteredList = this.materialSelect.list.filter(s => {
        if (this.addedMaterials.length === 0) {
          return true
        }

        return this.addedMaterials.find(addedS => addedS.value === s.value) === undefined
      })
    },
    removeMaterial (index) {
      this.addedMaterials.splice(index, 1);
      this.filterMaterials()
    },
    edit () {
      this.isEdit = !this.isEdit
    },
    deleteEvent () {
      this.$emit('removeEvent')
    },
    mail () {
        alert('Тут открываем отправку E-mail')
    },
    formatDate (date) {
      let isoDate = new Date(date);
      return getFormattedTime(isoDate)
    },
    filterTime (prop) {
      let maxStartTime = this.hourRange[0] * 100;
      let maxEndTime = this.hourRange[1] * 100;

      Object.keys(this.day_events).forEach(key => {
        const eventStartTime = +this.getNumHour(this.day_events[key][0].start.value); // // 2021-10-22T18:00:00+03:00 => 1800
        const eventEndTime = +this.getNumHour(this.day_events[key][0].end.value); //

        if (eventStartTime <= this.start_time_h && eventEndTime <= this.start_time_h) {
          if (eventEndTime > maxStartTime) {
            maxStartTime = eventEndTime
          }
        }

        if (eventStartTime >= this.end_time_h && eventEndTime >= this.end_time_h) {
          if (eventStartTime < maxEndTime) {
            maxEndTime = eventStartTime
          }
        }
      })

      let all_hours = hourUtils.getAllHours().filter(h => {
        const numHour = +h.slice(0, 2) // берем время в виде 10
        const numHour10 = +h.slice(0, 5).replace(':','') // берем время в виде 10:30 и переводим в число 1030

        if (numHour < this.hourRange[0] || numHour > this.hourRange[1]) { // убираем часы не попадающие в режим работы day_starts_at и day_ends_at календаря
          return false
        }

        if (prop === 'start' && numHour10 === this.getNumHour(this.end_time)) {
          return false
        }

        if (prop === 'end' && numHour10 <= this.getNumHour(this.start_time)) {
          return false
        }

        return (h.indexOf(':00:') !== -1 || h.indexOf(':30:') !== -1) && numHour10 >= maxStartTime && numHour10 <= maxEndTime// выбираем только кратные 30мин
      });

      this[`${prop}TimeSelect`].filteredList = all_hours.map(h => {
        return { name: h.slice(0, 5), value: h.slice(0, 5)}
      })
    },
    setTime (prop) {
      const time = this[`${prop}_time`].slice(11, 16);

      return { name: time, value: time}
    },
    getNumHour (time) {
      return +time.slice(11, 16).replace(':','') // 2021-10-22T18:00:00+03:00 => 1800
    }
  }
}
</script>

<style lang="scss">
@import '~vue2-timepicker/dist/VueTimepicker.css';
.b-edit-card {
  display: flex;
  flex-direction: column;
  padding: 4px 10px 10px 15px;
  position: relative;
  &__x {
    position: relative;
    right: -10px;
  }
  &__header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 0 20px 0;
    &-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      margin: 0 10px;
      & > span {
        cursor: pointer;
      }
    }
    &-text {
      font-size: 16px;
      font-weight: 600;
      color: #0967D1;
      text-transform: uppercase;
    }
  }
}
.b-added-edit-students {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0 0 0  !important;
  &__item {
    border-right: none !important;
    margin: 0 20px 0 0;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #0967D1;
    & > span {
      width: 20px;
      height: 20px;
      display: inline-block;
      margin: 0 10px 0 0;
      background: #0967D1;
      border-radius: 3px;
    }
  }
}
.b-added-students {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0 0 10px !important;
  &__item {
    border-right: none !important;
    margin: 0 20px 0 0;
    &-x {
      width: 8px;
      height: 8px;
      display: inline-block;
      margin: 0 7px 0 0;
      cursor: pointer;
    }
  }
}
.b-open-edit-lesson {
  width: 100%;
  color: #777777;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 0 25px;
  & > button {
    color: #2089FF;
    cursor: pointer;
    border: none;
    background: transparent;
  }
}
.b-buttons {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
.b-date-time {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  padding: 10px 0 20px 30px;
  &__date {
    &:first-letter {
      text-transform: uppercase;
    }
    display: inline-block;
    margin: 0 30px 0 0;
  }
}
.b-delimiter {
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: '';
    display: inline-block;
    border-bottom: 1px solid rgba(#DADADA,1);
    width: 10px;
  }
}
.b-materials {
  &__add-button {
    color: #2089FF;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    & > svg {
      margin: 0 9px 0 0;
    }
  }
  &__select {

  }
  &__list {
    display: flex;
    flex-direction: column;
    margin: 10px 0 0 30px !important;
    &-item {
      border-right: none !important;
      margin: 0 20px 0 0;
      &-x {
        width: 8px;
        height: 8px;
        display: inline-block;
        margin: 0 7px 0 0;
        cursor: pointer;
      }
    }
  }
}
.b-before-time {
  margin: 18px 0 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
  & > svg {
    margin: 0 8px 0 0;
  }
}
</style>