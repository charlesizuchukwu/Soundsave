import { SimpleGauge } from "react-gauges";
import ReactPlayer from "react-player";
import { Chart } from "react-google-charts";

export default function DashboardLandingUi() {
  // COMBOCHART SETTING
  const comboChartData = [
    [
      "Month",
      "Love in the air",
      "tribute to poverty",
      "Rocky love",
      "Heart of a child",
      "Love birds",
      "The lifting hand",
    ],
    ["2024/05", 165, 938, 522, 998, 450, 614.6],
    // ["2005/06", 135, 1120, 599, 1268, 288, 682],
    // ["2006/07", 157, 1167, 587, 807, 397, 623],
    // ["2007/08", 139, 1110, 615, 968, 215, 609.4],
    // ["2008/09", 136, 691, 629, 1026, 366, 569.6],
  ];

  const comboChartOptions = {
    title: "Most streamed songs for the month.",
    vAxis: {
      title: "Song stream",
      textStyle: { color: "white" },
      titleTextStyle: { color: "white" },
    },
    hAxis: {
      title: "Month",
      textStyle: { color: "white" },
      titleTextStyle: { color: "white" },
    },

    seriesType: "bars",
    series: { 5: { type: "line" } },
    backgroundColor: "black",
    legendTextStyle: { color: "white" },

    titleTextStyle: { color: "white", fontSize: 12, wordSpacing: 4 },
  };

  // PIE CHART SETTING
  const pieChartData = [
    ["Artists", "Rate"],
    ["showdy", 11],
    ["Tees", 2],
    ["Roote", 2],
    ["Carter", 2],
    ["Smill", 7],
  ];

  const pieChartOptions = {
    title: "Artist recorgnition chart",
    is3D: true,
    titleTextStyle: { color: "white", fontSize: 12 },
    backgroundColor: "black",
    legendTextStyle: { color: "white" },
  };

  const content = (
    <main className="w-full  min-h-screen bg-black  text-white  grid  sm:grid-cols-2   place-content-center  ">
      <section className="w-full  h-[5rem]  flex justify-center  items-center  ">
        <ul>
          <li>
            Uploaded Songs: <b>50</b>
          </li>
        </ul>
      </section>
      <section className="w-[80%]  mx-auto  p-3     flex justify-center  items-center">
        <SimpleGauge value={50} maxLimit={1000} style={{ color: "white" }} />
      </section>
      <section className="text-white">
        <Chart
          chartType="ComboChart"
          width="100%"
          height="400px"
          data={comboChartData}
          options={comboChartOptions}
        />
      </section>
      <section className="w-full ">
        <Chart
          chartType="PieChart"
          data={pieChartData}
          options={pieChartOptions}
          width={"100%"}
          height={"200px"}
        />
      </section>
      {/* <section className="w-[80%]  mx-auto">
        <ReactPlayer
          controls={true}
          width="200px"
          url="https://music.youtube.com/watch?v=yzlimynH6VQ&list=OLAK5uy_nttQznNM9HQVsrAPFRuO_vo3ZWzgXGAnY"
        />
      </section> */}
    </main>
  );

  return content;
}

// LINKS TO CHART TEMPLATE SETUP

// https://codesandbox.io/s/github/RakanNimer/react-google-charts/tree/master/sandboxes/combo-chart/default?from-embed=&file=/App.tsx:85-649
