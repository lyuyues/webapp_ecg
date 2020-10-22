import { Component, OnInit,ElementRef,Input,OnChanges,SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../shared/services/patient.service';
import { Note} from'../shared/data/note';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
//declare let d3: any;
var Base64 = require('js-base64').Base64;
import { D3Service, D3, D3DragEvent, D3ZoomEvent,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition} from 'd3-ng2-service';
@Component({
  selector: 'app-ecg-data-drag-zoom',
  templateUrl: './ecg-data-drag-zoom.component.html',
  styleUrls: ['../bootstrap-custom.css', '../common.css','./ecg-data-drag-zoom.component.css']
})
export class EcgDataDragZoomComponent implements OnInit {
  @Input() data;
  timescale = ["0.5s", "1s", "2s", "5s", "10s", "30s", "1min", "5min", "10min"];
  data_index = [0.5, 1, 2, 5, 10, 30, 60,300,600];
  private d3: D3;
  private parentNativeElement: any;
  private svg;
  private g;
  private d3G;
  private minX;
  private maxX;
  private minY;
  private maxY;
  private x0: [number, number];
  private y0: [number, number];
  private width:number = 800;
  private height:number = 400;
  private margin = {top: 15, right: 20, bottom: 30, left: 60};

  private xAxisScale: ScaleLinear<number, number>;
  private yAxisScale: ScaleLinear<number, number>;
  private z: ScaleOrdinal<number, string>;

  private xAxis: Axis<number>;
  private yAxis: Axis<number>;
  private line;
  private area;
  private areaPath;
  private xGroup;
  private yGroup;
  private zoomRect;
  private zoom;

  private d3ParentElement: Selection<HTMLElement, any, null, undefined>;
  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (
      (changes['data'] && !changes['data'].isFirstChange()) 
    ) {
      
    }

  }
  ngOnInit() {
  this.minX = this.d3.min(this.data, function(d) { return d[0]; });
  this.maxX = this.d3.max(this.data, function(d) { return d[0]; });
  this.minY = this.d3.min(this.data, function(d) { return d[1]; });
  this.maxY = this.d3.max(this.data, function(d) { return d[1]; });
    let d3 = this.d3;
    let self = this;
    function zoomed() {
        var xz = d3.event.transform.rescaleX(self.xAxisScale);
        self.xGroup.call(self.xAxis.scale(xz));
        // path rescale
        self.areaPath.attr("d", self.area.x(function(d) { return xz(d[0]); }));
    }
    this.d3ParentElement = d3.select(this.parentNativeElement);
    // svg
    this.svg = this.d3ParentElement.select('svg');
    if(window.innerWidth>=1480){
        this.svg.attr("width","910");
    }else if(window.innerWidth>=1380){
        this.svg.attr("width","850");
    }else if(window.innerWidth>=1280){
        this.svg.attr("width","780");
    }else if(window.innerWidth>=1180){
        this.svg.attr("width","720");
    }else if(window.innerWidth>=1080){
         this.svg.attr("width","650");
    }else{
        this.svg.attr("width","580");
    }
    this.width = +this.svg.attr("width") - this.margin.left - this.margin.right,
    this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom,
    this.g = this.svg.append("g")
             .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    this.x0 = [this.minX,this.maxX*1.1];
    this.y0= [this.minY*0.9, 1];
    // X scale will fit all values from data[] within pixels 0-w
    this.xAxisScale = this.d3.scaleLinear().domain(this.x0).range([0, this.width]); //margin.left:40,margin.right:20;
    this.yAxisScale = this.d3.scaleLinear().domain(this.y0).range([this.height, 0]);
    // Axis Functions
    this.xAxis = this.d3.axisBottom<number>(this.xAxisScale)
                        .tickSizeInner(-this.height)
                        .tickSizeOuter(0)
                        .tickPadding(10);
    this.yAxis = this.d3.axisLeft<number>(this.yAxisScale)
                        .tickSizeInner(-this.width)
                        .tickSizeOuter(0)
                        .tickPadding(10); 
    // Area function used for data 
    this.area = this.d3.line()
        //.curve(d3.curveStepAfter)
        .x(function(d) { return self.xAxisScale(d[0]); })
        .y(function(d) { return self.yAxisScale(d[1]); });
    // define path sttributes
    this.areaPath = this.g.append("path")
        .attr("clip-path", "url(#clip)")
        .attr('fill', "none")
        .attr("stroke", "#EEC244")
        .attr("stroke-width", 2);
    // to draw yAxis no transLate for yAxis
    this.yGroup = this.g.append("g").call(this.yAxis);
    // to draw xAxis translate relative to this.g
    this.xGroup = this.g.append("g")
        .attr("transform", "translate(0," + this.height + ")");
    this.g.append("text").attr("transform", "translate("+ (this.width-this.margin.left)/2 +"," + (this.height+this.margin.bottom) + ")")
          .text("Time (s)");
    var xExtent = d3.extent(this.data, function(d) { return d[0]; });//[0, 299]
    this.zoom = d3.zoom()
        .scaleExtent([1 / 4, 8])
        .translateExtent([[this.xAxisScale(+xExtent[0]-100), -Infinity], [this.xAxisScale(+xExtent[1]+200), Infinity]])
        .on("zoom", zoomed);

   this.zoomRect = this.svg.append("rect")
    .attr("width", this.width)
    .attr("height", this.height)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .call(self.zoom);
    
  // to hide path to this rect
  this.g.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", this.width)
        .attr("height", this.height);

  // bind data to this.area and draw every point by areaPath
  this.areaPath.datum(this.data)
               .attr("class", "area")
               .attr("d", this.area);
  // now zoomRect is not in {x: 0 y: 0} reset zoomRect to (k:1,x:0,y:0)
  this.zoom.transform(this.zoomRect,d3.zoomIdentity);
 // this.zoomRect.transition().duration(150).call(self.zoom.transform, d3.zoomIdentity);
  }
onZoomOut(){
    let d3 = this.d3;
    let self = this;
    function zoomed() {
        var xz = d3.event.transform.rescaleX(self.xAxisScale);
        self.xGroup.call(self.xAxis.scale(xz));
        self.areaPath.attr("d", self.area.x(function(d) { return xz(d[0]); }));
    }
    this.zoom.scaleBy(self.zoomRect, 1.2);
}
onZoomIn(){
    let d3 = this.d3;
    let self = this;
    function zoomed() {
        var xz = d3.event.transform.rescaleX(self.xAxisScale);
        self.xGroup.call(self.xAxis.scale(xz));
        self.areaPath.attr("d", self.area.x(function(d) { return xz(d[0]); }));
    }
              
    this.zoom.scaleBy(self.zoomRect, 0.8);
}
onReset(){
    let d3 = this.d3;
    let self = this;
    function zoomed() {
        d3.event.transform.k = 1;
        d3.event.transform.x = 0;
        d3.event.transform.y = 0;
        var xz = d3.event.transform.rescaleX(self.xAxisScale);
        self.xGroup.call(self.xAxis.scale(xz));
        self.areaPath.attr("d", self.area.x(function(d) { return xz(d[0]); }));
    }
    var _zoom = d3.zoom()
        .scaleExtent([1 / 4, 8])
        .translateExtent([[-this.width, -Infinity], [2 * this.width, Infinity]])
        .on("zoom", zoomed);
              
    _zoom.scaleBy(self.zoomRect, 1);
}
onDragLeft(){
    let d3 = this.d3;
    let self = this;
    function zoomed() {
        d3.event.transform.x = d3.event.transform.x + 100;
        var xz = d3.event.transform.rescaleX(self.xAxisScale);
        self.xGroup.call(self.xAxis.scale(xz));
        self.areaPath.attr("d", self.area.x(function(d) { return xz(d[0]); }));
    }
    var _zoom = d3.zoom()
                  .scaleExtent([1 / 2, 8])
                  .translateExtent([[-this.width, -Infinity], [2 * this.width, Infinity]])
                  .on("zoom", zoomed);
    _zoom.scaleBy(self.zoomRect, 1);
}
onDragRight(){
    let d3 = this.d3;
    let self = this;
    function zoomed() {
        d3.event.transform.x = d3.event.transform.x - 100;
        var xz = d3.event.transform.rescaleX(self.xAxisScale);
        self.xGroup.call(self.xAxis.scale(xz));
        self.areaPath.attr("d", self.area.x(function(d) { return xz(d[0]); }));
    }
    var _zoom = d3.zoom()
                  .scaleExtent([1 / 2, 8])
                  .translateExtent([[-this.width, -Infinity], [2 * this.width, Infinity]])
                  .on("zoom", zoomed);
    _zoom.scaleBy(self.zoomRect, 1);
}
onTimescale(index){
    let d3 = this.d3;
    let self = this;
    let data_zoom_length = this.data_index[index];
    let zoomIndex = this.maxX/data_zoom_length*1.1;
    function zoomed() {
        d3.event.transform.x = 0;
        var xz = d3.event.transform.rescaleX(self.xAxisScale);
        self.xGroup.call(self.xAxis.scale(xz));
        self.areaPath.attr("d", self.area.x(function(d) { return xz(d[0]); }));
    }
    var _zoom = d3.zoom()
                  .translateExtent([[-this.width, -Infinity], [2 * this.width, Infinity]])
                  .on("zoom", zoomed);
    this.zoom.transform(self.zoomRect,d3.zoomIdentity);
    _zoom.scaleBy(self.zoomRect, zoomIndex);
}
private sinAndCos() {
    var sin = [];
    for (var i = 0; i < 300; i++) {
      sin.push([i, Math.sin(i/10)]);
    }
    return sin;
  }
}