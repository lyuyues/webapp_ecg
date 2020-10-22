import { ComponentFixture,inject, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { HttpModule, Response } from '@angular/http';
import { SearchNotePipe } from './search-note.pipe'
describe('Pipe: SearchNotePipe', () => {
  let pipe = new SearchNotePipe();
  //specs
  it('should return original notes if keyword is null', () => {
    let notes = [{content:"abc",for_records:[],for_test:[]}];
    expect(pipe.transform(notes,null)).toBe(notes);
  });
  it('transforms "abc" to "Abc"', () => {
    let notes = [{content:"abc",for_records:[],for_test:[]}];
    let keyword = "A";
    expect(pipe.transform(notes,keyword).length).toBe(notes.length);
  });
  it('should return nothing', () => {
    let notes = [{content:"abc",for_records:[],for_test:[]}];
    let keyword = "d";
    expect(pipe.transform(notes,keyword).length).toBe(0);
  });
  it('should return 1 note', () => {
    let notes = [{content:"abc",for_records:[],for_test:[]}, {content:"abcd",for_records:[],for_test:[]}];
    let keyword = "d";
    expect(pipe.transform(notes,keyword).length).toBe(1);
  });
})
//Pipes are just plain classes that can be injected so we can set up our specs very easily using inject.
describe('Pipe: SearchNotePipe with TestBed', () => {
  let pipe;
  //setup
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ SearchNotePipe ]
  }));
  
  beforeEach(inject([SearchNotePipe], p => {
    pipe = p;
  }));
  
  //specs
  
  it('should capitalise', () => {
    let notes = [{content:"abc",for_records:[],for_test:[]}];
    let keyword = "A";
    expect(pipe.transform(notes,keyword).length).toBe(notes.length);
  });
}) 