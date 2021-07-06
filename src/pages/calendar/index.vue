<template>
  <v-row class="fill-height">
    <!-- <v-col
      lg="4"
      sm="12"
      md="12"
        >
      <v-row justify="center">
      <v-date-picker
        v-model="date"
        :allowed-dates="allowedDates"
        class="mt-4"
        min="2021-01-01"
        max="2021-12-31"
        locale="pt-BR"
       
        @change="handleSelectDay"
      ></v-date-picker>
    </v-row>
    </v-col> -->
    <v-col>
      <v-sheet height="64">
        <v-toolbar text>
          <!-- <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Hoje
          </v-btn> -->
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Dia</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mês</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 Dias</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-spacer></v-spacer>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar" class="titulo-calendario">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>

          <v-spacer></v-spacer>
          <v-btn outlined class="mr-4" color="grey darken-2">
            <v-icon small> mdi-help </v-icon>
          </v-btn>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          first-time="8"
          interval-minutes="45"
          locale="pt-BR"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" text>
            <v-toolbar :color="selectedEvent.color" dark>
              <!-- <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn> -->
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <!-- <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>-->
               <v-spacer></v-spacer>
              <!-- <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>  -->
              <Menu @acao1="handleAcao1"/>
            </v-toolbar>
            <v-card-text>
              <span>{{ toDate }}</span>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed color="error" @click="selectedOpen = false">
                DESMARCAR
              </v-btn>
              <v-btn depressed color="secondary" @click="selectedOpen = false">
                INICIAR
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
    <div class="position-fixed">
      <v-fab-transition>
        <v-btn v-show="true" color="error" dark @click="openCalendarDialog">
          MARCAR CONSULTA
        </v-btn>
      </v-fab-transition>
    </div>

    <!-- <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-text-field label="File name"></v-text-field>

          <small class="grey--text">* This doesn't actually save.</small>
        </v-card-text>

        <v-card-actions>
          

          <v-btn text color="primary" @click="dialog = false"> DESMARCAR </v-btn>
          <v-btn text color="primary" @click="dialog = false"> INICIAR </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <v-dialog v-model="dialog" max-width="320px">
      <v-card>
        <v-card-text>
          <v-date-picker
            v-model="date"
            :allowed-dates="allowedDates"
            class="pt-4"
            min="2021-01-01"
            max="2021-12-31"
            locale="pt-BR"
            full-width
          >
          </v-date-picker>
        </v-card-text>

        <v-card-actions>
          <v-combobox
            v-model="time"
            :items="items"
            label="Horários"
            outlined
            dense
          ></v-combobox>
        </v-card-actions>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="closeCalendarDialog"
            >Cancelar</v-btn
          >
          <v-btn
            text
            color="primary"
            @click="save(time)"
            :disabled="disabledBtnMarcar"
            >MARCAR</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <v-dialog
      ref="dialogtime"
      v-model="modal2"
      :return-value.sync="time"
      persistent
      width="290px"
    >
      <v-time-picker
        v-if="modal2"
        v-model="time"
         format="24hr"
        :allowed-hours="allowedHours"
        :allowed-minutes="allowedMinutes"
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal2 = false">Cancelar</v-btn>
        <v-btn text color="primary" @click="save(time)">OK</v-btn>
      </v-time-picker>
    </v-dialog> -->
  </v-row>
</template>
<script>
import Menu from "./components/menu"
import moment from "moment";
moment.locale("pt-br");
export default {
  components: {
    Menu: Menu
  },
  data: () => ({
    focus: "",
    type: "week",
    typeToLabel: {
      month: "Mês",
      week: "Semana",
      day: "Dia",
      "4day": "4 Dias",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    dialog: false,
    date: new Date(),
    time: "11:15",
    timeStep: "10:10",
    modal2: false,
    intervalo: 45,
    items: ["08:00", "08:45", "09:30"],
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },

  methods: {
    allowedDates: (val) => parseInt(val.split("-")[2], 10) % 2 === 0,
    allowedHours: (v) => v % 2,
    allowedMinutes: (v) => v >= 10 && v <= 50,
    allowedStep: (m) => m % 10 === 0,
    handleSelectDay() {
      this.modal2 = true;
    },
    openCalendarDialog() {
      this.time = "";
      this.date = "";
      this.dialog = true;
    },
    closeCalendarDialog() {
      this.time = "";
      this.date = "";
      this.dialog = false;
    },
    save(time) {
      if (!this.time || !this.date) return;
      this.dialog = false;
      console.log(typeof this.date, time);
      const date = this.date.split("-");
      const hora = time.split(":");
      const selectDate = new Date(
        parseInt(date[0]),
        parseInt(date[1]) - 1,
        parseInt(date[2]),
        parseInt(hora[0]),
        parseInt(hora[1])
      ).getTime();

      const event = {
        name: `MARCELO #${this.events.length}`,
        start: selectDate,
        end: new Date(selectDate + this.intervalo * 60 * 1000).getTime(),
        color: this.colors[0],
        timed: true,
      };

      this.$nextTick(function () {
        this.events.push(event);
      });
    },
    handleAcao1(){
      console.log('acao 1')
      this.selectedOpen = false
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      console.log("showEvent");
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange() {
      console.log("updateRange");
      const events = [];
      events.push({
        name: "MARCELO",
        start: new Date(2021, 6, 5, 8, 0).getTime(),
        end: new Date(2021, 6, 5, 8, 45).getTime(),
        color: this.colors[0],
        timed: true,
      });

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    startTime(tms) {
      const intervalo = 45;

      console.log(tms);
      const mouse = this.toTime(tms);

      // if (this.dragEvent && this.dragTime === null) {
      //   const start = this.dragEvent.start

      //   this.dragTime = mouse - start
      // } else {
      const end = new Date(mouse + intervalo * 60 * 1000);
      this.createStart = this.roundTime(mouse);
      this.createEvent = {
        name: `Event #${this.events.length}`,
        color: this.rndElement(this.colors),
        start: this.createStart,
        end: end,
        timed: true,
      };

      this.events.push(this.createEvent);
      // }
    },
    rndElement(arr) {
      return arr[this.rnd(0, arr.length - 1)];
    },
    roundTime(time, down = true) {
      const roundTo = 60; // minutes
      const roundDownTime = roundTo * 60 * 1000;

      return down
        ? time - (time % roundDownTime)
        : time + (roundDownTime - (time % roundDownTime));
    },
    toTime(tms) {
      return new Date(
        tms.year,
        tms.month - 1,
        tms.day,
        tms.hour,
        tms.minute
      ).getTime();
    },
  },
  computed: {
    toDate() {
      return this.selectedEvent && this.selectedEvent.start
        ? moment(this.selectedEvent.start).format(
            "DD/MM/YYYY - dddd, [as] hh:mm[h]"
          )
        : "";
    },
    disabledBtnMarcar() {
      return !this.time || !this.date;
    },
  },
};
</script>
<style scoped>
.position-fixed {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 50;
  padding: 40px;
}
.titulo-calendario {
  color: #006e91;
  font-weight: bold;
}
</style>