import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ProductPerformance, ChartDimensions } from '../../types/charts';

interface BarChartProps {
  data: ProductPerformance[];
  dimensions: ChartDimensions;
  color?: string;
}

const BarChart: React.FC<BarChartProps> = ({ 
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

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, chartWidth])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.sales) || 0])
      .range([chartHeight, 0]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    g.append('g')
      .call(d3.axisLeft(yScale));

    // Add bars
    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.name) || 0)
      .attr('y', d => yScale(d.sales))
      .attr('width', xScale.bandwidth())
      .attr('height', d => chartHeight - yScale(d.sales))
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

export default BarChart;
