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
        var idOTU = idValues.map(d => "OTU" + d)
        console.log(`OTU IDS: ${idOTU}`)

        
        //get otu labels for chart
        var labels = samples.otu_labels.slice(0, 10);
        console.log(`Samples Values: ${samplesValues}`)
        console.log(`Id Values: $idValues}`)

        //create trace
        var trace = {
            x: sampleValues,
            y: idOTU,
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

    })
}


