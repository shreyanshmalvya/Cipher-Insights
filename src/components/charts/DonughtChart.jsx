import { Card, Title, DonutChart} from "@tremor/react";
import { useEffect, useState } from "react";


const valueFormatter = (number) =>
    `${Intl.NumberFormat("us").format(number).toString()} crimes`;

export default function Example() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${import.meta.env.VITE_DB_URL}/cities/top5`);
            const res = await response.json();
            setData(res.top5);
            setIsLoaded(true);
        };
        fetchData();
    }, []);


    return (
        isLoaded &&
        <Card className="max-w-lg">
            <Title>City Wise Crime Distribution</Title>
            <DonutChart
                className="mt-6"
                data={data}
                category="totalFrequency"
                index="city"
                valueFormatter={valueFormatter}
                colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
            />
            <Title className="mt-6 text-gray-400" >Based on the above data <i>{data[0].city}</i> is highest in crime frequency</Title>
        </Card>
    ); x
}