import {
    Card,
    Title,
    Text,
    Flex,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    Badge,
    Button,
} from "@tremor/react";
import { useState, useEffect } from "react";

const colors = {
    "In Progess": "rose",
    "Resolved": "emerald",
};


export default function TableChart() {

    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${import.meta.env.VITE_DB_URL}/crimes/`);
            const res = await response.json();
            setData(res);
            setIsLoaded(true);
        };
        fetchData();
    }, []);

    return (
        !isLoaded ? <>Loading...</> :
            <Card>
                <Flex justifyContent="start" className="space-x-2">
                    <Title>Crimes</Title>
                    <Badge color="gray">{data.totalFrequency}</Badge>
                </Flex>
                <Text className="mt-2">Overview of this years crime frequency</Text>

                <Table className="mt-6">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Transaction ID</TableHeaderCell>
                            <TableHeaderCell>City</TableHeaderCell>
                            <TableHeaderCell>Category</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                            <TableHeaderCell>Link</TableHeaderCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.crimeTransactions.map((item) => (
                            <TableRow key={item.transactionId}>
                                <TableCell>{item.transactionId}</TableCell>
                                <TableCell>{item.city}</TableCell>
                                <TableCell>{item.crime}</TableCell>
                                <TableCell>
                                    <Badge color={colors[item.resolved]} size="xs">
                                        {item.resolved}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button size="xs" variant="secondary" color="gray">
                                        See details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
    );
}