import React, { lazy, Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import BaseSpin from "../components/BaseSpin/BaseSpin";
// import Demo from "../pages/Demo/Demo";
const Demo = lazy(() => import("../pages/Demo/Demo"));
// import CssIndex from "../pages/CSSAbout/CssIndex";
const CssIndex = lazy(() => import("../pages/CSSAbout/CssIndex"));
// import MyEcharts from "../pages/Demo/compontent/MyEcharts";
const MyEcharts = lazy(() => import("../pages/Demo/compontent/MyEcharts"));
// import loading from "../assets/imgs/日历1.png";
// const loading = require("../assets/imgs/loading.gif");
const Sunburst = lazy(() => import("../pages/Demo/compontent/Sunburst"));
const Pie = lazy(() => import("../pages/Demo/compontent/Pie"));
const Graph = lazy(() => import("../pages/Demo/compontent/Graph"));
const LittleGame = lazy(() => import("../pages/LittleGame/LittleGame"));
const Iframe = lazy(() => import("../pages/Iframe/Iframe"));

let routerData = [
  {
    path:'/',
    component: Demo
  },
  {
    path:'/Demo/MyAntd',
    component: Demo
  },
  {
    path:'/Demo/radar',
    component: MyEcharts
  },
  {
    path:'/Demo/sunburst',
    component: Sunburst
  },
  {
    path:'/Demo/Pie',
    component: Pie
  },
  {
    path:'/Demo/graph',
    component: Graph
  },
  {
    path:'/CSS/CssIndex',
    component: CssIndex
  },
  {
    path:'/LittleGame/compute24',
    component: LittleGame
  },
  {
    path:'/iframe',
    component: Iframe
  }
];

function SubRoute() {
  return (
      <Switch>
      {
        routerData.map((e,i)=>{
          return <Route exact path={e.path} component={WaitingCompontent(e.component)} key={i}/>
        })
      }
      </Switch>
  )
}

function WaitingCompontent(WarpComponent) {
  return props => {
    return (
      // <Suspense fallback={<img src={loading} alt="" className="page-loading" />}>
      <Suspense fallback={<BaseSpin/>}>
        <WarpComponent {...props} />
      </Suspense>
    )
  }
}

export {
  SubRoute,
  routerData
};