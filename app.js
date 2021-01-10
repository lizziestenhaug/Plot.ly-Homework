//Create function that gets data
function getPlot(id) {

    //Use d3 library to read in data
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)

        //get samples values
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        console.log(samples);
        var sampleValues = samples.sample_values.slice(0, 10).reverse();

        //get otu ID labels
        var idValues = (samples.otu_ids.slice(0, 10)).reverse();
        var idOtu = idValues.map(d => "OTU" + d)
        console.log(`OTU IDS: ${idOtu}`)

        
        //get otu labels for chart
        var labels = samples.otu_labels.slice(0, 10);
        console.log(`Samples Values: ${samplesValues}`)
        console.log(`Id Values: $idValues}`)

        //create trace for bar chart
        var trace = {
            x: sampleValues,
            y: idOtu,
            text: labels,
            type: "bar",
            orientation: "h",
        };

        var data = [trace];

        //plot layout
        var layout = {
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 30,
                b: 20
            }
        };

        Plotly.newPlot("bar", data, layout);

//create trace for bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
        };

//layout for bubble plot
        var layout = {
            xaxis: {title: "OTU ID"},
            height: 600,
            width: 1300
        };

        var data1 = [trace1];

        Plotly.newPlot("bubble", data1, layout);


//Trace for pie chart
        var trace2 = {
            labels: idOtu,
            values: sampleValues,
            type: "pie",
        }

        var data = [trace2]

        Plotly.newplot("gauge", data)

    });
}

//data function
function getInfo(id) {
    d3.json("data/samples.json").then((data)=> {

        var metadata = data.metadata;
        
        console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        var demographicInfo = d3.select("#sample-metadata");

        demographicInfo.html("");

        Object.entries(result).forEach((key) => {
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] +"\n");
        });
    });
}

//function for plot change 
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

//data function
function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("values");
        });

        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}
init();



