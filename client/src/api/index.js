import axios from "axios";

const httpClient = axios.create({ baseURL: "http://localhost:5001/api" });

export const createHero = (payload) => httpClient.post("/heroes", payload);

export const getHero = () => httpClient.get("/heroes");

export const updateHero = (id, data) => httpClient.patch(`/heroes/${id}`, data);

export const deleteHero = (id) => httpClient.delete(`/heroes/${id}`);