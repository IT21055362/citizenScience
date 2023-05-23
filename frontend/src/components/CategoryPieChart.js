import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

function CategoryPieChart() {

  // * -------------------------------------------------------------------- Pie Chart Functions --------------------------------------------------------------------

  const COLORS = ["#F96666", "#41AF6C"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // * -------------------------------------------------------------------- Pie Chart Functions --------------------------------------------------------------------

  const [categoryData, setCategory] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const getSupCategories = async () => {
      const response = await fetch('api/Reports/chart/category-data');
      const json = await response.json();

      if (response.ok) {
        setCategory(json);
      }

      if (!response.ok) {
        setError(json.error);
        console.log(error);
      }
    };

    getSupCategories();
  }, [error]);



  return (
    <>
      <h1>Category</h1>

      <div style={{marginLeft:"auto", marginRight:"auto" }}>
        <PieChart width={450} height={450}>
          <Pie
            data={categoryData}
            cx={200}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={200}
            fill="#8884d8"
            dataKey="count"
          >
            {categoryData && categoryData.map((entry, index) =>
              <Cell key={"typeOfLitter"} fill={entry._id ? "#41AF6C" : "#F96666"} />
            )}
          </Pie>
        </PieChart>
      </div>


      <div style={{ color: "#41AF6C" }}>
        <i className="bi bi-square-fill"></i> Dead Animal
      </div>

      <div style={{ color: "#F96666" }}>
        <i className="bi bi-square-fill"></i> Litter
      </div>
    </>
  );
}

export default CategoryPieChart;


