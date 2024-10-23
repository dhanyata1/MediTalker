import React, { createContext, useContext, useState } from 'react';

// Create contexts
const ScreenshotsContext = createContext();
const MedicineInfoContext = createContext();

// Custom hooks for accessing contexts
export const useScreenshots = () => useContext(ScreenshotsContext);
export const useMedicineInfo = () => useContext(MedicineInfoContext);

export const AppProvider = ({ children }) => {
    // State management for screenshots and medicine info
    const [screenshots, setScreenshots] = useState([]);
    const [medicineInfo, setMedicineInfo] = useState('');

    return (
        <ScreenshotsContext.Provider value={{ screenshots, setScreenshots }}>
            <MedicineInfoContext.Provider value={{ medicineInfo, setMedicineInfo }}>
                {children}
            </MedicineInfoContext.Provider>
        </ScreenshotsContext.Provider>
    );
};
