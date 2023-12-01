import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

interface ChartGraphProps {
    graphDate:any;
    orderValue:any;
}

export function ChartGraph({ graphDate, orderValue }:ChartGraphProps) {
    
    const options:ApexCharts.ApexOptions | undefined = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false
            },
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories:graphDate,
        },
        tooltip: {
            enabled:true,
            followCursor:true,
            fillSeriesColor:true,
        },
        dataLabels: {
            enabled:false,
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        colors:["#22c55e"],
    }
    
    const series = [
        {
            name: "Gasto",
            data: orderValue,
        }
      ]

    return (
        <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height={320}
    />
    )
}