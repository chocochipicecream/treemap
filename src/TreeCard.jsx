import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "./firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

function TreeCard() {
  const { treeId } = useParams()
  const [tree, setTree] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTree = async () => {
      const q = query(collection(db, "trees"), where("tree_id", "==", treeId))
      const snapshot = await getDocs(q)
      if (!snapshot.empty) {
        setTree(snapshot.docs[0].data())
      }
      setLoading(false)
    }
    fetchTree()
  }, [treeId])

  if (loading) return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <p className="text-green-700 text-lg">Loading tree data...</p>
    </div>
  )

  if (!tree) return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <p className="text-red-500 text-lg">Tree not found.</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-md mx-auto">

        <div className="bg-green-700 rounded-2xl p-6 text-white mb-4">
          <p className="text-green-300 text-sm mb-1">Urban Tree Registry</p>
          <h1 className="text-4xl font-bold mb-1">{tree.name}</h1>
          <p className="text-green-200 text-lg">{tree.sanskrit_name}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 mb-4 border border-green-100">
          <h2 className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-3">Tree Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Family</span>
              <span className="text-gray-800 text-sm font-medium">{tree.family}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Estimated Age</span>
              <span className="text-gray-800 text-sm font-medium">{tree.age_estimate} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Location</span>
              <span className="text-gray-800 text-sm font-medium">{tree.location}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 mb-4 border border-green-100">
          <h2 className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-3">Medicinal Properties</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{tree.medicinal}</p>
        </div>

        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
          <h2 className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">Did You Know?</h2>
          <p className="text-amber-800 text-sm leading-relaxed">{tree.fun_fact}</p>
        </div>

      </div>
    </div>
  )
}

export default TreeCard