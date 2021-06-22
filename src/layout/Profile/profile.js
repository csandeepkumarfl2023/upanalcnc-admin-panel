import React from 'react'
import PieChart from '../Charts/PmChart'

export default function Profile() {

    const [data, setData] = React.useState([{ label: 'Apples', value: 10 }, { label: 'Oranges', value: 20 }, { label: 'mangoes', value: 20 }])
    return (
        <div>
            <PieChart data={data} innerRadius="100" outerRadius="180" />
        </div>
    )
}
