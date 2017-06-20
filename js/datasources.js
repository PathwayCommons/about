(function() {

  var fetchData,
  update,
  updateAxes,
  setScales,
  renderGraph,
  getChoices,
  remove,
  initModule,

  keys = [
    "numPathways"
    , "numInteractions"
    // , "numPhysicalEntities"
  ],

  keyNames = [
    "Pathways"
    , "Interactions"
    // , "Physical Entities"
  ],

  stateMap = {
    width       : null,
    height      : null,
    margin      : null,
    data        : null,
    transitionDuration: 250
  },

  d3Map = {
    container : null,
    x         : null,
    y0        : null,
    y1        : null,
    xAxis     : null,
    yAxis     : null,
    g_axis_x  : null,
    g_axis_y  : null,
    svg_panel : null,
    checkboxes: null,
    g_panel   : null,
    colorScale  : null
  };

  remove = function(){
    d3Map.container.remove();
  };

  filterData = function( data, keys ){
    return data
      .filter(function(e){ return !e.notPathwayData })
      .filter(function(e){
        return keys.some( function(key){ return e[key] > 0 });
      })
      ;
  };

  fetchData = function( cb ){
    d3.json("http://beta.pathwaycommons.org/pc2/metadata/datasources", function(error, data) {
      if ( error || !data.length ) return cb( error || "No data" );
      stateMap.data = filterData( data, keys );
      return cb( null, stateMap.data );
    });
  };

  setScales = function( data, choices ){
    var choice_keys = choices || keys;
    // Set the scale bounds based on data
    d3Map.y0.domain( data.map(function(d) { return d.name[0]; }) );
    d3Map.y1.domain( keys ).rangeRound([0, d3Map.y0.bandwidth()]);
    d3Map.x.domain([1, d3.max(data, function(d) { return d3.max(choice_keys, function(key) { return d[key]; }); } )]).nice();
  };

  updateAxes = function( data, choices ){
    setScales( data, choices );
    d3Map.g_axis_y.transition().duration(500).call( d3Map.yAxis );
    d3Map.g_axis_x.transition().duration(500).call( d3Map.xAxis );
  };

  renderAxes = function( data ){
    // Set the scale bounds based on data
    setScales( data );
    // y axis
    d3Map.g_axis_y = d3Map.g_panel.append("g")
        .attr("class", "y axis")
        .call( d3Map.yAxis );

    // x axis
    d3Map.g_axis_x = d3Map.g_panel.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + stateMap.height + ")")
        .call( d3Map.xAxis );

    d3Map.g_axis_x.append("text")
        .attr("x", d3Map.x(d3Map.x.ticks().pop()) / 1.8)
        .attr("y", 2)
        .attr("dy", "3em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text("Counts");
  };


  renderGraph = function( error, data ){
    if ( error ) {
      remove()
    } else {
      renderAxes( data );
    }
    update();
  };

  getChoices = function(){
    var choices = [];
    d3.selectAll(".checkbox").each(function(d){
      if(d3.select(this).property("checked")){
        choices.push(d3.select(this).property("value"));
      }
    });
    return choices;
  };

  update = function(){

    var choices = getChoices();
    var choiceData = filterData(stateMap.data, choices);
    console.log(choiceData[0]);
    updateAxes( choiceData, choices );

    //update
    var sources = d3Map.g_panel.selectAll(".source")
      .data( choiceData, function(d) { return d.id; })
      .attr("transform", function(d) { return "translate(0," + d3Map.y0( d.name[0] ) + ")"; });

    //enter
    sources.enter().append("g")
        .attr("class", "source")
        .attr("transform", function(d) { return "translate(0," + d3Map.y0( d.name[0] ) + ")"; });

    //exit
    sources.exit()
      .transition()
        .duration(stateMap.transitionDuration)
      .remove();

    // update
    var bars = d3Map.g_panel.selectAll(".source").selectAll("rect")
      .data(function(d) {
        return choices.map(function(k){ return {key: k, value: d[k] } })
      }, function(d) { return d.key; })
      .attr("height", d3Map.y1.bandwidth());

    // enter
    bars.enter().append("rect")
      .attr("x", 1) // jitter away from y axis
      .attr("y", function( d ) { return d3Map.y1( d.key ); })
      .transition().duration(stateMap.transitionDuration)
      .attr("width", function(d) { return d.value ? d3Map.x( d.value ) : 0; })
      .attr("height", d3Map.y1.bandwidth())
      .attr("fill", function(d) { return d3Map.colorScale( d.key ); });

    // exit
    bars.exit()
      .transition()
        .duration(stateMap.transitionDuration)
      .attr("width", 0)
      .remove();

    // var legend = g.append("g")
    //     .attr("class", "legend")
    //     .attr("font-family", "sans-serif")
    //     .attr("text-anchor", "end")
    //   .selectAll("g")
    //   .data(keys.slice())
    //   .enter().append("g")
    //     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
    //
    // legend.append("rect")
    //     .attr("x", width - 19)
    //     .attr("width", 19)
    //     .attr("height", 19)
    //     .attr("fill", z);
    //
    // legend.append("text")
    //     .attr("x", width - 24)
    //     .attr("y", 9.5)
    //     .attr("dy", "0.32em")
    //     .text(function(d) { return d.substring(3); }); //assuming label is num*
  };


  initModule = function(){
    d3Map.container = d3.select("#datasources");
    d3Map.svg_panel = d3Map.container.select(".graph-wrapper")
      .append("svg")
      .attr("width", 750)
      .attr("height", 900);
    stateMap.margin = { top: 20, right: 40, bottom: 50, left: 110 };
    stateMap.width = d3.max([+$("svg").parent().width() - stateMap.margin.left - stateMap.margin.right, 250]);
    stateMap.height = +d3Map.svg_panel.attr("height") - stateMap.margin.top - stateMap.margin.bottom;
    d3Map.g_panel = d3Map.svg_panel.append("g").attr("transform", "translate(" + stateMap.margin.left + "," + stateMap.margin.top + ")");

    // Populate the categoeries checkboxes
    d3Map.checkboxes = d3Map.container
      .select('.form-wrapper form')
      .selectAll('.checkbox')
      .data( keys )
      .enter()
        .append('div')
        .attr('class', 'checkbox')
        .append('label').html(function(id, index) {
          return '<input id="' + id + '" type="checkbox" class="checkbox" value="' + id +  '"' + (id === "numPathways" ? ' checked':' ')  + '>' + keyNames[index];
        })
      .on("change", update);

    d3Map.y0 = d3.scaleBand()
        .rangeRound([stateMap.height, 0]) //set the output range
        .paddingInner(0.1); //space between bands

    d3Map.y1 = d3.scaleBand()
        .padding(0.05);

    // Category data values
    d3Map.x = d3.scaleLog()
        .rangeRound([0, stateMap.width]);

    d3Map.colorScale = d3.scaleOrdinal()
      .range([ "#2980b9", "#16a085", "#bdc3c7", "#2c3e50", "#c0392b", "#d35400", "#8e44ad"]);

    d3Map.xAxis = d3.axisBottom(d3Map.x).tickFormat(function(d){ return d3Map.x.tickFormat(4,d3.format(",d"))(d); });
    d3Map.yAxis = d3.axisLeft(d3Map.y0);

    fetchData( renderGraph );
  };

  initModule();

}());
