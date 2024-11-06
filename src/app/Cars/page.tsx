"use client";
import styles from "./Cars.module.css";
import http from "@/Servises/http";
import { useEffect, useState } from "react";

export default function Cars() {
  const [cars, setCars] = useState<any[]>([]);
  const [newCar, setNewCar] = useState<any>({ model: "", color: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchData();
  }, []);

  // הוספת מכונית חדשה
  const addCar = async () => {
    try {
      const response = await http.post("/cars", newCar);
      setCars([...cars, newCar]);
      setNewCar({ model: "", color: "" });
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const deleteCar = async (id: string) => {
    try {
      console.log("in delete car1")
      await http.delete(`/cars?id=${id}`);
      console.log("in delete car2")
      setCars(cars.filter(car => car._id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const updateCar = async (id: number) => {};


  return (
    <div className={styles.container}>
      <div className={styles.carList}>
        {cars.map((car, index) => (
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
            <button onClick={()=>deleteCar(car._id)} className={styles.button}>
              delete Car
            </button>
            <button onClick={()=>updateCar(index)} className={styles.button}>
              update Car
            </button>
          </div>
        ))}
      </div>

      <h3 className="add-car-title">Add a New Car</h3>

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
      <button onClick={addCar} className={styles.addCarButton}>
        Add Car
      </button>
    </div>
  );
}
