import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SalesDataPoint, ChartDimensions } from '../../types/charts';

interface LineChartProps {
  data: SalesDataPoint[];
  dimensions: ChartDimensions;
  color?: string;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  dimensions,
  color = '#1976d2'
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    const { width, height, margin } = dimensions;
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Clear previous content
    svg.selectAll('*').remove();

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)) as [Date, Date])
      .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .range([chartHeight, 0]);

    const line = d3.line<SalesDataPoint>()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScale(d.value));

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale));

    g.append('g')
      .call(d3.axisLeft(yScale));

    // Add line
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add dots
    g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(new Date(d.date)))
      .attr('cy', d => yScale(d.value))
      .attr('r', 4)
      .attr('fill', color);

  }, [data, dimensions, color]);

  return (
    <svg
      ref={svgRef}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
};

export default LineChart;
