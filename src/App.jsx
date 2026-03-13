import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { db } from "./firebase"
import { collection, getDocs } from "firebase/firestore"
import TreeCard from "./TreeCard"
import MapView from "./MapView"

function Home() {
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
    <div className="bg-green-50 min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-1">TreeMap</h1>
        <p className="text-gray-500 text-sm mb-2">Scan any tagged tree to discover its story</p>
        <Link to="/map">
          <div className="bg-green-700 text-white rounded-xl p-3 mb-6 text-center text-sm font-medium">
            View All Trees on Map →
          </div>
        </Link>
        {trees.map(tree => (
          <Link to={`/tree/${tree.tree_id}`} key={tree.tree_id}>
            <div className="bg-white rounded-xl p-4 mb-3 border border-green-100 flex justify-between items-center">
              <div>
                <p className="font-semibold text-green-700">{tree.name}</p>
                <p className="text-sm text-gray-400">{tree.sanskrit_name}</p>
                <p className="text-xs text-gray-300">{tree.location}</p>
              </div>
              <span className="text-green-400 text-xl">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tree/:treeId" element={<TreeCard />} />
        <Route path="/map" element={<MapView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App