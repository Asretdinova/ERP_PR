<template>
<ul class="vuejs-countdown" v-if="days+hours+minutes+seconds > 0 && !is_overdue && status != 3">
  <li v-if="days > 0">
    <p class="digit">{{ days | twoDigits }}</p>
    <p class="text">{{ days > 1 ? $t('message.days') : $t('message.day') }}</p>
  </li>
  <li>
    <p class="digit">{{ hours | twoDigits }}</p>
    <p class="text">{{ hours > 1 ? $t('message.hours')  : $t('message.hour') }}</p>
  </li>
  <li>
    <p class="digit">{{ minutes | twoDigits }}</p>
    <p class="text">{{$t('message.min')}}</p>
  </li>
  <li>
    <p class="digit">{{ seconds | twoDigits }}</p>
    <p class="text">{{$t('message.sec')}}</p>
  </li>
</ul>
<div v-else-if="is_overdue && status!=3"><span class="badge badge-pill badge-danger expired_date">{{$t('message.expired')}}</span></div>
<div v-else-if="!is_overdue && status===3"><span class="badge badge-pill badge-success expired_date">{{$t('message.closed')}}</span></div>
<div v-else-if="is_overdue && status===3"><span class="badge badge-pill badge-warning expired_date">{{$t('message.closed_overdue')}}</span></div>
</template>

<script>
let interval = null;
export default {
  name: 'vuejsCountDown',
  props: {
    deadline: {
      type: String
    },
    end: {
      type: String
    },
    stop: {
      type: Boolean
    },
    is_overdue: {
      type: Boolean
    },
    status: {
      type: Number
    }
  },
  data() {
    return {
      now: Math.trunc((new Date()).getTime() / 1000),
      date: null,
      diff: 0
    }
  },
  created() {
    if (!this.deadline && !this.end) {
      throw new Error("Missing props 'deadline' or 'end'");
    }
    let endTime = this.deadline ? this.deadline : this.end;
    this.date = Math.trunc(Date.parse(endTime) / 1000);
    if (!this.date) {
      throw new Error("Invalid props value, correct the 'deadline' or 'end'");
    }
    interval = setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000);
    }, 1000);
  },
  computed: {
    seconds() {
      return Math.trunc(this.diff) % 60
    },
    minutes() {
      return Math.trunc(this.diff / 60) % 60
    },
    hours() {
      return Math.trunc(this.diff / 60 / 60) % 24
    },
    days() {
      return Math.trunc(this.diff / 60 / 60 / 24)
    }
  },
  watch: {
    now(value) {
      this.diff = this.date - this.now;
      if (this.diff <= 0 || this.stop) {
        this.diff = 0;
        // Remove interval
        clearInterval(interval);
      }
    }
  },
  filters: {
    twoDigits(value) {
      if (value.toString().length <= 1) {
        return '0' + value.toString()
      }
      return value.toString()
    }
  },
  destroyed() {
    clearInterval(interval);
  }
}
</script>

<style>
.vuejs-countdown {
  padding: 0;
  margin: 0;
}

.vuejs-countdown li {
  display: inline-block;
  margin: 0 8px;
  text-align: center;
  position: relative;
}

.vuejs-countdown li p {
  margin: 0;
}

.vuejs-countdown li:after {
  content: ":";
  position: absolute;
  top: 0;
  right: -13px;
  font-size: 32px;
}

.vuejs-countdown li:first-of-type {
  margin-left: 0;
}

.vuejs-countdown li:last-of-type {
  margin-right: 0;
}

.vuejs-countdown li:last-of-type:after {
  content: "";
}

.vuejs-countdown .digit {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0;
  background: #00816A;
  color: white;
  border: 1px solid;
  padding: 3px;
  border-radius: 6.25px;
}

.vuejs-countdown .text {
  text-transform: uppercase;
  margin-bottom: 0;
  font-size: 10px;
}

.expired_date {
  font-size: 14px
}
</style>
