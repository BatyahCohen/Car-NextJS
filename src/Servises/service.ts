import { promises } from "dns";
import http from "./http";

export async function getAll() {
  return await http.get("/cars");
}

export async function add(newCar: any) {
  console.log(newCar);
  return await http.post("/cars", newCar);
}

export async function delete1(id: string) {
  console.log("id: " + id);
  await http.delete(`/cars?id=${id}`);
}

export async function update(id: string, updatedCar: any) {
  console.log(id);
  console.log(updatedCar);
  return await http.patch(`/cars?id=${id}`, updatedCar);
}
