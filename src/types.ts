export interface Chord {
    name: string;
    shape: number[];
    mutedFrets: number[];
    barre: CustomBarre | CagedBarre;
    barreIndicator: string;
    id?: number;
}

export interface CustomDiagramProps {
    chord: Chord;
    setChord: (chord: Chord) => void;
    chordList: Chord[];
    progressionTitle: string;
    displayProgression: string[];
    toggleViewMode: () => void;
    handleSave: (e: React.FormEvent<HTMLFormElement>) => void;
    handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleChordClear: () => void;
    handleClear: () => void;
    handleClick: (
    fretIndex: number,
    className: ClassNameType,
    updatedMuteIndex: number
    ) => void;
}

export interface ViewModeProps {
    chordList: Chord[];
    setChordList: (chordList: Chord[]) => void;
    progressionTitle: string;
    setProgressionTitle: (title: string) => void;
    id?: number;
    viewMode: boolean;
    setViewMode: (value: boolean) => void;
}

export interface FretProps {
    className: ClassNameType;
    index: number;
    isFretted: boolean;
    isBarred: boolean;
    isMuted: boolean;
    customize: boolean;
    handleClick: (
    index: number,
    finalClassName: ClassNameType,
    updatedIndex: number
    ) => void | (() => void);
}

export interface FretboardProps {
    chord: Chord;
    customize?: boolean;
    caged?: boolean;
    handleClick?: (
    fretIndex: number,
    className: ClassNameType,
    updatedMuteIndex: number
    ) => void;
}

export interface ProgressionType {
    progressionId?: number | null;
    title: string;
    chordList: Chord[];
}

  export interface RootSelectProps {
    handleNameChange: (name: Name) => void;
}

export type BarreShape = {
    [key in CagedBarre]?: number[];
    } & {
    [key in CustomBarre]?: number[];
}

export type CagedBarre = "" | "C" | "A" | "G" | "E" | "D";

export type CustomBarre = "" | 2 | 3 | 4 | 5 | 6;

export type ClassNameType =
    | "open"
    | "muted"
    | "fret"
    | "last-string"
    | "barred";

export type Name =
    | "C"
    | "C#/Db"
    | "D"
    | "D#/Eb"
    | "E"
    | "F"
    | "F#/Gb"
    | "G"
    | "G#/Ab"
    | "A"
    | "A#/Bb"
    | "B";
