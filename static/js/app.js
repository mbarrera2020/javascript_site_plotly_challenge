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

    });
   };

// ---------------------------------------------------------------------
// 2. Create a horizontal bar chart for selected Subject ID to display 
//      the top 1O OTUs found in that individual.
// ---------------------------------------------------------------------

// <insert code to display barchart>

// ------------------------------------------------------------------------------------
// 3. Create a bubble chart that displays each sample.   
//    Use otu_ids for the x values.
//    Use sample_values for the y values.
//    Use sample_values for the marker size.
//    Use otu_ids for the marker colors.
//    Use otu_labels for the text values.
// ------------------------------------------------------------------------------------

// <insert code to display bubble chart>



// ------------------------------------------------------------------------------------
// 4. Display the sample metadata, i.e., an individual's demographic information.
// 5. Display each key-value pair from the metadata JSON object somewhere on the page.
// ------------------------------------------------------------------------------------

// <insert code to display metadata>


// ------------------------------------------------------------------------------------
// 6.  Update all of the plots any time that a new sample is selected. 
//     NOTE:  optionChanged ==> Reference line 25 in the index.html 
// ------------------------------------------------------------------------------------

// <insert code to display metadata>

initialize ();