import { Card, List, ListItem, Title } from "@tremor/react";
import { useEffect, useState } from "react";

function ListTable() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:5000/crimes/active");
            const res = await response.json();
            setData(res);
            setIsLoaded(true);
        };
        fetchData();
    }, []);

    return (
        isLoaded &&
        <Card>
            <Title>Currently Active Cases</Title>
            <List className="text-base py-2 justify-around" >
                {data?.map((item) => (
                    <ListItem key={item.city}>
                        <span>{item.city}</span>
                        <span>{item.count}</span>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export default ListTable;