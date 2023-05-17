import {
    Button,
    Card,
    Callout,
    Flex,
    Tab,
    TabList,
    Text,
    Metric,
    Legend,
    LineChart,
} from "@tremor/react";

import {
    ArrowNarrowRightIcon,
    TrendingUpIcon,
    TrendingDownIcon,
} from "@heroicons/react/solid";
import { useState } from "react";



const sales = [
    {
        hour: "00:00",
        today: 90,
        average: 66,
        yesterday: 23,
    },
    {
        hour: "02:00",
        today: 45,
        average: 40,
        yesterday: 32,
    },
    {
        hour: "04:00",
        today: 68,
        average: 55,
        yesterday: 29,
    },
    {
        hour: "06:00",
        today: 73,
        average: 83,
        yesterday: 68,
    },
    {
        hour: "08:00",
        today: 79,
        average: 102,
        yesterday: 43,
    },
    {
        hour: "10:00",
        today: 70,
        average: 75,
        yesterday: 39,
    },
    {
        hour: "12:00",
        today: 50,
        average: 20,
        yesterday: 34,
    },
    {
        hour: "14:00",
        today: 81,
        average: 66,
        yesterday: 59,
    },
    {
        hour: "16:00",
        today: 90,
        average: 92,
        yesterday: 78,
    },
    {
        hour: "18:00",
        today: 101,
        average: 88,
        yesterday: 65,
    },
    {
        hour: "20:00",
        today: 50,
        average: 63,
        yesterday: 34,
    },
    {
        hour: "22:00",
        today: 35,
        average: 25,
        yesterday: 21,
    },
    {
        hour: "23:59",
        today: 43,
        average: 23,
        yesterday: 12,
    },
];

const valueFormatter = (number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export default function Example() {
    const [selectedComparison, setSelectedComparison] = useState("average");
    return (
        <Card className="max-w-md mx-auto">
            <Text>Today's Sales</Text>
            <Metric className="mt-1">$ 276</Metric>
            <TabList
                defaultValue="average"
                onValueChange={(value) => setSelectedComparison(value)}
                className="mt-6"
            >
                <Tab value="average" text="vs. peer average" />
                <Tab value="yesterday" text="vs. yesterday" />
            </TabList>
            {selectedComparison === "average" ? (
                <>
                    <LineChart
                        className="mt-4 h-56"
                        data={sales}
                        index="hour"
                        categories={["today", "average"]}
                        colors={["blue", "slate"]}
                        showYAxis={false}
                        showLegend={false}
                        valueFormatter={valueFormatter}
                        showAnimation={true}
                    />
                    <Flex justifyContent="end">
                        <Legend
                            categories={["Today", "Peer average"]}
                            colors={["blue", "slate"]}
                            className="mt-3"
                        />
                    </Flex>
                    <Callout
                        title="7.8% above peer average"
                        icon={TrendingUpIcon}
                        color="emerald"
                        className="mt-4"
                    >
                        Today's sales currently outperform the sales average of all peer
                        products in North West region
                    </Callout>
                </>
            ) : (
                <>
                    <LineChart
                        className="mt-4 h-56"
                        data={sales}
                        index="hour"
                        categories={["today", "yesterday"]}
                        colors={["blue", "slate"]}
                        showYAxis={false}
                        showLegend={false}
                        valueFormatter={valueFormatter}
                        showAnimation={true}
                    />
                    <Flex justifyContent="end">
                        <Legend
                            categories={["Today", "Yesterday"]}
                            colors={["blue", "slate"]}
                            className="mt-3"
                        />
                    </Flex>
                    <Callout
                        title="-14.8% below yesterday"
                        icon={TrendingDownIcon}
                        color="rose"
                        className="mt-4"
                    >
                        Today's sales underperform the sales yesterday.
                    </Callout>
                </>
            )}
            <Button
                size="sm"
                variant="light"
                icon={ArrowNarrowRightIcon}
                iconPosition="right"
                color="slate"
                className="mt-5"
            >
                View details
            </Button>
        </Card>
    );
}
