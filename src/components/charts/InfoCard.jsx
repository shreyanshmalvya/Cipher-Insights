import {
    Card,
    Metric,
    Text,
    Flex,
    BadgeDelta,
    // DeltaType,
    // Color,
    // Grid,
} from "@tremor/react";


const colors = {
    increase: "emerald",
    moderateIncrease: "emerald",
    unchanged: "orange",
    moderateDecrease: "rose",
    decrease: "rose",
};

export default function InfoCard({ Title, MetricData, MetricPrev, Delta, DeltaVal }) {
    return (
        <Card>
            <Text className="mb-2" >{Title}</Text>
            <Flex
                justifyContent="start"
                alignItems="baseline"
                className="truncate space-x-3"
            >
                <Metric>{MetricData}</Metric>
                <Text className="truncate">from {MetricPrev}</Text>
            </Flex>
            <Flex justifyContent="start" className="space-x-2 mt-4">
                <BadgeDelta deltaType={Delta} />
                <Flex justifyContent="start" className="space-x-1 truncate">
                    <Text color={colors[Delta]}>{DeltaVal}</Text>
                    <Text className="truncate"> to previous week </Text>
                </Flex>
            </Flex>
        </Card>
    );
}