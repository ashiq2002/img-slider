import React, { useState, useRef, useEffect } from "react";

import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import { motion, AnimatePresence } from "motion/react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = (value) => {
    setIsModalOpen(true);

    setCurrentItem(data.findIndex((item) => item.image === value));
    console.log(isModalOpen);
  };
  const closeModal = () => setIsModalOpen(false);

  const [currentItem, setCurrentItem] = useState(0);

  // Close the modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // autoSlide(); //start auto slider

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const data = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1731432245362-26f9c0f1ba2f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1731223834043-6f8fd8f87161?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1731862872903-1d39fe0c10f8?q=80&w=2108&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1730660666237-1e6a008067a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "5",
      image:
        "https://plus.unsplash.com/premium_photo-1731185355817-d4258d1baa1f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const handleArrowButton = (value) => {
    if (currentItem === 0 && value < 0) {
      alert("There is no previus data bro..");
      return;
    } // Prevent going backward when at the first item
    if (currentItem === data.length - 1 && value > 0) {
      alert("There is no next data bro..");
      return;
    } // Prevent going forward when at the last item

    setCurrentItem((prev) => prev + value); // Correctly update the state
  };

  // const sleep = (milSec)=> {
  //     return new Promise((resolve)=> setTimeout(resolve, milSec));
  // };

  // const autoSlide = async ()=> {
  //   console.log(isModalOpen);
  //   if(isModalOpen === false) return;

  //   while (isModalOpen === true) {

  //     console.log(`Current item: ${currentItem}`);
  //     await sleep(3000);
  //     setCurrentItem((prev) => prev === data.length -1 ? 0 : prev + 1);

  //   }
  // }

  //handle key event globally
  useEffect(() => {
    const handleKey = (event) => {
      console.log(`key: ${event.key}`);

      if (event.key === "Escape") {
        setIsModalOpen(false);
      } else if (event.ctrlKey && event.key === "c") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.addEventListener("keydown", handleKey);
    };
  }, []);

  const [isSlide, setIsSlide] = useState(true);

  ///auto slider
  useEffect(() => {
    if (!isModalOpen) return;

    const interval = setInterval(() => {
      setIsSlide(true);
      console.log(`Runing... ${isSlide}`);

      setCurrentItem((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isModalOpen, isSlide]);

  return (
    <>
      <div className="flex justify-center content-center">
        <div className="flex p-4 gap-2 flex-wrap">
          {data.map((e) => (
            <div
              key={e.id}
              className="p-4 my-1 mx-1 bg-green-100 rounded cursor-pointer hover:bg-green-200"
              onClick={() => openModal(e.image)}
            >
              <img
                src={e.image}
                alt=""
                className="h-48 w-48 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div style={modalStyle} role="dialog" aria-modal="true">
            <div ref={modalRef} style={modalContentStyle}>
              <h2 className="text-xl font-bold mb-4">Modal Title</h2>

              <div className="flex justify-between items-center w-full">
                {/* Left Arrow */}
                <FaArrowLeft
                  onClick={() => handleArrowButton(Number(-1))}
                  className="bg-blue-800 p-2 rounded-lg cursor-pointer hover:bg-blue-700 text-white w-8 h-8 "
                />

                <motion.img
                  key={data[currentItem].image}
                  src={data[currentItem].image}
                  animate={{ rotateX: 245, rotateY: 170, rotateZ: -125}}
                  className="h-52 w-52 object-cover rounded-lg overflow-hidden"
                />

                {/* Right Arrow */}
                <FaArrowRight
                  onClick={() => handleArrowButton(Number(1))}
                  className="bg-blue-800 p-2 rounded-lg cursor-pointer hover:bg-blue-700 text-white w-8 h-8"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  maxWidth: "400px",
  width: "90%",
  textAlign: "center",
  position: "relative",
};

export default App;
