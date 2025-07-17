import React, { useEffect, useState } from "react";
import { Reveal } from "../util/Reveal";
import { useDebounce } from "../util/useDebounce";
import { useAxios } from "../util/useAxios";
import { useNoteStore } from "../store/useNoteStore";


export const Notes = () => {
  // Axios
  const axiosInstance = useAxios();
  // Store
  const fetchNote = useNoteStore((state)=> state.fetchNote)
  const upsertNote = useNoteStore((state) => state.upsertNote);
  const note = useNoteStore((state)=> state.note)

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // ensures data is fetched and updated before sync local state
  useEffect(()=>{
    fetchNote(axiosInstance, formattedDate);
  },[])

  // Sync with database only once on load
  useEffect(() => {
    setBodyInput(note.body);
  }, [note]);
  

  const [bodyInput, setBodyInput] = useState(note.body);
  
  const debouncedInput = useDebounce(bodyInput, 2000);
  
  useEffect(() => {
    upsertNote(axiosInstance, debouncedInput, formattedDate);
  }, [debouncedInput]);

  return (
    <div className="flex-shrink-0 w-1/4 h-full p-4 mb-4 flex flex-col">
      <Reveal>
        <h2 className="text-4xl mb-2 font-[NeueBit]">Notes</h2>
      </Reveal>
      <textarea
        className="w-full flex-1 py-1 px-4 text-base resize-none outline-none rounded-lg"
        spellCheck={false}
        value={bodyInput}
        onChange={(e) => setBodyInput(e.target.value)}
        style={{
          backgroundImage: `radial-gradient(circle, rgba(153, 153, 153, 0.52) 1px, transparent 1px)`,
          backgroundSize: `20px 20px`,
          backgroundPosition: `center`,
        }}
        placeholder="Write your notes here..."
      ></textarea>
    </div>
  );
};
