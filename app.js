// Use the D3 library to read in `samples.json`.
function buildPlot(id) {
    d3.json("samples.json").then((data) => {
        
        var samplesFilter = data.samples.filter(s=> s.id.toString() ===id)[0];
        
        var sampleValues = samplesFilter.sample_values.slice(0,10).reverse();
        
        var otuTop10 = (samplesFilter.otu_ids.slice(0,10)).reverse();
        var otuIDs = otuTop10.map(d=> "OTU " + d)
        var otuLabels = samplesFilter.otu_labels.slice(0,10);

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        var trace = {
            x: sampleValues,
            y: otuIDs,
            text: otuLabels,
            marker: {
                color: 'rgb(160,110,180)'
            },
            type: "bar",
            orientation: "h"
        };

        var data_bar = [trace];
        var layout_bar = {
            title: "OTUs - Top 10",
            yaxis:{
                tickmode:"linear"
            },
            margin: {
                l:100,
                r:100,
                t:100,
                b:30
            }
        };

        Plotly.newPlot("bar",data_bar,layout_bar);

// Create a bubble chart that displays each sample.
        var trace_bubble = {
            x: samplesFilter.otu_ids,
            y: samplesFilter.sample_values,
            text: samplesFilter.otu_labels,
            mode: "markers",
            marker: {
                size: samplesFilter.sample_values,
                color: samplesFilter.otu_ids
            }
        };

        var data_bubble = [trace_bubble];
        var layout_bubble = {
            title: "Samples",
            xaxis:{
                title: "OTU IDs"
            },
            height: 700,
            width: 1100
        };

        Plotly.newPlot("bubble",data_bubble,layout_bubble);
    });
}

// Display the sample metadata, display each key-value pair from the metadata JSON object somewhere on the page, and update all of the plots any time that a new sample is selected
function plotInfo(id) {
    d3.json("samples.json").then((data)=> {
        
        var metadata = data.metadata;
        console.log(metadata);
        
        var metadataFilter = metadata.filter(meta => meta.id.toString() === id)[0];

        var demographics = d3.select("#sample-metadata");
        demographics.html("");

        Object.entries(metadataFilter).forEach((key)=> {
            demographics.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

function sampleSelection(id) {
    buildPlot(id);
    plotInfo(id);
}

function init() {
    var dropdownMenu = d3.select("#selDataset");
    d3.json("samples.json").then((data)=> {
        data.names.forEach(function(name) {
            dropdownMenu.append("option").text(name).property("value");
        });
        buildPlot(data.names[0]);
        plotInfo(data.names[0]);
    });
}
init();