import {getSongByMood} from "../service/song.api";
import {useContext, useEffect} from "react";
import {SongContext} from "../song.context";

export const useSong = () => {
    const context = useContext(SongContext);
const {loading, setLoading, song, setSong} = context;


    async function handleGetSong(mood) {
        setLoading(true);
        try {
            const data = await getSongByMood(mood);   
            setSong(data);                              
        } catch (err) {
            console.error("Failed to fetch song:", err);
        } finally {
            setLoading(false);
        }
    }

    return { loading, song, handleGetSong };
};