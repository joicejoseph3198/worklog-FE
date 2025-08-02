import React, { useEffect, useState } from "react";
import { Reveal } from "../util/Reveal";
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

  // State declarations
  const [bodyInput, setBodyInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch note when date changes (same as Task component)
  useEffect(() => {
    fetchNote(axiosInstance, formattedDate);
  }, [dateParam]);

  // Sync with database when note changes
  useEffect(() => {
    if (note.body !== undefined) {
      setBodyInput(note.body || "");
    }
  }, [note.body]);

  // Manual save function
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await upsertNote(axiosInstance, bodyInput, formattedDate);
    } catch (error) {
      console.error("Failed to save note:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-shrink-0 w-1/4 h-full p-4 mb-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <Reveal>
          <h2 className="text-3xl mb-2 font-[NeueBit]">Notes</h2>
        </Reveal>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="font-bold hover:cursor-pointer text-[#ff4500] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/10 p-1 rounded-md"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
      <textarea
        className="w-full flex-1 py-1 px-4 text-[16px] resize-none outline-none rounded-lg"
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
