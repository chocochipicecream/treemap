import { useEffect, useState } from "react"
import { db } from "./firebase"
import { collection, getDocs } from "firebase/firestore"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Link } from "react-router-dom"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

function MapView() {
  const [trees, setTrees] = useState([])

  useEffect(() => {
    const fetchTrees = async () => {
      const snapshot = await getDocs(collection(db, "trees"))
      const data = snapshot.docs.map(doc => doc.data())
      setTrees(data)
    }
    fetchTrees()
  }, [])

  return (
    <div className="min-h-screen bg-green-50">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-green-800 mb-1">Tree Map</h1>
        <p className="text-gray-500 text-sm mb-4">All tagged trees in your area</p>
      </div>
      <MapContainer
        center={[28.6139, 77.2090]}
        zoom={16}
        style={{ height: "70vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="OpenStreetMap"
        />
        {trees.map(tree => (
          <Marker key={tree.tree_id} position={[tree.lat, tree.lng]}>
            <Popup>
              <div className="text-center">
                <p className="font-bold text-green-700">{tree.name}</p>
                <p className="text-xs text-gray-500 mb-2">{tree.sanskrit_name}</p>
                <Link
                  to={`/tree/${tree.tree_id}`}
                  className="text-xs text-blue-500 underline"
                >
                  View full profile
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapView