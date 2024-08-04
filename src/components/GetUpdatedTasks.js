import { useEffect,useContext } from "react";
import axios from "axios";

import { GlobState } from "./GlobalState";


export const GetUpdatedTasks = () => {

    const { setTasks } = useContext(GlobState);
    useEffect(() => {
        const getTasks = async () => {
          try {
            const res = await axios.get("/api/tasks");
            console.log(res.data);
            setTasks(res.data);
          } catch (error) {
            console.error("Error fetching tasks:", error);
          }
        };
        getTasks();
      }, [setTasks]);
}