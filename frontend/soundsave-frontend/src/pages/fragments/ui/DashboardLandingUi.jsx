import { SimpleGauge } from "react-gauges";
import ReactPlayer from "react-player";
import { Chart } from "react-google-charts";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useRouteProtect from "../../../hooks/useRouteProtect";
import playedsong from "../../../assets/playedsong.jpg";
import { dashboardData } from "../../../data";
import singernobg from "../../../assets/singernobg.png";

export default function DashboardLandingUi() {
  const { auth, setAuth } = useOutletContext();
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);

  console.log(auth);

  // useEffect(() => {
  //   const protector = () => {
  //     console.log(auth?.accessToken);
  //     if (typeof auth?.accessToken === "undefined") {
  //       navigate("/login");
  //     } else {
  //       setIsAllowed(true);
  //     }
  //   };

  //   protector();
  // }, []);

  useRouteProtect(auth?.accessToken, setIsAllowed);

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
    <main className="w-full  min-h-screen bg-[#201f1fde] p-2   text-white  grid  sm:grid-cols-2   place-content-center  ">
      <section
        className="w-full  min-h-[5rem]  p-2  mb-1  flex justify-center  items-center  bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: `url(${playedsong})` }}
      >
        <ul className="  w-[90%] mx-auto grid grid-cols-1 gap-2 md:grid-cols-2    text-[0.8rem]">
          {dashboardData.map((data) => (
            <li
              key={data.id}
              className=" min-w-[70%]   flex  min-h-[4rem]  justify-around  bg-blue-500  rounded-md   items-center p-2 "
            >
              <div className="flex justify-center  text-[1.5rem]  items-center">
                {data.icon}
              </div>
              <div className=" flex flex-col gap-4   p-2 justify-around  items-center ">
                <h4 className="text-[1.1rem] font-bold tracking-wide">
                  {data.head}
                </h4>{" "}
                <p>{data.subHead}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="w-[80%]  mx-auto  p-3     flex  flex-col gsp-4 justify-center  items-center">
        <h4 className="my-[2rem]">Song Upload Tracker </h4>
        <SimpleGauge value={35} maxLimit={100} style={{ color: "black" }} />
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
      <section className="w-full flex flex-col justify-center  items-center  ">
        <Chart
          chartType="PieChart"
          data={pieChartData}
          options={pieChartOptions}
          width={"100%"}
          height={"200px"}
        />
        <div className="w-full    h-[50%]  bg-black  mb-[4rem]  md:mb-0  md:p-5">
          <img src={singernobg} alt="singer" className="w-full h-full" />
        </div>
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

  return isAllowed === true && content;
}

// LINKS TO CHART TEMPLATE SETUP

// https://codesandbox.io/s/github/RakanNimer/react-google-charts/tree/master/sandboxes/combo-chart/default?from-embed=&file=/App.tsx:85-649
