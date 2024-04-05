import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {  guitar  } from "./guitar";
import { tabs, accidentals, notes, sequences } from "./defaultValues";
import Fretboard from "./components/Fretboard/Fretboard";
import { AppContext } from "./AppContext";
import Nav from "./components/Nav/Nav";
import Btn from "./components/Btn/Btn";
import IconBtn from "./components/IconBtn/IconBtn";
import SwitchBtn from "./components/SwitchBtn/SwitchBtn";
import ShowControlsBtn from "./components/ShowControlsBtn/ShowControlsBtn";
import SequenceControls from "./components/SequenceControls/SequenceControls";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [note, setNote] = useState(notes[0]);
  const [accidental, setAccidental] = useState(accidentals[2]);
  const [sequence, setSequence]= useState('chromatic');
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [showControls, setShowControls] = useState(false);

  useEffect(()=>{
    document.body.setAttribute('data-theme', `${darkTheme ? 'dark' : 'light'}`);
  }, [darkTheme]);

  const notesData = guitar.fretboard;
  const shownNotesObj= guitar.getNotesSequence({note, accidental, sequence});

  const shownNotesArr = Object.values(shownNotesObj).slice();
  const tonicIdx = shownNotesArr.findIndex(item => item.title === note);
  const shownNotesOrderedArr = [...shownNotesArr.map(item  => ({...item })).slice(tonicIdx), ...shownNotesArr.map(item  => ({...item })).slice(0, tonicIdx)];
  const frequencesToPlay = shownNotesOrderedArr.map(item => item.freq);

  const setDefaultPage = () => {
    setNote(notes[0]);
    setAccidental(accidentals[2]);
    setSequence('chromatic');
  }

  const setChordsPage = () => {
    setNote(notes[0]);
    setAccidental(accidentals[2]);
    setShowControls(false);
    setSequence('maj');
  }

  const setTonalitiesPage = () => {
    setNote(notes[0]);
    setAccidental(accidentals[2]);
    setShowControls(false);
    setSequence('major');
  }
  const navFunctions = [setDefaultPage, setChordsPage, setTonalitiesPage];

  const chosenSequences = activeTab === 'chords' ? sequences.slice(0, 9) : activeTab === 'tonalities' ?  sequences.slice(-2) : [];
  const shownSequenceText = shownNotesOrderedArr.map(({title, accidental}) => {
    const acc = accidental === 'n' ? '' : guitar.accidCodes[accidental];
      return title + acc
    }).join(' ');
  
  const navBtns = tabs.map((tab, i) => {
    return (
      <Btn 
        key={tab} 
        isActive={tab === activeTab} 
        onBtnClick={
          ()=> {
            setActiveTab(tab); 
            navFunctions[i]();
          }  
        } 
        title={tab}
      />
    )
  });

  const playSequenceBtns =  <>
                              {activeTab === 'chords' && <IconBtn onBtnClick={()=> { guitar.generateSound(frequencesToPlay, false);} } iconName='ukelele'/>}
                              <IconBtn onBtnClick={()=> {guitar.generateSound(frequencesToPlay, true)}} iconName='musical-note'/>
                            </>;

  const sequenceInfo = <div className='btn-row'>
                        <ShowControlsBtn 
                          isActive={showControls} 
                          title={note + `${accidental === 'n' ? '' :guitar.accidCodes[accidental]}`  + sequence} 
                          onBtnClick={()=> setShowControls(!showControls)}
                        />
                        <h1>{shownSequenceText}</h1>
                        {playSequenceBtns}
                      </div>

  const appHeader = <Nav>
                      {navBtns}
                      <SwitchBtn offGliph={'\u263C'} onGliph={'\u263E'} onSwitch={() => setDarkTheme(!darkTheme)} value={darkTheme}/>
                    </Nav>;

  const appContent =  <>
                        { activeTab !== 'all' &&  <>
                                                    {sequenceInfo}
                                                    {showControls && <SequenceControls/>}
                                                  </>
                        }
                        <Fretboard/>
                      </>

  return (
    <AppContext.Provider value={{ notesData, shownNotesObj, note, setNote, sequence, setSequence, accidental, setAccidental, chosenSequences, setShowControls}}>
      {createPortal(appHeader, document.querySelector('header'))}
      {createPortal(appContent, document.querySelector('main'))}
    </AppContext.Provider>
  )
}

export default App;