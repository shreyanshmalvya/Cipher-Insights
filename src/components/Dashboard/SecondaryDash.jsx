import { Card, Title, Text, Tab, TabList, Grid, Col, Flex } from "@tremor/react";
import TableChart from "../charts/TableChart";


import { useState } from "react";

export default function SecondaryDash() {
    return (
        <>
            <div className="mt-6">
                <Card>
                    <TableChart />
                </Card>
            </div>
        </>
    );
}