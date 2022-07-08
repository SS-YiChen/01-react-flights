import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

function echartInit(node, xData, sData, title) {
    const myChart = echarts.init(node)
    // Draw the chart
    myChart.setOption({
        title: {
            text: title
        },
        tooltip: {},
        xAxis: {
            data: xData
        },
        yAxis: {},
        series: [
            {
                name: 'Rate',
                type: 'bar',
                data: sData
            }
        ]
    })
}

function Bar({ style, xData, sData, title }) {
    // only render static data now
    // define function
    const nodeRef = useRef(null)
    useEffect(() => {
        echartInit(nodeRef.current, xData, sData, title)
    }, [xData, sData])

    return (
        <div ref={nodeRef} style={style}></div>
    )
}

export default Bar