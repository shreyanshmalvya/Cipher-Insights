import { Card, Title, Text, Tab, TabList, Grid, Flex, Col } from "@tremor/react";

import { useEffect, useState } from "react";
import ActiveUserChart from "../charts/ActiveUserChart";
import InfoCard from "../charts/InfoCard";
import SourcesBarChart from "../charts/SourcesBarChart";
import PieChart from "../charts/DonughtChart";
import ListTable from "../charts/ListTable";
import BarComparativeChart from "../charts/BarComparativeChart";

export default function PrimaryDash() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [totalCrime, setTotalCrime] = useState({
        "city": "",
        "totalFrequency": "",
        "percentage": 1
    });
    const [highestCrime, setHighestCrime] = useState({ "city": "", "totalFrequency": "", "percentage": 1 });
    const [highestCategory, setHighestCategory] = useState({
        "highestCategory": "",
        "percentageChange": 1
    });

    //fetch data from api
    const fetchTotalCrime = async () => {
        const response = await fetch("http://localhost:5000/crimes/total");
        const data = await response.json();
        setTotalCrime(data);
    };

    const highestFrequency = async () => {
        const response = await fetch("http://localhost:5000/cities/highestCrime");
        const data = await response.json();
        setHighestCrime(data.highestCity);
    };

    const highestCrimeCategory = async () => {
        const response = await fetch("http://localhost:5000/categories/highestCrime");
        const data = await response.json();
        setHighestCategory(data);
    };

    const ical = async () => {
        await fetchTotalCrime();
        await highestFrequency();
        await highestCrimeCategory();
        setIsLoaded(true);
    }

    console.log(totalCrime, highestCrime, highestCategory)

    useEffect(() => {
        ical();
    }, []);

    return (
        isLoaded &&
        <>
            <Grid numColsMd={3} numColsLg={3} className="gap-6 mt-6">
                <InfoCard Title="Crimes in Past Week" MetricData={totalCrime?.lastWeekCount} MetricPrev={totalCrime?.totalCount} Delta={totalCrime?.changeCategory} DeltaVal={`${totalCrime?.percentageChange}%`} />
                <InfoCard Title="City with Highest Crime" MetricData={highestCrime?.totalFrequency} MetricPrev={highestCrime?.city} Delta={highestCrime?.changeCategory} DeltaVal={`${highestCrime?.percentageChange}%`} />
                <InfoCard Title="Highest Crime Category" MetricData={highestCategory?.highestFrequency} MetricPrev={highestCategory?.highestCategory} Delta={highestCategory?.changeCategory} DeltaVal={`${highestCategory?.percentageChange}%`} />
            </Grid>
            <Grid numColsMd={4} numColsLg={4} className="gap-6 mt-6 w-full">
                <Col numColSpan={3} numColSpanLg={3}>
                    <ActiveUserChart />
                </Col>
                <div className="flex">
                    <PieChart />
                </div>
            </Grid>
            <Grid numColsMd={4} numColsLg={4} className="gap-6 mt-6 w-full">
                <Col numColSpan={3} numColSpanLg={3}>
                    <BarComparativeChart />
                </Col>
                <div className="flex">
                    <ListTable />
                </div>
            </Grid>
        </>
    );
}