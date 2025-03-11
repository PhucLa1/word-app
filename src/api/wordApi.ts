import axios from "axios";
import { Word } from "../models/word.model";

const API_URL = "http://localhost:3000/words";
// const API_URL = "https://7d21-42-113-154-62.ngrok-free.app/words"

export const getWords = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addWord = async (word: Word) => {
    const response = await axios.post(API_URL, word);
    return response.data;
};

export const updateWord = async (id: number, word: Word) => {
    const response = await axios.put(`${API_URL}/${id}`, word);
    return response.data;
};

export const deleteWord = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
};
