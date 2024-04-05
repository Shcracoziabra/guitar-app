/**
 * @param {Object[]} openStrings - Open strings information
 * @param {number} openStrings[].idx - note index in the C chromatic scale
 * @param {number} openStrings[].oct - octave the note belongs to [2, 3, 4] 
 * @param {string} openStrings[].acc - note accidental ['df', 'f', 'n', 's', 'ds']
 * @param {number} fretNum - number of frets [14, 15, 16, 17, 18]
 */ 

class Guitar {
    constructor(openStrings, fretNum) {
        this.naturals = [
            {title: 'C', chromaticIdx: 0},
            {title: 'D', chromaticIdx: 2},
            {title: 'E', chromaticIdx: 4},
            {title: 'F', chromaticIdx: 5},
            {title: 'G', chromaticIdx: 7},
            {title: 'A', chromaticIdx: 9},
            {title: 'B', chromaticIdx: 11}
        ],
        this.chromaticScale = [
            [
                {title: 'A', accidental: 'sds', shift: 3},
                {title: 'B', accidental: 's', shift: 1},
                {title: 'C', accidental: 'n', shift: 0},
                {title: 'D', accidental: 'df', shift: -2},
            ],
            [
                {title: 'B', accidental: 'ds', shift: 2},
                {title: 'C', accidental: 's', shift: 1},
                {title: 'D', accidental: 'f', shift: -1},
                {title: 'E', accidental: 'fdf', shift: -3},
            ],
            [
                {title: 'B', accidental: 'sds', shift: 3},
                {title: 'C', accidental: 'ds', shift: 2},
                {title: 'D', accidental: 'n', shift: 0},
                {title: 'E', accidental: 'df', shift: -2},
                {title: 'F', accidental: 'fdf', shift: -3},
            ],
            [
                {title: 'C', accidental: 'sds', shift: 3},
                {title: 'D', accidental: 's', shift: 1},
                {title: 'E', accidental: 'f', shift: -1},
                {title: 'F', accidental: 'df', shift: -2},
            ],
            [
                {title: 'D', accidental: 'ds', shift: 2},
                {title: 'E', accidental: 'n', shift: 0},
                {title: 'F', accidental: 'f', shift: -1},
                {title: 'G', accidental: 'fdf', shift: -3},
            ],
            [
                {title: 'D', accidental: 'sds', shift: 3},
                {title: 'E', accidental: 's', shift: 1},
                {title: 'F', accidental: 'n', shift: 0},
                {title: 'G', accidental: 'df', shift: -2},
            ],
            [
                {title: 'E', accidental: 'ds', shift: 2},
                {title: 'F', accidental: 's', shift: 1},
                {title: 'G', accidental: 'f', shift: -1},
                {title: 'A', accidental: 'fdf', shift: -3},
            ],
            [
                {title: 'E', accidental: 'sds', shift: 3},
                {title: 'F', accidental: 'ds', shift: 2},
                {title: 'G', accidental: 'n', shift: 0},
                {title: 'A', accidental: 'df', shift: -2},
            ],
            [
                {title: 'F', accidental: 'sds', shift: 3},
                {title: 'G', accidental: 's', shift: 1},
                {title: 'A', accidental: 'f', shift: -1},
                {title: 'B', accidental: 'fdf', shift: -3},
            ],
            [
                {title: 'G', accidental: 'ds', shift: 2},
                {title: 'A', accidental: 'n', shift: 0},
                {title: 'B', accidental: 'df', shift: -2},
                {title: 'C', accidental: 'fdf', shift: -3},
            ],
            [
                {title: 'G', accidental: 'sds', shift: 3},
                {title: 'A', accidental: 's', shift: 1},
                {title: 'B', accidental: 'f', shift: -1},
                {title: 'C', accidental: 'df', shift: -2},
            ],
            [
                {title: 'A', accidental: 'ds', shift: 2},
                {title: 'B', accidental: 'n', shift: 0},
                {title: 'C', accidental: 'f', shift: -1},
                {title: 'D', accidental: 'fdf', shift: -3},
            ]
        ],
        this.accidShift = {
            df: -2,
            f: -1,
            n: 0,
            s: 1,
            ds: 2
        },
        this.accidCodes = {
            fdf: '\u266D\uD834\uDD2B',
            df: '\uD834\uDD2B',
            f: '\u266D',
            n: '\u266E',
            s: '\u266F',
            ds: '\uD834\uDD2A',
            sds: '\u266F\uD834\uDD2A'
        },
        this.chordSchemas = {
            maj: [{idx: 0, step: 0}, {idx: 2, step: 4}, {idx: 4, step: 3}],
            m: [{idx: 0, step: 0}, {idx: 2, step: 3}, {idx: 4, step: 4}],
            dim: [{idx: 0, step: 0}, {idx: 2, step: 3}, {idx: 4, step: 3}],
            aug: [{idx: 0, step: 0}, {idx: 2, step: 4}, {idx: 4, step: 4}],
            sus4: [{idx: 0, step: 0}, {idx: 3, step: 5}, {idx: 4, step: 2}],
            sus2: [{idx: 0, step: 0}, {idx: 1, step: 2}, {idx: 4, step: 5}],
            maj7: [{idx: 0, step: 0}, {idx: 2, step: 4}, {idx: 4, step: 3}, {idx: 6, step: 4}],
            m7: [{idx: 0, step: 0}, {idx: 2, step: 3}, {idx: 4, step: 4}, {idx: 6, step: 3}],
            7: [{idx: 0, step: 0}, {idx: 2, step: 4}, {idx: 4, step: 3}, {idx: 6, step: 3}],
            m7b5: [{idx: 0, step: 0}, {idx: 2, step: 3}, {idx: 4, step: 3}, {idx: 6, step: 4}],
            chromatic: [
                {idx: 0, step: 0}, 
                {idx: 0, step: 1}, 
                {idx: 1, step: 1}, 
                {idx: 1, step: 1}, 
                {idx: 2, step: 1}, 
                {idx: 3, step: 1},
                {idx: 3, step: 1}, 
                {idx: 4, step: 1}, 
                {idx: 4, step: 1}, 
                {idx: 5, step: 1}, 
                {idx: 5, step: 1}, 
                {idx: 6, step: 1}
            ],
            major: [
                {idx: 0, step: 0}, 
                {idx: 1, step: 2}, 
                {idx: 2, step: 2}, 
                {idx: 3, step: 1}, 
                {idx: 4, step: 2}, 
                {idx: 5, step: 2},
                {idx: 6, step: 2},
            ],
            minor: [
                {idx: 0, step: 0}, 
                {idx: 1, step: 2}, 
                {idx: 2, step: 1}, 
                {idx: 3, step: 2}, 
                {idx: 4, step: 2}, 
                {idx: 5, step: 1},
                {idx: 6, step: 2},
            ]
        },
        this.notes = [
            {oct: 2, idx: 4, freq: 82.41},
            {oct: 2, idx: 5, freq: 87.31}, 
            {oct: 2, idx: 6, freq: 92.50},
            {oct: 2, idx: 7, freq: 98.00}, 
            {oct: 2, idx: 8, freq: 103.83},
            {oct: 2, idx: 9, freq: 110.00},
            {oct: 2, idx: 10, freq: 116.54},
            {oct: 2, idx: 11, freq: 123.47}, 
            {oct: 3, idx: 0, freq: 130.81},
            {oct: 3, idx: 1, freq: 138.59},
            {oct: 3, idx: 2, freq: 146.83},
            {oct: 3, idx: 3, freq: 155.56}, 
            {oct: 3, idx: 4, freq: 164.81},
            {oct: 3, idx: 5, freq: 174.61},
            {oct: 3, idx: 6, freq: 185.00},
            {oct: 3, idx: 7, freq: 196.00}, 
            {oct: 3, idx: 8, freq: 207.65},
            {oct: 3, idx: 9, freq: 220.00},
            {oct: 3, idx: 10, freq: 233.08},
            {oct: 3, idx: 11, freq: 246.94}, 
            {oct: 4, idx: 0, freq: 261.63},
            {oct: 4, idx: 1, freq: 277.18},
            {oct: 4, idx: 2, freq: 293.66},
            {oct: 4, idx: 3, freq: 311.13}, 
            {oct: 4, idx: 4, freq: 329.63},
            {oct: 4, idx: 5, freq: 349.20},
            {oct: 4, idx: 6, freq: 369.99},
            {oct: 4, idx: 7, freq: 392.00}, 
            {oct: 4, idx: 8, freq: 415.30},
            {oct: 4, idx: 9, freq: 440.00},
            {oct: 4, idx: 10, freq: 466.16},
            {oct: 4, idx: 11, freq: 493.88},
            {oct: 5, idx: 0, freq: 523.25},
            {oct: 5, idx: 1, freq: 554.37},
            {oct: 5, idx: 2, freq: 587.33},
            {oct: 5, idx: 3, freq: 622.25}, 
            {oct: 5, idx: 4, freq: 659.26},
            {oct: 5, idx: 5, freq: 698.46},
            {oct: 5, idx: 6, freq: 739.99},
            {oct: 5, idx: 7, freq: 783.99}, 
            {oct: 5, idx: 8, freq: 830.61},
            {oct: 5, idx: 9, freq: 880.00}
        ],
        this.shownStrings = [1, 2, 3, 4, 5, 6],
        this.shownFrets = [1, 2, 3, 5, 7, 9, 10, 12, 15],
        this.latins = {
            1: 'I',
            2: 'II',
            3: 'III', 
            4: 'IV',
            5: 'V',
            6: 'VI',
            7: 'VII',
            8: 'VIII',
            9: 'IX',
            10: 'X',
            11: 'XI',
            12: 'XII',
            13: 'XIII', 
            14: 'XIV',
            15: 'XV',
            16: 'XVI',
            17: 'XVII'
        },
        this.setFretboard(openStrings.reverse(), fretNum);
    }

    setFretboard(openStrings, fretNum){
        this.fretboard = openStrings.map(open => {
            const startIndex = this.notes.findIndex(note => {
                return note.idx === open.idx && note.oct === open.oct;
            });
            return this.notes.slice(startIndex, startIndex + fretNum);
        });
    }

    getNotesSequence({ note, accidental, sequence }) {
        
        const schema = this.chordSchemas[sequence];
        if (!schema) {
            return {}
        }
        const noteShift = this.naturals.findIndex(item => item.title === note);
        
        
        let shownNotes = {};
        let chromaticIdx = (12 + (this.naturals[noteShift].chromaticIdx + this.accidShift[accidental])) % 12;
        const freqStartIdx = this.notes.findIndex(item => item.oct === 3 && item.idx === chromaticIdx);
        const frequencesRange = this.notes.slice(freqStartIdx, freqStartIdx + 12);
        for (const note of schema) {
            chromaticIdx  = (chromaticIdx + note.step) % 12;
            let nextNote = this.chromaticScale[chromaticIdx].find(item => item.title === this.naturals[(note.idx + noteShift) % 7].title);
            nextNote.freq = frequencesRange.find(item => item.idx === chromaticIdx).freq;
            shownNotes[chromaticIdx] = nextNote;
        }
        return shownNotes;
    }
    generateSound(frequences, sequentually){
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        const waveType = sequentually ? 'triangle' :'sawtooth';

        for (let i = 0; i < frequences.length; i++) {
            const startTime = sequentually ? audioContext.currentTime + i*0.5 :  audioContext.currentTime;
            const endTime = sequentually ? audioContext.currentTime + 0.6 + i*0.5 :  audioContext.currentTime + 1;
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.frequency.value = frequences[i];
            gainNode.gain.value = 0.4;
            oscillator.type = waveType;
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.start(startTime);
            oscillator.stop(endTime);
        }
    }
}

const guitar = new Guitar(
    [
        { idx: 4, oct: 2, acc: 'n'},
        { idx: 9, oct: 2, acc: 'n'},
        { idx: 2, oct: 3, acc: 'n'},
        { idx: 7, oct: 3, acc: 'n'},
        { idx: 11, oct: 3, acc: 'n'},
        { idx: 4, oct: 4, acc: 'n'}
    ], 17
);

export { guitar };