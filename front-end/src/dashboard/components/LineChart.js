import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data, width = 600, height = 400, margin = 40 }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)))
      .range([margin, width - margin]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height - margin, margin]);

    const line = d3.line()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin})`)
      .call(xAxis);

    svg.append("g")
      .attr("transform", `translate(${margin},0)`)
      .call(yAxis);

    // Add the line path
    const path = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "var(--primary-color)")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Animation
    const pathLength = path.node().getTotalLength();
    path
      .attr("stroke-dasharray", pathLength)
      .attr("stroke-dashoffset", pathLength)
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0);

    // Add dots
    svg.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(new Date(d.date)))
      .attr("cy", d => yScale(d.value))
      .attr("r", 0)
      .attr("fill", "var(--primary-color)")
      .transition()
      .delay((d, i) => i * 100)
      .attr("r", 4);

  }, [data, width, height, margin]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
