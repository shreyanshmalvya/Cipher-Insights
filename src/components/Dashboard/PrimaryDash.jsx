import { Card, Title, Text, Tab, TabList, Grid, Flex, Col } from "@tremor/react";

import { useEffect, useState } from "react";
import ActiveUserChart from "../charts/ActiveUserChart";
import InfoCard from "../charts/InfoCard";
import SourcesBarChart from "../charts/SourcesBarChart";
import PieChart from "../charts/DonughtChart";
import ListTable from "../charts/ListTable";

export default function PrimaryDash() {
    const [totalCrime, setTotalCrime] = useState({});
    const [highestCrime, setHighestCrime] = useState({});
    const [highestCategory, setHighestCategory] = useState({});

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


    useEffect(() => {
        fetchTotalCrime();
        highestFrequency();
        highestCrimeCategory();
    }, []);


    // console.log(totalCrime)
    console.log(highestCrime)


    return (
        <>
            <Grid numColsMd={3} numColsLg={3} className="gap-6 mt-6">
                <InfoCard Title="Crimes in Past Week" MetricData={totalCrime.lastWeekCount} MetricPrev={totalCrime.totalCount} Delta={totalCrime.changeCategory} DeltaVal={`${totalCrime.percentageChange}%`} />
                <InfoCard Title="City with Highest Crime" MetricData={highestCrime.totalFrequency} MetricPrev={highestCrime.city} Delta={highestCrime.changeCategory} DeltaVal={`${highestCrime.percentageChange}%`} />
                <InfoCard Title="Highest Crime Category" MetricData={highestCategory.totalFrequency} MetricPrev={highestCategory.highestCategory} Delta="increase" DeltaVal={`${highestCategory.percentageChange}%`}/>
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
                    <ActiveUserChart />
                </Col>
                <div className="flex">
                    <ListTable />
                </div>
            </Grid>
        </>
    );
}