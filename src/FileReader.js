import React from "react"; 
import { useState} from "react";
import Chart from "react-apexcharts";

function FileReader(){

    const[fileContent, setFileContent] = useState("");
    const[wordCount, setWordCount] = useState({})
    const[options, setOptions] = useState({options: {
        chart: {
          id: "histogram"
        },
        xaxis: {
          categories: []
        },
      },
    });

    const[series, setSeries] = useState([
        {
            name : "Frequency",
            data :[],
        }
    ]);

    const handleSubmit = (event) =>{
         event.preventDefault();
         fetch("https://www.terriblytinytales.com/test.txt")
        .then((response) => response.text())
        .then((text) => {
            const cleanedData = text.replace(/[^A-Za-z]/g, " ");
            const words = cleanedData.toLowerCase().split(" ");
            const frequency = words.reduce((acc, word) => {
            acc[word] = (acc[word] || 0) + 1;
            return acc;
            }, {});
            setWordCount(frequency);
            setFileContent(text);

            const categories = Object.keys(frequency).sort((a,b) => frequency[b] - frequency[a]).slice(1,20).sort((a,b) => frequency[b] - frequency[a])
            const dataSeries = Object.values(frequency).sort((a,b) => b - a).slice(1,20)
            setOptions({...options,
            xaxis :{
                ...options.xaxis,categories
             }
            })
            setSeries([
                {   name : "frequency",
                    data : dataSeries

                }
            ])

        })
        .catch((error) => console.log(error));
    
    };

    const createChart = () =>{
        return series.map((ser)=>({
            name : ser.name,
            data : ser.data.map((value, index)=>({
                x : options.xaxis.categories[index],
                y : value,
            })),
        }))
    };

    const handleExport = ()=>{
        const csvFile = [
            ["Word","Frequency"],
            ...options.xaxis.categories.map((category, index) => [
                category,
                series[0].data[index]
            ]),
        ]
        .map((row) => row.join(","))
        .join("\n");

        const element = document.createElement("a");
        const file = new Blob([csvFile], {type : "text/csv"});
        element.href = URL.createObjectURL(file)
        element.download = "ttt-Histogram.csv";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element)
    }

    return(
        <div>
            <h1 id="h1">Terribly Tiny Tales</h1>
            <form onSubmit={handleSubmit}> 
                <button id="btn1" type="submit">submit</button>
            </form>
            {/* {/* <p>{fileContent}</p>  }    //shows content of the file     */}
            {/* <ul>
                {Object.entries(wordCount)               //display all the words and their frequnecies
                .sort(([, a],[, b]) => b - a)
                .map(([word, frequency]) =>(
                    <li key= {word}>
                        {word} : {frequency}
                    </li>
                ))}
            </ul> */}
            <div id="div1">
            <Chart
              options={options}
              series={createChart()}
              type="bar"
              width="60%"
            />
            </div>
            <div>
                <button id="btn2" onClick={handleExport}>Export</button>
            </div>
        </div>
    )
}

export default FileReader;

