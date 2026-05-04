import { useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import { API } from "../../api/API.js";
import { useQuery } from "@tanstack/react-query";
import AllUsers from "../Users/AllUsers.jsx";
import ProductGrid from "../home/ProductGrid.jsx";
import { useOutletContext } from "react-router-dom";

export default function AdminDisplayArea() {
  return (
    <div className="w-full p-5">
      <h1 className="text-3xl">Dashboard</h1>
    </div>
  );
}
