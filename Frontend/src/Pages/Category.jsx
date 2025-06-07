

import React, { useEffect, useState } from 'react';
import { apiConnect } from '../Services/apiConnect';
import { getCategory, Interest } from '../Services/apis';
import toast from 'react-hot-toast';
import Loading from '../components/common/Loading';

export default function Category() {
  const [interests, setInterests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
   const [loading , setLoading] = useState(false);


  useEffect(() => {
    const fetchInterests = async () => {
        setLoading(true);
      try {
      
        const response = await apiConnect("GET", getCategory.GET_CATEGORY);
        if (response?.data) {
          
          const updated = response.data.map(item => ({ ...item, selected: false }));
          setInterests(updated);
        }
      } catch (error) {
        if(error){
        toast.error(error?.response?.data?.message);
      }
      else{
        toast.error("Failed to fetch categories.");
      }
      }
      finally{
        setLoading(false);
      }
    };
    fetchInterests();
  }, []);

  
 const toggleInterest = async (id) => {
  const updatedInterests = interests.map(item =>
    item._id === id ? { ...item, selected: !item.selected } : item
  );
  setInterests(updatedInterests);

  const selected = updatedInterests.filter(item => item.selected).map(item => item._id);
  const toastId = toast.loading("Saving interests...");

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) throw new Error("User not found in localStorage");

    const response = await apiConnect("PUT", Interest.INTEREST_API, {
      userId: user.id,
      interests: selected,
    });

    console.log(response);
    toast.success("Interests saved successfully", { id: toastId });
  } catch (error) {
    const errorMsg = error?.response?.data?.message || "Error while saving interests";
    toast.error(errorMsg, { id: toastId });
  }
};


  const totalPages = Math.ceil(interests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInterests = interests.slice(startIndex, endIndex);

  return (
    <div className="max-[400px]:w-[330px] max-[330px]:w-[300px] w-[600px] mx-auto mt-10 bg-white p-12 rounded-xl shadow-lg">
      <h1 className="text-[32px] font-bold text-center mb-2 text-gray-900">Please mark your interests!</h1>
      <p className="text-center text-gray-600 mt-2 font-semibold text-sm mb-4">We will keep you notified.</p>
     
     {loading ? <Loading/> : (
      <div className="border-t border-b py-4">
        <h2 className="font-semibold mb-2 text-lg text-gray-800">My saved interests:</h2>
        <ul className="space-y-2">
          {paginatedInterests.map((item) => (
            <li key={item._id} className="flex text-lg mt-5 font-semibold items-center">
              <input
                type="checkbox"
                className="mr-3 w-4 h-4"
                checked={item.selected}
                onChange={() => toggleInterest(item._id)}
              />
              <span className="text-gray-800">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
       )}

    
      <div className="flex justify-center flex-wrap mt-6 text-gray-500 space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3  py-1 border rounded disabled:opacity-50"
        >
          &lt;&lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1   border rounded ${currentPage === i + 1 ? 'bg-black text-white' : ''}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3  py-1 border rounded disabled:opacity-50"
        >
          &gt;&gt;
        </button>
        
      </div>
     
    </div>
    
  );
}
