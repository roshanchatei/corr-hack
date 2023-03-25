import {Box, Container, Grid} from "@mui/material";
import { ResponsiveBar } from '@nivo/bar'
import {useEffect, useState} from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const Index = () => {

    const [response, setResponse] = useState({});
    // const [stringData, setResponse] = useState({});

    useEffect(() => {
        fetch("http://localhost:8080/upload")
            .then((response) => response.json())
            .then((res) => {setResponse(res)})
            .catch((error) => console.log(error));


        // let myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        //
        // let raw = JSON.stringify({
        //     "modeler_id": "123"
        // });
        //
        // let requestOptions = {
        //     method: 'GET',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };
        //
        // fetch("http://localhost:8080/static-data", requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
    }, []);

    // useEffect(() => {
    //     console.log(response)
    // }, [response])

    function generatePdfAndDownload() {
        const input = document.getElementById('pdf-content');
        html2canvas(input, { scale: 1 }).then(canvas => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.addImage(imgData, "JPEG", 0, 0, 211, 298);
            pdf.save('download')
        });
    }



    const data = [
        {
            "monthly_salary": "10,000 - 50,000",
            "current": 31,
            "previous": 97,
        },
        {
            "monthly_salary": "50,000 - 100,000",
            "current": 57,
            "previous": 175,
        },
    ]

    const arrangeData = (data) => {
        if(data){
            let data1 = data.slice(0, 9);
            let data2 = data.slice(10, 19);
            // console.log(data1, data2)

            const newData = []
            for(let i = 0; i < data1.length; i++){
                newData.push({
                    "monthly_salary": data[i].monthly_salary,
                    "current": data[i].fico,
                    "previous": data[i].fico,
                })
            }

            console.log(newData)
            return newData
        }
    }

    arrangeData(response?.file_data_curr)


    return (
        <>
            <button onClick={generatePdfAndDownload}>Generate PDF</button>
            <Box width={'100%'} id="pdf-content">
                <Container maxWidth={'md'}>
                    <Box color={'#006ff8'} fontSize={'24px'} fontWeight={700} mb={2}>
                        Vintage Selection
                    </Box>
                    <Box ml={2} mb={5}>
                        The model Risk Score shows incremental model performance compared to other
                        benchmarks. While there is no direct benchmark available for the CLD model
                        since it’s a bespoke score, it is still compared to the other scores, since they are
                        being used in the current CLD policy.
                        Below charts provide the overall performance comparison of CLD model with
                        other benchmarks. (‘Current’ here refers to the current XGBoost model)
                    </Box>

                    <Grid container>
                        <Grid item xs={12}>
                            <Box height={'400px'} mb={6}>
                                <MyResponsiveBar data={data}/>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box height={'400px'} mb={6}>
                                <MyResponsiveBar data={data}/>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box height={'400px'} mb={6}>
                                <MyResponsiveBar data={data}/>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box height={'400px'} mb={6}>
                                <MyResponsiveBar data={data}/>
                            </Box>
                        </Grid>
                    </Grid>

                </Container>
            </Box>
        </>
    );
};


const MyResponsiveBar = ({ data }) => {


    return (
        <ResponsiveBar
            data={data}
            keys={[
                'current',
                'previous',
            ]}
            indexBy="monthly_salary"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            groupMode="grouped"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'monthly_salary',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'fico',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            // barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
        />
    );
}

export default Index;
Index.layout = null;
Index.title = "Result";
