"use client";
import styles from "./Cars.module.css";
import { add, delete1, getAll, update } from "@/Servises/service";
import { useEffect, useState } from "react";

export default function Cars() {
  const [cars, setCars] = useState<any[]>([]);
  const [newCar, setNewCar] = useState<any>({
    _id: "",
    model: "",
    plate_number: "",
    color: "",
  });
  const [submitState, setSubmitState] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAll()
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchData();
  }, []);

  const addCar = async () => {
    try {
      const { _id, ...carData } = newCar
      const response = await add(carData);
      setCars([...cars, newCar]);
      setNewCar({ _id: "", model: "", plate_number: "", color: "" });
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const deleteCar = async (id: string) => {
    try {
      await delete1(id);
      setCars(cars.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const updateCar = async (car: any) => {
    setNewCar(car);
    setSubmitState("update");
    console.log(newCar)
  };

  const updateCarInServer = async () => {
    try {
      const { _id, ...carData } = newCar
      const response = await update(newCar._id, carData);
      console.log(response.data)
      console.log()
      const updatedCars = cars.map((car:any) =>
        car._id === newCar._id ? newCar : car
      );
      setCars(updatedCars);
    } catch (error) {
      console.error("Error updating car:", error);
    }
    setNewCar({ _id: "", model: "", plate_number: "", color: "" });
  };

  const submit = () => {
    if (submitState === "update") {
      updateCarInServer();
    } else {
      addCar();
    }
    setSubmitState("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.carList}>
        {cars?.map((car, index) => (
          <div key={index} className={styles.carItem}>
            <p>
              <strong>Model:</strong> {car.model}
            </p>
            <p>
              <strong>Color:</strong> {car.color}
            </p>
            <p>
              <strong>Plate Number:</strong> {car.plate_number}
            </p>
            <button
              onClick={() => deleteCar(car._id)}
              className={styles.button}
            >
              delete Car
            </button>
            <button onClick={() => updateCar(car)} className={styles.button}>
              update Car
            </button>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={newCar.model}
        onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
        placeholder="Car model"
        className={styles.inputField}
      />
      <input
        type="text"
        value={newCar.plate_number}
        onChange={(e) => setNewCar({ ...newCar, plate_number: e.target.value })}
        placeholder="Plate number"
        className={styles.inputField}
      />
      <input
        type="text"
        value={newCar.color}
        onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
        placeholder="Car color"
        className={styles.inputField}
      />
      <button onClick={submit} className={styles.addCarButton}>
        V
      </button>
    </div>
  );
}
