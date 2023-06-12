import { Card, Title, AreaChart } from "@tremor/react";
import React, { useEffect, useState } from "react";


const yAxisValueFormatter = (value) => {
    // Parse the value as a number
    const count = parseInt(value);

    // Format the count based on its magnitude
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    } else {
        return value;
    }
};

function ActiveUserChart() {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [data, setData] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${import.meta.env.VITE_DB_URL}/crimes/crimes-by-month`);
            const res = await response.json();
            setData(res);
            setIsLoaded(true);
        };
        fetchData();
    }, []);

    return (
        isLoaded &&
        <Card>
            <Title>Comprehensive 12-Month Crime Frequency Analysis</Title>
            <AreaChart
                className="h-72 mt-4"
                data={data}
                index="date"
                categories={["Current_Year", "Previous_Year"]}
                colors={["indigo", "cyan"]}
                valueFormatter={yAxisValueFormatter}
            />
        </Card>
    )
}

export default ActiveUserChart;