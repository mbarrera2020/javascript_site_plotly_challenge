// Plot.ly Homework - Belly Button Biodiversity
// Step 1
//
// Use the D3 library to read in samples.json.
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs 
//      found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

// ---------------------------------------------------------------
// 1. Use the D3 library to read in data from 'samples.json' file.
// Note:  From index.html, select id="selDataset" 
// ---------------------------------------------------------------
function initialize(){
  var dropdownList = d3.selectAll('#selDataset');

  d3.json('samples.json').then((data)=>{
  
      var testNames=data.names;
      testNames.forEach((test) => {dropdownList
            .append("option")
            .text(test)
            .property("value", test);
          });

      // ---------------------------------------------------------------
      // Initialize display with the first record
      // Display charts using first Test ID
      // ---------------------------------------------------------------
      var defaultID = testNames[0];

      // Test / display data
      console.log(defaultID)
  
      fn_displayData(defaultID);
      fn_barChart(defaultID);
      fn_bubbleChart(defaultID)

    });
   };

// ---------------------------------------------------------------------
// 2. Create a horizontal bar chart for selected Subject ID to display 
//      the top 1O OTUs found in that individual.
// ---------------------------------------------------------------------
function fn_barChart(subjectID){
  d3.json('samples.json').then((data)=>{
      var samples = data.samples;

      // Test / display data
      console.log(samples)

      var ID = samples.map(row=>row.id).indexOf(subjectID);

      console.log(ID)

      // Use otu_ids as the labels for the bar chart.
      var otuID = samples.map(row=>row.otu_ids);
      var otuIDTopTen = otuID[ID].slice(0,10).reverse();

      console.log(otuIDTopTen)

      // Use sample_values as the values for the bar chart.
      var sampleValue = samples.map(row=>row.sample_values);
      var sampleValueTopTen = sampleValue[ID].slice(0,10).reverse();
      
      // Use otu_labels as the hovertext for the chart.
      var otuLabelTopTen = samples.map(row=>row.otu_labels).slice(0,10);
      
      var trace={
          x: sampleValueTopTen,
          y: otuIDTopTen.map(otu =>`OTU ${otu}  `),
          text: otuLabelTopTen,
          type:'bar',
          orientation:'h'
      }
      // ------------------------------------------
      // Setup chart layout with title & margins
      // ------------------------------------------
      var barLayout = {
        title: "Top 10 OTUs",
        xaxis: {title: "Sample Values"},
        // yaxis: { title: "OTU IDs"},
        margin: {t: 80, l: 175}
      };

      // ------------------------------------------
      // Display the bar chart            
      // ------------------------------------------
      Plotly.newPlot('bar', [trace], barLayout);
  })
};

// ------------------------------------------------------------------------------------
// 3. Create a bubble chart that displays each sample.   
//    Use otu_ids for the x values.
//    Use sample_values for the y values.
//    Use sample_values for the marker size.
//    Use otu_ids for the marker colors.
//    Use otu_labels for the text values.
// ------------------------------------------------------------------------------------
function fn_bubbleChart(subjectID){
  d3.json('samples.json').then((data)=>{
      var samples=data.samples;

      // Test / display data
      console.log(samples)
  
      var ID = samples.map(row=>row.id).indexOf(subjectID);
      console.log(ID)

      var otuIDs = samples.map(row => row.otu_ids);
      var otuIDs = otuIDs[ID];            
      console.log(otuIDs)

      var sampleValues = samples.map(row => row.sample_values);
      var sampleValues = sampleValues[ID];
      console.log(sampleValues)

      var otuLabels = samples.map(row => row.otu_labels);
      var otuLabels = otuLabels[ID];
      console.log(otuLabels)

      var trace = {
          x: otuIDs,
          y: sampleValues,
          text: otuLabels,
          mode: 'markers',
          marker: {
            size: sampleValues, 
            color: otuIDs
            }
          };                       
      
      var data = [trace]
          
      var bubbleLayout = {
          xaxis: {title: 'OTU IDs'},
          yaxis: {title: 'Sample Values'},
          showlegend: false,
          height: 500,
          width: 1000
          };

      // Display bubble chart             
      Plotly.newPlot('bubble', data, bubbleLayout);
  })
};

// ------------------------------------------------------------------------------------
// 4. Display the sample metadata, i.e., an individual's demographic information.
// 5. Display each key-value pair from the metadata JSON object somewhere on the page.
// ------------------------------------------------------------------------------------
function fn_displayData(subjectID) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;

    // Filter the data for the selected ID number 
    var filteredData = metadata.filter(object => object.id == subjectID);
    var result = filteredData[0];
    
    // Use d3 to select the panel with id of `#sample-metadata`
    //   example data for reference:  
    //   "metadata":[{"id": 940, "ethnicity": "Caucasian", 
    //   "gender": "F", "age": 24.0, "location": "Beaufort/NC", 
    //   "bbtype": "I", "wfreq": 2.0}

    var panelInfo = d3.select("#sample-metadata");
    // Test / display data
    console.log(panelInfo)

    // Clear any existing metadata
    panelInfo.html("");

    // Add & display key and value pair to the Demographic panel
    // ** use div tag to wrap the data
    Object.entries(result).forEach(([key, value]) => {
      panelInfo.append('div').text(`${key}: ${value}`);
    });

  });
} 

// ************************************************************************************
// ** Advanced Challenge -- Optional
// ************************************************************************************
//    Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot 
//      the weekly washing frequency of the individual.
//    Modify the example gauge code to account for values ranging from 0 through 9.
//    Update the chart whenever a new sample is selected.
// ************************************************************************************
// insert code for bubble chart


// ------------------------------------------------------------------------------------
// 6.  Update all of the plots any time that a new sample is selected. 
//     NOTE:  optionChanged ==> Reference line 25 in the index.html 
// ------------------------------------------------------------------------------------
function optionChanged(newSelection) {
  fn_displayData(newSelection);
  fn_barChart(newSelection);
  fn_bubbleChart(newSelection);
};

initialize ();