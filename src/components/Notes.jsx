import React, { useEffect, useState } from "react";
import { Reveal } from "../util/Reveal";
import { useDebounce } from "../util/useDebounce";
import { useAxios } from "../util/useAxios";
import { useNoteStore } from "../store/useNoteStore";
import { useParams } from "react-router";


export const Notes = () => {
  // Axios
  const axiosInstance = useAxios();
  // Store
  const fetchNote = useNoteStore((state) => state.fetchNote)
  const upsertNote = useNoteStore((state) => state.upsertNote);
  const note = useNoteStore((state) => state.note)

  const { dateParam } = useParams();
  // fallback to today's date if param is missing or invalid
  const parsedDate = dateParam ? new Date(dateParam) : new Date();
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  console.log("formatted day in notes ", formattedDate)

  // ensures data is fetched and updated before sync local state
  useEffect(() => {
    fetchNote(axiosInstance, formattedDate);
  }, [dateParam])

  // Sync with database only once on load
  useEffect(() => {
    setBodyInput(note.body);
  }, [note]);


  const [bodyInput, setBodyInput] = useState();

  const debouncedInput = useDebounce(bodyInput, 1000);

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
