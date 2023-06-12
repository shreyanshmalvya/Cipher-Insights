import { Card, Title, BarChart, Subtitle } from "@tremor/react";
import { useState, useEffect } from "react";

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

function BarComparativeChart() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${import.meta.env.VITE_DB_URL}/categories/top7`);
            const res = await response.json();
            setData(res);
            setIsLoaded(true);
        };
        fetchData();
    }, []);

    return (
        isLoaded &&
        <Card className="min-w-fit">
            <Title>Top Crime Categories in India in Past 12 months</Title>
            <Subtitle>
                Categorized representation of the crimes in India based on severity and their impact on the city under observation.
            </Subtitle>
            <BarChart
                className="mt-6"
                data={data}
                index="category"
                categories={['totalFrequency']}
                colors={["blue"]}
                layout={'horizontal'}
                valueFormatter={yAxisValueFormatter}
                yAxisWidth={48}
            />
        </Card>
    )
}

export default BarComparativeChart