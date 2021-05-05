// ## Step 1: Plotly
// 1. Use the D3 library to read in `samples.json`.
function buildPlot(id) {
    d3.json("samples.json").then((data) => {
        // console.log(data);
        
        var samplesFilter = data.samples.filter(s=> s.id.toString() ===id)[0];
        // console.log(samplesFilter);
        
        var sampleValues = samplesFilter.sample_values.slice(0,10).reverse();
        
        var otuTop10 = (samplesFilter.otu_ids.slice(0,10)).reverse();
        var otuIDs = otuTop10.map(d=> "OTU " + d)
        var otuLabels = samplesFilter.otu_labels.slice(0,10);

        var trace = {
            x: sampleValues,
            y: otuIDs,
            text: otuLabels,
            marker: {
                color: 'rgb(150,120,190)'
            },
            type: "bar",
            orientation: "h"
        };
    })
}

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// * Use `sample_values` as the values for the bar chart.
// * Use `otu_ids` as the labels for the bar chart.
// * Use `otu_labels` as the hovertext for the chart.

// 3. Create a bubble chart that displays each sample.
// * Use `otu_ids` for the x values.
// * Use `sample_values` for the y values.
// * Use `sample_values` for the marker size.
// * Use `otu_ids` for the marker colors.
// * Use `otu_labels` for the text values.

// 4. Display the sample metadata, i.e., an individual's demographic information.

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// 6. Update all of the plots any time that a new sample is selected.


// ## Advanced Challenge Assignment (Optional)

// * Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual.
// * Update the chart whenever a new sample is selected.