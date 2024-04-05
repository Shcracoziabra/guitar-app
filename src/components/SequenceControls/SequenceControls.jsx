import { AppContext } from "../../AppContext";
import { useContext } from "react";
import Btn from "../Btn/Btn";
import { guitar } from "../../guitar";
import { notes, accidentals } from "../../defaultValues";
import './SequenceControls.css';

export default function SequenceControls(){
    const { note, setNote, sequence, setSequence, accidental, setAccidental,chosenSequences, setShowControls } = useContext(AppContext);
    const noteBtns = notes.map(item => {
        return <Btn key={item} isActive={item === note} onBtnClick={()=> setNote(item)} title={item}/>
      });
    const accBtns = accidentals.map(item => {
        return <Btn key={item} isActive={item === accidental} onBtnClick={()=> setAccidental(item)} title={guitar.accidCodes[item]}/>
    });
    const seqBtns = chosenSequences.map(item => {
        return <Btn key={item} isActive={item === sequence} onBtnClick={()=> setSequence(item)} title={item}/>
    });
    
    return (
        <section className='sequence-controls'>
            <button onClick={()=> setShowControls(false)} className='close'></button>
            <div className='btn-row'>{noteBtns}</div>
            <div className='btn-row'>{accBtns}</div>
            <div className='btn-row'>{seqBtns}</div>
        </section>
    )
}