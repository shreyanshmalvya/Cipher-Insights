import { Card, Title, DonutChart} from "@tremor/react";
import { useEffect, useState } from "react";


const valueFormatter = (number) =>
    `${Intl.NumberFormat("us").format(number).toString()} crimes`;

export default function Example() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:5000/cities/top5");
            const data = await response.json();
            setData(data.top5);
        };
        fetchData();
    }, []);

    console.log(data)

    return (
        <Card className="max-w-lg">
            <Title>City Wise Crime Distribution</Title>
            <DonutChart
                className="mt-6"
                data={data || cities}
                category="totalFrequency"
                index="city"
                valueFormatter={valueFormatter}
                colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
            />
            <Title className="mt-6 text-gray-400" >Based on the above data <i>{data[0].city}</i> is highest in crime frequency</Title>
        </Card>
    ); x
}