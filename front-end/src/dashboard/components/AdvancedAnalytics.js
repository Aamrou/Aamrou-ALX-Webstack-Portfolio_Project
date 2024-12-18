import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const AdvancedAnalytics = ({ quizId }) => {
  const [analytics, setAnalytics] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/quiz/${quizId}/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalytics([
        { label: 'Total Attempts', value: response.data.totalAttempts },
        { label: 'Average Score', value: response.data.averageScore },
      ]);
    };
    fetchAnalytics();
  }, [quizId]);

  useEffect(() => {
    if (analytics.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 400;
    const height = 200;

    const xScale = d3
      .scaleBand()
      .domain(analytics.map((d) => d.label))
      .range([0, width])
      .padding(0.4);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(analytics, (d) => d.value)])
      .range([height, 0]);

    const barGroup = svg
      .attr('width', width)
      .attr('height', height)
      .append('g');

    barGroup
      .selectAll('rect')
      .data(analytics)
      .join('rect')
      .attr('x', (d) => xScale(d.label))
      .attr('y', (d) => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d.value))
      .attr('fill', 'steelblue');

    barGroup
      .append('g')
      .call(d3.axisBottom(xScale))
      .attr('transform', `translate(0, ${height})`);

    barGroup.append('g').call(d3.axisLeft(yScale));
  }, [analytics]);

  return (
    <div>
      <h2>Advanced Analytics</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default AdvancedAnalytics;

