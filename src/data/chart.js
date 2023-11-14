var dark_heading = "#c2c6dc";

// start::distributedColumnChart
export const distributedColumnChart = {
  series: [
    {
      name: "Desktops",
      data: [],
    },
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: "bar",
    },
    colors: [
      "#008FFB",
      "#00E396",
      "#FEB019",
      "#FF4560",
      "#775DD0",
      "#546E7A",
      "#26a69a",
      "#D10CE8",
    ],
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
        endingShape: "rounded",
      },
    },
    legend: {
      position: "bottom",
      offsetY: 0,
      // height: 230,
      formatter: function(label, opts) {
        return label + " - " + opts.w.globals.series[0][opts.seriesIndex];
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          colors: [
            "#008FFB",
            "#00E396",
            "#FEB019",
            "#FF4560",
            "#775DD0",
            "#546E7A",
            "#26a69a",
            "#D10CE8",
          ],
          fontSize: "14px",
        },
      },
    },
  },
};

export const simplePie = {
  series: [0, 0],
  chartOptions: {
    legend: {
      position: "bottom",
      offsetY: 0,
      formatter: function(label, opts) {
        return label + " - " + opts.w.globals.series[opts.seriesIndex];
      },
    },
    chart: {
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
        },
        autoSelected: "zoom",
      },
      // events: {
      //   dataPointSelection: function(event, chartContext, config) {
      //     alert("sdasd");
      //     // this.$refs["my-modal"].show();
      //   },
      // },
    },
  },
  labels: [],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

// start::customDataLabelBar
export const customDataLabelBar = {
  series: [
    {
      data: [],
    },
  ],
  chartOptions: {
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
        endingShape: "rounded",
      },
    },
    colors: [
      "#33b2df",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7",
    ],
    dataLabels: {
      enabled: false,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      formatter: function(val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },

    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    // title: {
    //     text: 'Custom DataLabels',
    //     align: 'center',
    //     floating: true
    // },
    // subtitle: {
    //     text: 'Category Names as DataLabels inside bars',
    //     align: 'center',
    // },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function() {
            return "";
          },
        },
      },
    },
  },
};

export const customHorizontalBar = {
  series: [
    {
      data: [1, 2, 3],
    },
  ],
  chartOptions: {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 12,
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    dataLabels: {
      position: "top",
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      formatter: function(val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: false,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    colors: ["#003F87", "#2E37FE", "#22A7F0"],
    xaxis: {
      categories: ["Управление МНО", "Тер. упр", "Рес. упр"],
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function() {
            return "";
          },
        },
      },
    },
  },
};

export const HorizontalBar = {
  series: [
    {
      data: [1, 2, 3],
    },
  ],
  chartOptions: {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 12,
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    dataLabels: {
      position: "top",
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      formatter: function(val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: false,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    colors: ["#003F87", "#2E37FE", "#22A7F0"],
    xaxis: {
      categories: ["Управление МНО", "Тер. упр", "Рес. упр"],
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function() {
            return "";
          },
        },
      },
    },
  },
};
